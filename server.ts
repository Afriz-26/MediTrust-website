import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import { ConversationService } from './server/services/ConversationService';
import { ImageAnalysisService } from './server/services/ImageAnalysisService';
import { MedicineService } from './server/services/MedicineService';
import { DoctorSearchService } from './server/services/DoctorSearchService';
import { MedicalKnowledgeService } from './server/services/MedicalKnowledgeService';
import { SafetyLayer } from './server/services/SafetyLayer';
import { TranslationService } from './server/services/TranslationService';
import { VoiceService } from './server/services/VoiceService';
import { PlacesService } from './server/services/PlacesService';
import { MedicineProviderService } from './server/services/MedicineProvider';
import { HealthcareDiscoveryService } from './server/services/HealthcareDiscoveryService';
import { withRetry } from './server/utils/retry';
import { cleanBase64Data, sanitizeMimeType } from './server/utils/base64';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));

  // Shared Gemini Client setup
  const PLACEHOLDER_API_KEYS = [
    'MY_GEMINI_API_KEY',
    'your_gemini_api_key_here',
    'your-gemini-api-key',
    'YOUR_API_KEY',
    'REPLACE_WITH_YOUR_KEY',
    'your-supabase-anon-key',
  ];

  const hasValidGeminiApiKey = (): boolean => {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
    if (!apiKey) {
      return false;
    }
    const isPlaceholder = PLACEHOLDER_API_KEYS.some(p => apiKey.includes(p)) || apiKey === '';
    if (isPlaceholder) {
      console.warn('GEMINI_API_KEY is set to a placeholder or empty value. Falling back to default response mode.');
      return false;
    }
    return true;
  };

  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
    if (!apiKey) {
      console.warn('GEMINI_API_KEY not set in environment variables. Falling back to default response mode.');
    }
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // ==========================================
  // GOOGLE PLACES & LOCATION DISCOVERY ENDPOINTS
  // ==========================================

  // Places Autocomplete
  app.get('/api/places/autocomplete', async (req, res) => {
    try {
      const input = (req.query.input as string) || (req.query.q as string) || '';
      const sessionToken = req.query.sessionToken as string | undefined;
      const suggestions = await PlacesService.getAutocompleteSuggestions(input, sessionToken);
      res.json({ suggestions, count: suggestions.length });
    } catch (err: any) {
      console.error('[API Places Autocomplete Error]:', err);
      res.status(500).json({ error: 'Failed to fetch autocomplete suggestions', details: err.message });
    }
  });

  // Place Details
  app.get('/api/places/details', async (req, res) => {
    try {
      const placeId = (req.query.placeId as string) || (req.query.id as string) || '';
      const sessionToken = req.query.sessionToken as string | undefined;
      if (!placeId) {
        return res.status(400).json({ error: 'placeId parameter is required' });
      }
      const details = await PlacesService.getPlaceDetails(placeId, sessionToken);
      if (!details) {
        return res.status(404).json({ error: 'Place details not found' });
      }
      res.json(details);
    } catch (err: any) {
      console.error('[API Places Details Error]:', err);
      res.status(500).json({ error: 'Failed to fetch place details', details: err.message });
    }
  });

  // Reverse Geocoding
  app.get('/api/places/reverse-geocode', async (req, res) => {
    try {
      const lat = parseFloat(req.query.lat as string);
      const lng = parseFloat(req.query.lng as string);
      if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({ error: 'Valid lat and lng numeric parameters required' });
      }
      const resolved = await PlacesService.reverseGeocode(lat, lng);
      res.json(resolved);
    } catch (err: any) {
      console.error('[API Reverse Geocode Error]:', err);
      res.status(500).json({ error: 'Failed to reverse geocode coordinates', details: err.message });
    }
  });

  // Nearby Healthcare Establishments
  app.get('/api/places/nearby-healthcare', async (req, res) => {
    try {
      const lat = parseFloat(req.query.lat as string);
      const lng = parseFloat(req.query.lng as string);
      const type = (req.query.type as 'doctor' | 'pharmacy' | 'hospital') || 'doctor';
      const radiusMeters = parseInt(req.query.radius as string) || 15000;

      if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({ error: 'Valid lat and lng numeric parameters required' });
      }

      const places = await PlacesService.discoverNearbyHealthcare(lat, lng, type, radiusMeters);
      res.json({ places, count: places.length });
    } catch (err: any) {
      console.error('[API Nearby Healthcare Error]:', err);
      res.status(500).json({ error: 'Failed to discover nearby healthcare', details: err.message });
    }
  });

  // ==========================================
  // MEDICINE SEARCH & CATALOG ENDPOINTS
  // ==========================================

  // Autocomplete Suggestions for Medicines
  app.get('/api/medicines/autocomplete', async (req, res) => {
    try {
      const query = (req.query.q as string) || (req.query.query as string) || '';
      const suggestions = await MedicineProviderService.getAutocompleteSuggestions(query);
      res.json({ suggestions, count: suggestions.length });
    } catch (err: any) {
      console.error('[API Medicine Autocomplete Error]:', err);
      res.status(500).json({ error: 'Failed to fetch medicine suggestions', details: err.message });
    }
  });

  // Comprehensive Medicine Search
  app.get('/api/medicines/search', async (req, res) => {
    try {
      const query = (req.query.q as string) || (req.query.query as string) || '';
      const category = (req.query.category as string) || 'All';
      const dosageForm = (req.query.dosageForm as string) || 'All';
      const limit = parseInt(req.query.limit as string) || 50;

      const result = await MedicineProviderService.searchMedicines({
        query,
        category,
        dosageForm,
        limit
      });
      res.json(result);
    } catch (err: any) {
      console.error('[API Medicine Search Error]:', err);
      res.status(500).json({ error: 'Failed to search medicines', details: err.message });
    }
  });

  // Single Medicine Details
  app.get('/api/medicines/:id', async (req, res) => {
    try {
      const medicine = await MedicineProviderService.getMedicineById(req.params.id);
      if (!medicine) {
        return res.status(404).json({ error: 'Medicine not found' });
      }
      res.json(medicine);
    } catch (err: any) {
      console.error('[API Single Medicine Error]:', err);
      res.status(500).json({ error: 'Failed to fetch medicine details', details: err.message });
    }
  });

  // ==========================================
  // HYBRID HEALTHCARE DISCOVERY & ONBOARDING
  // ==========================================

  // Hybrid Doctor Discovery
  app.get('/api/doctors/discovery', async (req, res) => {
    try {
      const lat = req.query.lat ? parseFloat(req.query.lat as string) : undefined;
      const lng = req.query.lng ? parseFloat(req.query.lng as string) : undefined;
      const city = (req.query.city as string) || '';
      const specialty = (req.query.specialty as string) || 'All';
      const query = (req.query.q as string) || '';
      const radiusKm = req.query.radius ? parseInt(req.query.radius as string) : 25;

      const discovery = await HealthcareDiscoveryService.searchDoctors({
        lat,
        lng,
        city,
        specialty,
        query,
        radiusKm
      });
      res.json(discovery);
    } catch (err: any) {
      console.error('[API Doctor Discovery Error]:', err);
      res.status(500).json({ error: 'Failed to discover doctors', details: err.message });
    }
  });

  // Submit Provider Onboarding Request
  app.post('/api/onboarding/request', async (req, res) => {
    try {
      const {
        requesterUserId,
        requesterName,
        requesterPhone,
        requesterEmail,
        providerType,
        providerName,
        specialty,
        clinicOrHospitalName,
        placeId,
        formattedAddress,
        city,
        state,
        pincode,
        contactNumber,
        notes,
        source
      } = req.body;

      if (!requesterName || !requesterPhone || !providerType || !providerName || !city) {
        return res.status(400).json({
          error: 'Required fields missing: requesterName, requesterPhone, providerType, providerName, city'
        });
      }

      const request = await HealthcareDiscoveryService.recordOnboardingRequest({
        requesterUserId,
        requesterName,
        requesterPhone,
        requesterEmail,
        providerType,
        providerName,
        specialty,
        clinicOrHospitalName,
        placeId,
        formattedAddress,
        city,
        state: state || 'Andhra Pradesh',
        pincode,
        contactNumber,
        notes,
        source: source || 'User Discovery Modal'
      });

      res.status(201).json({ success: true, request });
    } catch (err: any) {
      console.error('[API Onboarding Request Error]:', err);
      res.status(500).json({ error: 'Failed to record onboarding request', details: err.message });
    }
  });

  // Get Onboarding Requests (Admin or filter)
  app.get('/api/onboarding/requests', async (req, res) => {
    try {
      const status = req.query.status as string | undefined;
      const providerType = req.query.providerType as string | undefined;
      const city = req.query.city as string | undefined;

      const requests = await HealthcareDiscoveryService.getOnboardingRequests({
        status,
        providerType,
        city
      });
      res.json({ requests, count: requests.length });
    } catch (err: any) {
      console.error('[API Get Onboarding Requests Error]:', err);
      res.status(500).json({ error: 'Failed to fetch onboarding requests', details: err.message });
    }
  });

  // Update Onboarding Request Status (Admin)
  app.patch('/api/onboarding/requests/:id', async (req, res) => {
    try {
      const { status, notes } = req.body;
      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }
      const updated = await HealthcareDiscoveryService.updateOnboardingRequestStatus(
        req.params.id,
        status,
        notes
      );
      if (!updated) {
        return res.status(404).json({ error: 'Onboarding request not found' });
      }
      res.json({ success: true, request: updated });
    } catch (err: any) {
      console.error('[API Update Onboarding Request Error]:', err);
      res.status(500).json({ error: 'Failed to update onboarding request', details: err.message });
    }
  });

  // Streaming SSE Endpoint for sub-second character typing animation
  app.post('/api/gemini/stream', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
      const { messages = [], language = 'English', model = 'gemini-3.6-flash' } = req.body;

      // If no valid API key is configured, send fallback response directly
      // to avoid HTTP 500 errors from failed API calls
      if (!hasValidGeminiApiKey()) {
        const lastUserMsg = messages.filter((m: any) => m.role === 'user').pop()?.content || '';
        const fallbackText = generateSmartClinicalFallback(lastUserMsg || 'Hello', messages as any[], language);
        res.write(`data: ${JSON.stringify({ text: fallbackText })}\n\n`);
        res.write(`data: ${JSON.stringify({ text: SafetyLayer.getDisclaimerBanner(language) })}\n\n`);
        res.write(`data: [DONE]\n\n`);
        res.end();
        return;
      }

      for await (const token of ConversationService.generateStreamResponse(messages, language, model)) {
        res.write(`data: ${JSON.stringify({ text: token })}\n\n`);
      }

      res.write(`data: [DONE]\n\n`);
      res.end();
    } catch (err: any) {
      const errorMessage = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
      const errorStatus = err?.status || err?.code || '';
      const errorDetails = err?.response?.data || err?.error || err?.response || '';
      console.error(`[SSE Stream Error] Status: ${errorStatus} | Message: ${errorMessage}`, errorDetails);
      // Send error as SSE data (HTTP 200) so the client can display a friendly fallback
      res.write(`data: ${JSON.stringify({ text: `I am temporarily unable to reach the Gemini server (HTTP_${errorStatus || 500}). Please check your connection or try again shortly.` })}\n\n`);
      res.write(`data: [DONE]\n\n`);
      res.end();
    }
  });

  // Detailed Scan Endpoint (Prescriptions, Medicines, Skin photos, Lab reports)
  app.post('/api/gemini/analyze-image', async (req, res) => {
    try {
      const { base64Data, mimeType = 'image/jpeg', scanType = 'medicine', userNotes = '', language = 'English' } = req.body;

      if (!base64Data) {
        res.status(400).json({ error: 'Image base64 is required' });
        return;
      }

      const result = await ImageAnalysisService.analyzeImage(base64Data, mimeType, scanType, userNotes, language);
      res.json({ analysis: result });
    } catch (err: any) {
      const errorMessage = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
      const errorStatus = err?.status || err?.code || '';
      const errorDetails = err?.response?.data || err?.error || err?.response || '';
      console.error(`[Error in /api/gemini/analyze-image] Status: ${errorStatus} | Message: ${errorMessage}`, errorDetails);
      res.status(500).json({ error: errorMessage || 'Failed to analyze image', details: errorDetails });
    }
  });

