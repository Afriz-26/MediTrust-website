import { GoogleGenAI } from '@google/genai';
import { SafetyLayer } from './SafetyLayer';
import { MedicineService } from './MedicineService';
import { MedicalKnowledgeService } from './MedicalKnowledgeService';
import { DoctorSearchService } from './DoctorSearchService';
import { TranslationService } from './TranslationService';
import { withRetry } from '../utils/retry';

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  content: string;
}

export class ConversationService {
  private static getAiClient() {
    const rawKey = (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '').trim();
    const apiKey = rawKey.replace(/^["']|["']$/g, '').trim();
    if (!apiKey) {
      console.warn('[ConversationService] No GEMINI_API_KEY or VITE_GEMINI_API_KEY found in environment variables.');
      return null;
    }
    try {
      return new GoogleGenAI({ apiKey });
    } catch (e: any) {
      console.error('[ConversationService] Failed to initialize GoogleGenAI client:', e?.message || e);
      return null;
    }
  }

  public static getSystemInstruction(language: string = 'English'): string {
    const langRule = TranslationService.getLanguagePromptInstruction(language);

    return `You are MediTrust AI, a production-grade Healthcare Assistant developed by Medynex Solutions LLP.
You speak with patients, doctors, and healthcare professionals. Your demeanor is:
- Warm, empathetic, respectful, calm, and reassuring.
- Professional, medically responsible, clear, and structured.
- Conversational and human-like (resembling ChatGPT/Gemini/Claude).

CONVERSATIONAL RULES:
1. CASUAL GREETINGS: If the user simply says "hi", "hello", "hey", "good morning", or greets you casually, reply warmly and concisely in 1-2 sentences (e.g., "Hello! I'm your MediTrust AI Assistant. How can I help you with your health, symptoms, medicines, or finding doctors today?"). DO NOT output heavy medical templates or clinical disclaimers for casual greetings.
2. CLINICAL QUERIES: When the user asks about symptoms, medicines, diseases, or doctor recommendations, provide clear, structured, evidence-based guidance with Markdown formatting.

CORE CLINICAL SAFETY PROTOCOLS:
1. EMERGENCY TRIAGE: If the user mentions life-threatening symptoms (chest pain, stroke signs, severe dyspnea, heavy bleeding, loss of consciousness), prioritize immediate emergency care warnings (call 108 / go to nearest ER).
2. EDUCATIONAL PURPOSE: Provide evidence-based medical education, symptom triage, medication explanations, and healthcare navigation. NEVER diagnose with 100% certainty or replace an in-person doctor consultation.
3. EXPLANATIONS & STRUCTURE: Use formatted Markdown with bold headings, bullet points, numbered lists, and key takeaways.
4. MEDICINE GUIDANCE: Explain generic names, brand names in India, standard uses, common side effects, and precautions. Always remind users to follow their doctor's prescription.
5. DOCTOR & HOSPITAL GUIDANCE: Suggest appropriate specialist departments (e.g., Cardiologist for BP concerns, Dermatologist for skin rashes, Neurologist for chronic migraines).

${langRule}`;
  }

  public static async *generateStreamResponse(
    messages: ChatMessage[] = [],
    language: string = 'English',
    modelName: string = 'gemini-3.8-flash',
    grounding: { enableSearch?: boolean; enableMaps?: boolean } = {}
  ): AsyncGenerator<string, void, unknown> {
    const ai = this.getAiClient();
    const safeMessages = Array.isArray(messages) ? messages : [];

    const lastUserMsg = safeMessages.filter(m => m && m.role === 'user').pop()?.content || '';

    // Step 1: Check Emergency Red Flags
    const emergency = SafetyLayer.analyzeEmergency(lastUserMsg);
    if (emergency.isEmergency && emergency.severityLevel === 'CRITICAL') {
      yield `🚨 **URGENT EMERGENCY CARE REQUIRED**\n\n${emergency.immediateGuidance}\n\n`;
    }

    // Step 2: Context Grounding (Medicine / Knowledge / Doctor Lookup)
    let groundingContext = '';
    const foundMed = MedicineService.search(lastUserMsg);
    if (foundMed) {
      groundingContext += `\n\n[MEDITRUST MEDICINE DATABASE ENTRY]:\nName: ${foundMed.name}\nBrands: ${foundMed.brandNames.join(', ')}\nClass: ${foundMed.drugClass}\nUses: ${foundMed.uses}\nHow it works: ${foundMed.howItWorks}\nDosage: ${foundMed.dosageRanges}\nSide Effects: ${foundMed.commonSideEffects.join(', ')}\nPrecautions: Pregnancy (${foundMed.precautions.pregnancy}), Kidney (${foundMed.precautions.kidney}), Liver (${foundMed.precautions.liver})\nPrescription Status: ${foundMed.prescriptionStatus}`;
    }

    const foundTopic = MedicalKnowledgeService.searchKnowledge(lastUserMsg);
    if (foundTopic) {
      groundingContext += `\n\n[MEDITRUST MEDICAL KNOWLEDGE BASE ENTRY]:\nTopic: ${foundTopic.title}\nCategory: ${foundTopic.category}\nOverview: ${foundTopic.overview}\nSymptoms: ${foundTopic.symptoms.join(', ')}\nTreatment: ${foundTopic.treatmentOptions.join(', ')}\nLifestyle: ${foundTopic.lifestyleManagement.join(', ')}`;
    }

    if (lastUserMsg.toLowerCase().includes('doctor') || lastUserMsg.toLowerCase().includes('specialist') || lastUserMsg.toLowerCase().includes('appointment')) {
      const docs = DoctorSearchService.searchDoctors(lastUserMsg);
      if (docs.length > 0) {
        groundingContext += `\n\n[MEDITRUST RECOMMENDED VERIFIED DOCTORS]:\n${docs.map(d => `- ${d.name} (${d.specialty}, ${d.qualification}) - ${d.hospitalName}, ${d.location} | Fee: ₹${d.consultationFee} | Next: ${d.nextAvailable}`).join('\n')}`;
      }
    }

    // Fast Triage for greetings when running instant
    const lowerUserMsg = lastUserMsg.toLowerCase().trim();
    if (/^(hi|hello|hey|namaste|greetings|good morning|good afternoon|good evening)$/i.test(lowerUserMsg)) {
      yield `Hello! I'm **MediTrust AI Clinical Assistant** from Medynex Solutions. How can I assist with your health, symptoms, medicines, or finding verified doctors today?`;
      return;
    }

    // Step 3: Construct Prompt History
    const systemPrompt = this.getSystemInstruction(language);
    
    // Convert messages into Gemini contents format
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    let systemContextAdded = false;

    for (const msg of safeMessages) {
      if (!msg || msg.role === 'system') continue;

      let textContent = msg.content || '';
      if (!systemContextAdded && msg.role === 'user') {
        textContent = `${systemPrompt}\n\n${groundingContext ? groundingContext + '\n\n' : ''}User Question: ${msg.content}`;
        systemContextAdded = true;
      }

      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: textContent }]
      });
    }

    if (!systemContextAdded) {
      contents.unshift({
        role: 'user',
        parts: [{ text: `${systemPrompt}\n\n${groundingContext}\n\nPlease greet the user and assist them with MediTrust Healthcare Services.` }]
      });
    }

    if (!ai) {
      // Fast Intelligent Structured Fallback
      if (foundMed) {
        yield `### 💊 Clinical Details: **${foundMed.name}**\n\n- **Brand Names in India:** ${foundMed.brandNames.join(', ')}\n- **Pharmacological Class:** ${foundMed.drugClass}\n- **Primary Indications:** ${foundMed.uses}\n- **Standard Dosage:** ${foundMed.dosageRanges}\n- **Common Side Effects:** ${foundMed.commonSideEffects.join(', ')}\n\n⚠️ **Important Precautions:**\n- Pregnancy: ${foundMed.precautions.pregnancy}\n- Kidney/Renal: ${foundMed.precautions.kidney}\n- Liver: ${foundMed.precautions.liver}\n\n*Always consult your certified doctor or pharmacist before starting or modifying dosages.*`;
      } else if (foundTopic) {
        yield `### 🩺 Healthcare Guidance: **${foundTopic.title}**\n\n${foundTopic.overview}\n\n**Common Clinical Symptoms:**\n${foundTopic.symptoms.map(s => `- ${s}`).join('\n')}\n\n**Standard Treatment Approaches:**\n${foundTopic.treatmentOptions.map(t => `- ${t}`).join('\n')}\n\n**Lifestyle & Recovery Tips:**\n${foundTopic.lifestyleManagement.map(l => `- ${l}`).join('\n')}`;
      } else {
        yield `Thank you for consulting **MediTrust AI Clinical Assistant**.\n\nRegarding your query about **"${lastUserMsg || 'healthcare guidance'}"**:\n\n### 📋 Clinical Overview:\n- **Primary Consideration:** Healthcare queries benefit from structured evaluation, considering symptom duration, medical history, and current medications.\n- **Guidance:** Ensure adequate hydration, proper rest, and regular health monitoring.\n\n---\n\n### 🩺 What would you like to do next?\n1. **Find Doctors:** Search OPD token availability in Tirupati, Hyderabad, or your city.\n2. **Ask Follow-up Questions:** Provide details on symptoms, duration, or age.\n3. **Verify Medicine:** Scan your prescription or search medicine details & dosages.`;
      }
      yield SafetyLayer.getDisclaimerBanner(language);
      return;
    }

    try {
      const validModel = modelName.includes('pro') ? 'gemini-3.1-pro-preview' : 'gemini-3.8-flash';
      const tools = grounding.enableMaps
        ? [{ googleMaps: {} }]
        : grounding.enableSearch
          ? [{ googleSearch: {} }]
          : undefined;

      const responseStream = await withRetry(
        async () => {
          try {
            return await ai.models.generateContentStream({
              model: validModel,
              contents,
              config: tools ? { tools } : undefined
            });
          } catch (mErr: any) {
            if (validModel !== 'gemini-3.8-flash') {
              console.warn(`[Gemini Stream] Model ${validModel} unavailable (${mErr?.message}). Falling back to gemini-3.8-flash.`);
              return await ai.models.generateContentStream({
                model: 'gemini-3.8-flash',
                contents,
                config: tools ? { tools } : undefined
              });
            }
            throw mErr;
          }
        },
        {
          maxRetries: 1,
          initialDelayMs: 400,
          maxDelayMs: 2000,
          onRetry: (err, attempt, delayMs) => {
            console.warn(`[Gemini Stream Retry ${attempt}/1] ${err.message || err}.`);
          }
        }
      );

      for await (const chunk of responseStream) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    } catch (err: any) {
      const errorMessage = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
      const errorStatus = err?.status || err?.code || '';
      const errorDetails = err?.response?.data || err?.error || err?.response || '';
      console.error(`[Gemini API Stream Error] Status: ${errorStatus} | Message: ${errorMessage}`, errorDetails);
      throw err;
    }

    // Append disclaimer if not present
    const disclaimer = SafetyLayer.getDisclaimerBanner(language);
    yield disclaimer;
  }
}
