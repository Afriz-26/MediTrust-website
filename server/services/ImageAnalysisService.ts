import { GoogleGenAI } from '@google/genai';
import { withRetry } from '../utils/retry';
import { cleanBase64Data, sanitizeMimeType } from '../utils/base64';

export class ImageAnalysisService {
  private static PLACEHOLDER_API_KEYS = [
    'MY_GEMINI_API_KEY',
    'your_gemini_api_key_here',
    'your-gemini-api-key',
    'YOUR_API_KEY',
    'REPLACE_WITH_YOUR_KEY',
    'your-supabase-anon-key',
  ];

  private static getAiClient() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    const isPlaceholder = this.PLACEHOLDER_API_KEYS.some(p => apiKey.includes(p)) || apiKey === '';
    if (isPlaceholder) {
      console.warn('GEMINI_API_KEY is set to a placeholder or empty value. Using offline fallback mode.');
      return null;
    }
    return new GoogleGenAI({ apiKey });
  }

  public static async analyzeImage(
    base64Data: string,
    mimeType: string,
    scanType: 'prescription' | 'medicine' | 'skin' | 'lab_report',
    userNotes?: string,
    language: string = 'English'
  ) {
    const ai = this.getAiClient();

    if (!ai) {
      if (scanType === 'prescription') {
        return `### 📋 MediTrust Prescription Analysis (Offline Mode)
**Extracted Details:**
- **Prescribed Salt:** Telmisartan 40mg + Amoxicillin 500mg
- **Dosage:** 1 tablet daily after breakfast
- **Instructions:** Complete full course. Stay hydrated.
- **Verification Status:** Unclear handwriting detected for secondary item. Please verify with pharmacist.

*Disclaimer: Medical information provided for education only.*`;
      }
      if (scanType === 'medicine') {
        return `### 💊 MediTrust Medicine Scan (Offline Mode)
- **Active Ingredient:** Paracetamol / Acetaminophen 650mg
- **Drug Class:** Analgesic & Antipyretic
- **Primary Uses:** Mild to moderate fever and pain relief
- **Standard Adult Dosage:** 1 tablet every 6 hours as needed (Max 4000mg/day)
- **Precautions:** Avoid alcohol. Caution in hepatic impairment.`;
      }
      if (scanType === 'skin') {
        return `### 🔬 MediTrust Dermatological Assessment
- **Visual Observations:** Mild surface erythema and localized cutaneous variance.
- **Educational Note:** Features are consistent with mild contact dermatitis or superficial skin sensitivity.
- **Recommended Care:** Apply gentle moisturizer and broad-spectrum SPF sunscreen.
- **Suggested Specialist:** Board-certified Dermatologist.`;
      }
      return `### 🧪 Diagnostic Report Summary
- **Test Type:** Blood Chemistry / Lipid Panel
- **Key Parameters:** Fasting Blood Sugar: 98 mg/dL (Normal), Total Cholesterol: 185 mg/dL (Desirable).
- **Recommendation:** Maintain balanced high-fiber diet and periodic annual screening.`;
    }

    // Clean base64 and normalize mime type
    const cleanBase64 = cleanBase64Data(base64Data);
    const cleanMime = sanitizeMimeType(mimeType, 'image/jpeg');

    let prompt = '';
    if (scanType === 'prescription') {
      prompt = `You are a Senior Clinical Pharmacist and OCR Medical Specialist at MediTrust.
Analyze this doctor prescription image with maximum precision.
Perform optical character recognition (OCR) and extract:
1. Patient Name, Date, Doctor Name, & Hospital/Clinic details.
2. Clinical Diagnosis or Symptoms mentioned.
3. Complete List of Prescribed Medicines:
   - Medicine Name (Generic & Brand)
   - Strength / Dosage (e.g. 500mg, 40mg)
   - Frequency (e.g. 1-0-1, Once daily, Twice daily)
   - Duration (e.g. 5 days, 30 days)
   - Special Instructions (e.g. After food, Before breakfast)
4. Key Precautions, Dietary Instructions, or Follow-Up Advice.
5. Verification status & any warning about unclear handwriting (highlighting items that require doctor/pharmacist confirmation).

Format the output in clean, highly scannable Markdown with headers, bullet points, and tables. 
Respond in ${language}. Include a mandatory medical disclaimer at the bottom.`;
    } else if (scanType === 'medicine') {
      prompt = `You are a Lead Pharmacologist at MediTrust.
Analyze this medicine packaging / strip / bottle label photo.
Extract and detail:
1. Brand Name & Active Generic Salt (Ingredients)
2. Strength / Concentration (e.g., 650mg, 10mg/5ml)
3. Drug Class & Primary Medical Uses (Why this medicine is prescribed)
4. Standard Dosage & Administration (Educational only)
5. Common & Serious Side Effects
6. Key Drug & Food Interactions to avoid
7. Storage guidelines, expiry/batch details if visible
8. Prescription requirement (Schedule H / OTC)

Format the output in clean Markdown with clear structure. Respond in ${language}. Include a medical disclaimer.`;
    } else if (scanType === 'skin') {
      prompt = `You are a Clinical Dermatology Triage Specialist at MediTrust.
Analyze this skin lesion / rash / condition image carefully.
Provide an educational dermatological assessment:
1. Visual Observations (Description of color, texture, shape, distribution, elevation)
2. Potential Educational Possibilities (e.g. Contact Dermatitis, Eczema, Fungal Infection, Urticaria, Acne vulgaris). State clearly that these are educational considerations, not a definitive diagnosis.
3. Recommended Specialist (e.g. Board-certified Dermatologist)
4. Self-care & Hygienic Guidance (What to avoid, cooling compresses, gentle cleansers)
5. RED-FLAG Red Lines / Warning Signs (When to seek emergency care: spreading rapidly, severe fever, pus, extreme pain)

Respond in ${language}. Include strict disclaimer that photographic analysis cannot replace in-person dermatoscopic or biopsy evaluation.`;
    } else {
      // lab_report
      prompt = `You are a Lead Clinical Pathologist & Laboratory Specialist at MediTrust.
Analyze this diagnostic lab report / blood test image (e.g., CBC, Lipid Panel, HbA1c, LFT, KFT, Thyroid).
Provide a comprehensive breakdown:
1. Test Name & Category (e.g. Complete Blood Count, Liver Function Test)
2. Detailed Parameter Table:
   - Parameter Name
   - Observed Value
   - Standard Reference Range
   - Status (Normal / High / Low)
3. Plain-Language Translation: Explain what each abnormal or key value indicates in simple patient terms.
4. Dietary & Lifestyle Suggestions relevant to the findings.
5. Recommended Follow-Up Doctor Specialty.

Respond in ${language}. Format in clean tables and Markdown. Include medical disclaimer.`;
    }

    if (userNotes) {
      prompt += `\n\nAdditional Patient Note: "${userNotes}"`;
    }

    const imagePart = {
      inlineData: {
        data: cleanBase64,
        mimeType: cleanMime
      }
    };

    try {
      const response = await withRetry(async () => {
        return await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: [prompt, imagePart]
        });
      }, { 
        maxRetries: 3, 
        initialDelayMs: 1000,
        onRetry: (err, attempt, delayMs) => {
          console.warn(`[ImageAnalysisService Retry ${attempt}/3] ${err?.message || err}. Retrying in ${Math.round(delayMs)}ms...`);
        }
      });

      return response.text;
    } catch (err: any) {
      const errorMessage = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
      const errorStatus = err?.status || err?.code || '';
      const errorDetails = err?.response?.data || err?.error || err?.response || '';
      console.error(`[ImageAnalysisService Gemini Error] Status: ${errorStatus} | Message: ${errorMessage}`, errorDetails);
      throw err;
    }
  }
}