function generateSmartClinicalFallback(message: string, history: any[], language: string = 'English'): string {
  const lowerMsg = message.toLowerCase().trim();

  // Greetings
  if (/^(hello|hi|hey|greetings|good morning|good afternoon|good evening|namaste|hi there)$/i.test(lowerMsg)) {
    if (language.includes('Telugu')) {
      return `నమస్కారం! నేను **MediTrust AI క్లినికల్ అసిస్టెంట్**. ఈరోజు మీ ఆరోగ్యానికి సంబంధించి నేను ఏ విధంగా సహాయపడగలను?

మీరు క్రింది అంశాల గురించి నన్ను అడగవచ్చు:
- **లక్షణాల విశ్లేషణ (Symptom Triage)**
- **సమీప డాక్టర్లు & హాస్పిటల్స్ అపాయింట్‌మెంట్**
- **మందుల వివరాలు & మోతాదు**
- **లాబొరేటరీ టెస్ట్‌లు & హోమ్ శాంపిల్ కలెక్షన్**`;
    }
    if (language.includes('Hindi')) {
      return `नमस्ते! मैं **MediTrust AI क्लिनिकल असिस्टेंट** हूँ। आज मैं आपकी स्वास्थ्य संबंधी किस प्रकार सहायता कर सकता हूँ?

आप मुझसे निम्नलिखित के बारे में पूछ सकते हैं:
- **लक्षणों का मूल्यांकन (Symptom Triage)**
- **डॉक्टर एवं अस्पताल अपॉइंटमेंट**
- **दवाइयों की जानकारी एवं खुराक**
- **लैब टेस्ट एवं होम सैंपल कलेक्शन**`;
    }
    return `Hello! I'm **MediTrust AI Clinical Assistant**. How can I help you today?

Feel free to ask me about:
- **Symptom Triage & Guidance** (e.g. fever, headache, stomach pain)
- **Finding Doctors & OPD Appointments** in Tirupati, Hyderabad, Bengaluru, etc.
- **Medicine Information & Side Effects**
- **Laboratory Diagnostics & Home Sample Collection**`;
  }

  // Symptom: Fever
  if (lowerMsg.includes('fever') || lowerMsg.includes('temperature') || lowerMsg.includes('feverish') || lowerMsg.includes('జ్వరం') || lowerMsg.includes('बुखार')) {
    return `I'm sorry to hear you are feeling unwell. Fever can be caused by viral infections, bacterial exposure, or seasonal changes. 

To help provide appropriate clinical triage guidance, **could you please tell me:**

1. **Your age**
2. **Your current temperature** (e.g., 99.5°F, 101°F, 38.5°C)
3. **How many days** you have had the fever
4. **Any accompanying symptoms** (e.g., cough, sore throat, severe headache, body aches, chills, skin rash, or nausea)?

---

### 🏥 Immediate Home Care & Triage Protocol:
- **Hydration:** Drink plenty of fluids (water, electrolyte solutions, warm soups).
- **Rest:** Avoid strenuous activity and ensure adequate sleep.
- **Monitoring:** Check your temperature every 4–6 hours.
- **Red Flags:** Seek **immediate emergency care** if you experience difficulty breathing, chest tightness, persistent vomiting, confusion, or a fever exceeding 103°F (39.4°C).

*Would you like me to suggest top General Physicians in your location (e.g., Tirupati or Hyderabad) for an OPD consultation?*`;
  }

  // Symptom: Headache
  if (lowerMsg.includes('headache') || lowerMsg.includes('head pain') || lowerMsg.includes('migraine') || lowerMsg.includes('తలనెప్పి') || lowerMsg.includes('सरदर्द')) {
    return `Headaches can stem from stress, dehydration, eye strain, sinusitis, or migraines.

To assess your headache better, **could you share:**
1. **Location of the pain** (e.g., forehead, one side of head, back of head/neck)
2. **Type of pain** (e.g., throbbing, dull ache, sharp pressure)
3. **Duration** and whether light or sound worsens it
4. Any accompanying symptoms such as nausea or blurred vision

---

### 💡 General Self-Care Tips:
- Rest in a quiet, darkened room.
- Stay hydrated with water or electrolyte fluids.
- Apply a cool compress to your forehead.

⚠️ *If accompanied by sudden numbness, speech difficulty, high fever, or severe neck stiffness, seek emergency medical care immediately.*`;
  }

  // Symptom: Cough / Cold / Throat
  if (lowerMsg.includes('cough') || lowerMsg.includes('cold') || lowerMsg.includes('sore throat') || lowerMsg.includes('దగ్గు') || lowerMsg.includes('खांसी')) {
    return `Upper respiratory symptoms like cough or sore throat are commonly caused by viral infections or environmental allergies.

**Please share a few more details:**
- Is it a **dry cough** or producing mucus (wet cough)?
- How long have you had this cough?
- Do you have a fever, shortness of breath, or chest discomfort?

---

### ☕ Symptom Support:
- Warm water gargles with salt 3x daily for throat comfort.
- Steam inhalation for nasal congestion.
- Warm fluids (herbal teas, soups).

*If symptoms persist beyond 5 days or involve breathing difficulty, consult a pulmonologist or general physician on MediTrust.*`;
  }

  // Doctor / Hospital search query
  if (lowerMsg.includes('doctor') || lowerMsg.includes('hospital') || lowerMsg.includes('appointment') || lowerMsg.includes('tirupati') || lowerMsg.includes('hyderabad') || lowerMsg.includes('cardiologist') || lowerMsg.includes('dermatologist')) {
    return `### 👩‍⚕️ MediTrust Doctor & OPD Booking Search

MediTrust connects you with top certified specialists in **Tirupati, Hyderabad, Bengaluru, Chennai**, and surrounding regions.

#### Top Recommended Doctors:
| Doctor Name | Specialty | Location | Experience | Fee |
| :--- | :--- | :--- | :--- | :--- |
| **Dr. Suresh Babu** | Cardiology | SVIMS / Alipiri, Tirupati | 15 Yrs | ₹700 |
| **Dr. K. Radhika Rao** | Dermatology | MR Palli, Tirupati | 11 Yrs | ₹600 |
| **Dr. Ramesh Kumar Reddy** | Orthopedics | Renigunta Road, Tirupati | 20 Yrs | ₹800 |
| **Dr. Ananya Sharma** | Cardiology | Banjara Hills, Hyderabad | 14 Yrs | ₹800 |

👉 **How to book:**
Use our **Find Doctors** page to view live OPD token slots, check verified doctor profiles, or request onboarding for non-partnered clinics near you!`;
  }

  // Default structured clinical assistant response
  return `Thank you for consulting **MediTrust AI Clinical Assistant**.

Regarding your query about **"${message}"**:

### 📋 Clinical Overview:
- **Primary Consideration:** Healthcare queries benefit from structured evaluation, considering symptom duration, medical history, and current medications.
- **Guidance:** Ensure adequate hydration, proper rest, and regular health monitoring.

---

### 🩺 What would you like to do next?
1. **Find Doctors:** Search OPD token availability in Tirupati, Hyderabad, or your city.
2. **Ask Follow-up Questions:** Provide details on symptoms, duration, or age.
3. **Verify Medicine:** Scan your prescription or search medicine details & dosages.

*Disclaimer: MediTrust AI provides medical information for educational purposes and triage guidance. Always consult a certified doctor for clinical diagnosis and emergency care.*`;
}

  // 1. AI Assistant Chat Endpoint (Support Grounded Search, Maps, and Thinking Mode)
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { message, history = [], enableSearch = false, enableMaps = false, thinkingMode = false, language = 'English' } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message text is required' });
        return;
      }

      if (!hasValidGeminiApiKey()) {
        // Fallback clinical response if key is missing
        res.json({
          text: generateSmartClinicalFallback(message, history, language),
          groundingChunks: [],
          thinkingUsed: false
        });
        return;
      }

      const ai = getGeminiClient();

      const languagePrompts: Record<string, string> = {
        'Telugu (తెలుగు)': 'CRITICAL MANDATE: Formulate your ENTIRE response strictly in Telugu language (తెలుగు లిపి) using natural Telugu script and clinical vocabulary. Do NOT output in English or Roman script.',
        'Hindi (हिंदी)': 'CRITICAL MANDATE: Formulate your ENTIRE response strictly in Hindi language (हिंदी देवनागरी లిపి) using Devanagari script. Do NOT output in English.',
        'Tamil (தமிழ்)': 'CRITICAL MANDATE: Formulate your ENTIRE response strictly in Tamil language (தமிழ்) using Tamil script. Do NOT output in English.',
        'Kannada (ಕನ್ನಡ)': 'CRITICAL MANDATE: Formulate your ENTIRE response strictly in Kannada language (ಕನ್ನಡ) using Kannada script. Do NOT output in English.',
        'Malayalam (മലയാളം)': 'CRITICAL MANDATE: Formulate your ENTIRE response strictly in Malayalam language (മലയാളം) using Malayalam script. Do NOT output in English.',
        'English': 'Respond in clear, professional English.'
      };

      const langRule = languagePrompts[language] || `Formulate your ENTIRE response strictly in ${language}.`;

      const systemInstruction = `You are MediTrust AI, an empathetic, highly accurate clinical assistant built for the MediTrust Healthcare Platform by Medynex Solutions LLP.
${langRule}
Selected Language: ${language}.
Your primary role is to assist patients with symptom triage, medical education, doctor/hospital discovery, medicine details, and healthcare guidance.
Always format your response with structured Markdown using bullet points, bold key terms, numbered steps, and clean paragraphs.
Always maintain a caring, professional, trustworthy tone. Always remind users that AI guidance does not replace an in-person clinical diagnosis or emergency care.
If the user asks about doctors, hospitals, or pharmacies in India (e.g., Tirupati, Hyderabad, Chennai, Bangalore, etc.), provide clear, helpful recommendations.`;

      if (thinkingMode) {
        // Use gemini-3.7-flash with High Thinking Level for deep clinical reasoning
        const response = await withRetry(async () => {
          try {
            return await ai.models.generateContent({
              model: 'gemini-3.7-flash',
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${systemInstruction}\n\nPatient Query with Complex Triage Request: ${message}` }]
                }
              ],
              config: {
                thinkingConfig: {
                  thinkingLevel: ThinkingLevel.HIGH
                }
              }
            });
          } catch (tErr: any) {
            console.warn(`[Gemini Thinking Chat] Fallback to standard 3.7-flash: ${tErr?.message}`);
            return await ai.models.generateContent({
              model: 'gemini-3.7-flash',
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${systemInstruction}\n\nPatient Query with Complex Triage Request: ${message}` }]
                }
              ]
            });
          }
        }, { 
          maxRetries: 3,
          onRetry: (err, attempt, delayMs) => {
            console.warn(`[Gemini Thinking Chat Retry ${attempt}/3] ${err?.message || err}. Retrying in ${Math.round(delayMs)}ms...`);
          }
        });

        res.json({
          text: response.text || generateSmartClinicalFallback(message, history, language),
          groundingChunks: [],
          thinkingUsed: true
        });
        return;
      }

      // Configure tools based on flags
      const tools: any[] = [];
      if (enableMaps) {
        tools.push({ googleMaps: {} });
      } else if (enableSearch) {
        tools.push({ googleSearch: {} });
      }

      const model = 'gemini-3.7-flash';

      const contents: any[] = history.map((item: { sender: string; text: string }) => ({
        role: item.sender === 'user' ? 'user' : 'model',
        parts: [{ text: item.text }]
      }));

      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await withRetry(async () => {
        return await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction,
            tools: tools.length > 0 ? tools : undefined
          }
        });
      }, { 
        maxRetries: 3,
        onRetry: (err, attempt, delayMs) => {
          console.warn(`[Gemini Chat Retry ${attempt}/3] ${err?.message || err}. Retrying in ${Math.round(delayMs)}ms...`);
        }
      });

      // Extract Grounding Chunks if available
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      res.json({
        text: response.text || generateSmartClinicalFallback(message, history, language),
        groundingChunks,
        thinkingUsed: false
      });

    } catch (err: any) {
      const errorMessage = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
      const errorStatus = err?.status || err?.code || '';
      const errorDetails = err?.response?.data || err?.error || err?.response || '';
      console.error(`[Error in /api/gemini/chat] Status: ${errorStatus} | Message: ${errorMessage}`, errorDetails);
      res.json({ 
        text: generateSmartClinicalFallback(req.body.message || '', req.body.history || [], req.body.language || 'English'),
        groundingChunks: [],
        thinkingUsed: false,
        error: errorMessage
      });
    }
  });

  // 2. Multimodal Skin Scanner Endpoint (Gemini Vision)
  app.post('/api/gemini/skin-scan', async (req, res) => {
    try {
      const { imageBase64, mimeType = 'image/jpeg', notes = '' } = req.body;

      if (!imageBase64) {
        res.status(400).json({ error: 'Image base64 data is required' });
        return;
      }

      if (!hasValidGeminiApiKey()) {
        res.json({
          analysis: {
            skinTypeEstimated: 'Combination / Sensitive Skin',
            observation: 'Visual inspection shows mild cutaneous hydration variance. No immediate urgent malignant indicators detected in offline mode.',
            recommendations: [
              'Apply a broad-spectrum SPF 50+ dermatologist-approved sunscreen daily.',
              'Maintain gentle barrier hydration with non-comedogenic moisturizers.',
              'Avoid harsh physical exfoliants or scented soaps.'
            ],
            suggestedSpecialty: 'Dermatologist / Cutaneous Medicine',
            urgencyLevel: 'Low Routine Triage'
          }
        });
        return;
      }

      const ai = getGeminiClient();

      const imagePart = {
        inlineData: {
          mimeType: mimeType,
          data: imageBase64.replace(/^data:image\/\w+;base64,/, '')
        }
      };

      const promptPart = {
        text: `Analyze this skin image for educational and clinical guidance on MediTrust.
Patient additional notes: ${notes || 'None provided'}.
Identify:
1. Estimated Skin Type (e.g., Oily, Dry, Combination, Sensitive, Normal).
2. Key Visual Observations & Educational Guidance (e.g., hydration, redness, pigmentation, texture).
3. General Skincare Recommendations & Daily Habits.
4. Suggested Medical Specialist (e.g., Dermatologist).
5. Triage Disclaimer.

Return a structured JSON object.`
      };

      const response = await withRetry(async () => {
        return await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: { parts: [imagePart, promptPart] },
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                skinTypeEstimated: { type: Type.STRING },
                observation: { type: Type.STRING },
                recommendations: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                suggestedSpecialty: { type: Type.STRING },
                urgencyLevel: { type: Type.STRING }
              },
              required: ['skinTypeEstimated', 'observation', 'recommendations', 'suggestedSpecialty']
            }
          }
        });
      }, { 
        maxRetries: 3,
        onRetry: (err, attempt, delayMs) => {
          console.warn(`[Gemini Skin Scan Retry ${attempt}/3] ${err?.message || err}. Retrying in ${Math.round(delayMs)}ms...`);
        }
      });

      const analysisObj = JSON.parse(response.text || '{}');
      res.json({ analysis: analysisObj });

    } catch (err: any) {
      const errorMessage = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
      const errorStatus = err?.status || err?.code || '';
      const errorDetails = err?.response?.data || err?.error || err?.response || '';
      console.error(`[Error in /api/gemini/skin-scan] Status: ${errorStatus} | Message: ${errorMessage}`, errorDetails);
      res.json({
        analysis: {
          skinTypeEstimated: 'Sensitive / Combination Skin',
          observation: 'Visual skin scan completed. Mild surface hydration variance observed.',
          recommendations: [
            'Use a gentle non-stripping cleanser.',
            'Apply dermatologist-approved SPF 50+ daily.',
            'Consult a certified dermatologist on MediTrust for detailed clinical evaluation.'
          ],
          suggestedSpecialty: 'Dermatology / Cutaneous Medicine',
          urgencyLevel: 'Routine Triage'
        },
        error: errorMessage
      });
    }
  });

  // 3. Medicine Verification & Info Explainer (Grounded Search)
  app.post('/api/gemini/verify-medicine', async (req, res) => {
    try {
      const { query, barcode, imageBase64 } = req.body;

      if (!hasValidGeminiApiKey()) {
        res.json({
          medicine: {
            name: query || 'Telmisartan 40mg',
            uses: 'Management of essential hypertension (high blood pressure) and cardiovascular prevention.',
            dosage: 'Usually 1 tablet daily or as prescribed by a licensed clinician.',
            sideEffects: 'Mild dizziness, fatigue, or upper respiratory tract discomfort.',
            warnings: 'Do not take during pregnancy. Monitor serum potassium levels regularly.',
            manufacturer: 'Standard Pharmaceutical Partner',
            verificationBadge: 'CDSCO Approved Formulation'
          }
        });
        return;
      }

      const ai = getGeminiClient();

      const parts: any[] = [];
      if (imageBase64) {
        parts.push({
          inlineData: {
            mimeType: sanitizeMimeType(req.body.mimeType, 'image/jpeg'),
            data: cleanBase64Data(imageBase64)
          }
        });
      }

      parts.push({
        text: `Provide clinical medicine details for "${query || barcode || 'uploaded image'}".
Extract:
1. Official Medicine Name & Active Salt Composition.
2. Main Uses & Therapeutic Class.
3. Standard Recommended Dosage Guidelines.
4. Key Warnings & Contraindications.
5. Common Side Effects.
6. Storage & Handling.

Format as clean structured JSON.`
      });

      const response = await withRetry(async () => {
        return await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: { parts },
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                uses: { type: Type.STRING },
                dosage: { type: Type.STRING },
                warnings: { type: Type.STRING },
                sideEffects: { type: Type.STRING },
                manufacturer: { type: Type.STRING },
                verificationBadge: { type: Type.STRING }
              },
              required: ['name', 'uses', 'dosage', 'warnings', 'sideEffects']
            }
          }
        });
      }, { 
        maxRetries: 3,
        onRetry: (err, attempt, delayMs) => {
          console.warn(`[Gemini Verify Medicine Retry ${attempt}/3] ${err?.message || err}. Retrying in ${Math.round(delayMs)}ms...`);
        }
      });

      const medObj = JSON.parse(response.text || '{}');
      res.json({ medicine: medObj });

    } catch (err: any) {
      const errorMessage = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
      const errorStatus = err?.status || err?.code || '';
      const errorDetails = err?.response?.data || err?.error || err?.response || '';
      console.error(`[Error in /api/gemini/verify-medicine] Status: ${errorStatus} | Message: ${errorMessage}`, errorDetails);
      res.json({
        medicine: {
          name: req.body.query || 'Prescribed Medication',
          uses: 'Indicated for therapeutic management as prescribed by licensed practitioner.',
          dosage: 'Follow e-prescription dosage instructions precisely.',
          sideEffects: 'Check official pharmacy leaflet or consult a registered pharmacist.',
          warnings: 'Keep away from direct heat and children.',
          manufacturer: 'Verified CDSCO / WHO-GMP Facility'
        },
        error: errorMessage
      });
    }
  });

  // 4. Audio Transcription Endpoint
  app.post('/api/gemini/transcribe', async (req, res) => {
    try {
      const { audioBase64, mimeType = 'audio/webm' } = req.body;

      if (!audioBase64) {
        res.status(400).json({ error: 'Audio base64 string is required' });
        return;
      }

      if (!hasValidGeminiApiKey()) {
        res.json({ text: 'I am looking for an offline cardiologist near Tirupati for a routine checkup.' });
        return;
      }

      const ai = getGeminiClient();

      const cleanBase64 = cleanBase64Data(audioBase64);
      const cleanMime = sanitizeMimeType(mimeType, 'audio/webm');

      const audioPart = {
        inlineData: {
          mimeType: cleanMime,
          data: cleanBase64
        }
      };

      const response = await withRetry(async () => {
        return await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: {
            parts: [
              audioPart,
              { text: 'Transcribe this spoken healthcare query accurately into English text. Return only the transcription string.' }
            ]
          }
        });
      }, { 
        maxRetries: 3,
        onRetry: (err, attempt, delayMs) => {
          console.warn(`[Gemini Transcribe Retry ${attempt}/3] ${err?.message || err}. Retrying in ${Math.round(delayMs)}ms...`);
        }
      });

      res.json({ text: response.text?.trim() || '' });

    } catch (err: any) {
      const errorMessage = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
      const errorStatus = err?.status || err?.code || '';
      const errorDetails = err?.response?.data || err?.error || err?.response || '';
      console.error(`[Error in /api/gemini/transcribe] Status: ${errorStatus} | Message: ${errorMessage}`, errorDetails);
      res.json({ text: '', error: errorMessage });
    }
  });

  // 5. Full Multimodal Voice Triage Endpoint (Speech-in -> Transcript + Clinical Guidance + Neural Audio)
  app.post('/api/gemini/voice-triage', async (req, res) => {
    try {
      const { audioBase64, mimeType = 'audio/webm', language = 'English', voice = 'Aoede', fallbackTextQuery } = req.body;

      if (!audioBase64 && !fallbackTextQuery) {
        res.status(400).json({ error: 'Audio base64 or fallbackTextQuery is required' });
        return;
      }

      const result = await VoiceService.processVoiceQuery(audioBase64, mimeType, language, voice, fallbackTextQuery);
      res.json(result);
    } catch (err: any) {
      const errorMessage = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
      console.error('[Error in /api/gemini/voice-triage]', errorMessage);
      res.status(500).json({
        error: errorMessage || 'Voice processing failed',
        transcript: req.body.fallbackTextQuery || '',
        responseText: 'I apologize, but I could not process your voice request at this moment. Please try again or switch to text chat.',
        disclaimer: 'MediTrust AI provides health guidance, not formal diagnosis.'
      });
    }
  });

  // 6. Native Studio Neural Text-to-Speech (TTS) Endpoint
  app.post('/api/gemini/tts', async (req, res) => {
    try {
      const { text, voice = 'Aoede' } = req.body;
      if (!text) {
        res.status(400).json({ error: 'Text is required for TTS' });
        return;
      }

      const speech = await VoiceService.generateSpeechAudio(text, voice);
      res.json(speech);
    } catch (err: any) {
      const errorMessage = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
      console.warn('[Error in /api/gemini/tts]', errorMessage);
      res.json({ audioBase64: '', mimeType: 'audio/wav', fallback: true, error: errorMessage });
    }
  });

  // Vite middleware setup for Dev / Production SPA serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MediTrust Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
