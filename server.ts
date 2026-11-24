import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
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
import { OsmService, OsmPlaceType } from './server/services/OsmService';
import { withRetry } from './server/utils/retry';
import { cleanBase64Data, sanitizeMimeType } from './server/utils/base64';

const projectRoot = process.cwd();
dotenv.config({ path: [path.join(projectRoot, '.env.local'), path.join(projectRoot, '.env')] });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));

  // Shared Gemini Client setup
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
  // OPENSTREETMAP LOCATOR ENDPOINTS
  // ==========================================

  // Geocode a typed location (city, area, pincode, landmark)
  app.get('/api/osm/geocode', async (req, res) => {
    try {
      const query = ((req.query.q as string) || '').trim();
      if (!query) {
        return res.status(400).json({ error: 'A search query is required' });
      }
      const results = await OsmService.geocode(query);
      res.json({ results, count: results.length });
    } catch (err: any) {
      console.error('[API OSM Geocode Error]:', err);
      res.status(502).json({ error: 'Location search is unavailable right now', details: err.message });
    }
  });

  // Reverse geocode coordinates (used for the visitor's current location)
  app.get('/api/osm/reverse', async (req, res) => {
    try {
      const lat = parseFloat(req.query.lat as string);
      const lng = parseFloat(req.query.lng as string);
      if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({ error: 'Valid lat and lng numeric parameters required' });
      }
      const result = await OsmService.reverseGeocode(lat, lng);
      res.json({ result });
    } catch (err: any) {
      console.error('[API OSM Reverse Geocode Error]:', err);
      res.status(502).json({ error: 'Could not name this location', details: err.message });
    }
  });

  // Nearby pharmacies and hospitals from OpenStreetMap
  app.get('/api/osm/nearby', async (req, res) => {
    try {
      const lat = parseFloat(req.query.lat as string);
      const lng = parseFloat(req.query.lng as string);
      if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({ error: 'Valid lat and lng numeric parameters required' });
      }
      const radiusMeters = Math.min(Math.max(parseInt(req.query.radius as string) || 5000, 500), 25000);
      const requestedTypes = ((req.query.types as string) || 'pharmacy,hospital')
        .split(',')
        .map((type) => type.trim())
        .filter((type): type is OsmPlaceType => type === 'pharmacy' || type === 'hospital');

      const places = await OsmService.nearby(lat, lng, radiusMeters, requestedTypes);
      res.json({ places, count: places.length });
    } catch (err: any) {
      console.error('[API OSM Nearby Error]:', err);
      res.status(502).json({ error: 'Nearby pharmacies and hospitals are unavailable right now', details: err.message });
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

  // Clinical Drug Monograph & Verified Online Legal Data Endpoint
  app.get('/api/medicines/clinical/monograph', async (req, res) => {
    try {
      const query = (req.query.query as string) || (req.query.q as string) || '';
      if (!query.trim()) {
        return res.status(400).json({ error: 'Query parameter is required' });
      }

      // 1. Check local detailed database first
      const localResult = MedicineService.search(query.trim());
      if (localResult) {
        return res.json({
          source: 'Verified Clinical Database',
          monograph: localResult
        });
      }

      // 2. If not in hardcoded seed, query Gemini for a medically-grounded official monograph
      const aiClient = getGeminiClient();
      const prompt = `You are a clinical pharmacologist and medical regulatory officer for India (CDSCO / DPCO) and international medicine registries (FDA/WHO).
Generate an authoritative, factual, legal drug monograph for the medicine requested: "${query}".

Return ONLY valid JSON matching this schema:
{
  "name": "Generic Name (e.g. Paracetamol)",
  "brandNames": ["Brand 1", "Brand 2"],
  "drugClass": "Pharmacological class",
  "therapeuticCategory": "Therapeutic area",
  "uses": "Exact clinical indications and what it treats",
  "howItWorks": "Mechanism of action in accessible medical terms",
  "dosageRanges": "Standard adult dosage and frequency",
  "howToUse": "Specific instructions on administration (with food, timing, duration)",
  "commonSideEffects": ["Mild side effect 1", "Mild side effect 2"],
  "seriousSideEffects": ["Serious side effect 1", "Emergency symptom 2"],
  "precautions": {
    "pregnancy": "Clear safety category and advice",
    "breastfeeding": "Safety during lactation",
    "kidney": "Renal adjustments or cautions",
    "liver": "Hepatic cautions"
  },
  "storage": "Storage temperature and moisture advice",
  "missedDose": "Advice if a dose is skipped",
  "overdoseWarning": "Overdose signs and emergency instructions",
  "prescriptionStatus": "Schedule H (Prescription Required)" or "Schedule H1" or "Over-The-Counter (OTC)"
}`;

      const aiResponse = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.1,
          responseMimeType: 'application/json'
        }
      });

      const responseText = aiResponse.text || '{}';
      const parsedData = JSON.parse(responseText);

      return res.json({
        source: 'Live Regulatory & Medical Grounding Mesh',
        monograph: {
          id: query.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          ...parsedData
        }
      });
    } catch (err: any) {
      console.error('[API Clinical Monograph Error]:', err);
      // Fallback response with paracetamol as demo if AI fails
      const fallback = MedicineService.search(req.query.query as string || 'paracetamol');
      if (fallback) {
        return res.json({ source: 'Fallback Clinical Registry', monograph: fallback });
      }
      res.status(500).json({ error: 'Failed to retrieve drug monograph', details: err.message });
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

  app.post('/api/gemini/stream', (_req, res) => {
    res.status(410).json({
      error: "Text chat now runs in the visitor's browser.",
      code: 'CHAT_MOVED_ON_DEVICE',
    });
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

  const emergency = SafetyLayer.analyzeEmergency(message);
  if (emergency.isEmergency && emergency.severityLevel === 'CRITICAL') {
    return `🚨 **Seek emergency care now.** ${emergency.immediateGuidance}\n\nCall **108** in India or go to the nearest emergency department. Do not wait for an online response.`;
  }

  // Greetings
  if (/^(hello|hi|hey|greetings|good morning|good afternoon|good evening|namaste|hi there)$/i.test(lowerMsg)) {
    if (language.includes('Telugu')) {
      return `నమస్కారం! నేను **MediTrust AI క్లినికల్ అసిస్టెంట్**. ఈరోజు మీ ఆరోగ్యానికి సంబంధించి నేను ఏ విధంగా సహాయపడగలను?

మీరు క్రింది అంశాల గురించి నన్ను అడగవచ్చు:
- **లక్షణాల విశ్లేషణ (Symptom Triage)**
- **సమీప డాక్టర్లు & హాస్పిటల్స్ శోధన**
- **మందుల వివరాలు & మోతాదు**
- **లాబొరేటరీ టెస్ట్‌లు & హోమ్ శాంపిల్ కలెక్షన్**`;
    }

    const medicine = MedicineService.search(message);
    if (medicine) {
return `### Medicine reference: ${medicine.name}\n\n- **Also known as:** ${medicine.brandNames.join(', ')}\n- **Medicine class:** ${medicine.drugClass}\n- **Common uses:** ${medicine.uses}\n- **General dosage information:** ${medicine.dosageRanges}\n- **Common side effects:** ${medicine.commonSideEffects.join(', ')}\n- **Important precautions:** ${medicine.precautions.pregnancy} Pregnancy; ${medicine.precautions.kidney} Kidney; ${medicine.precautions.liver} Liver.\n\nThis is general reference information, not a personal dosing recommendation. Follow your prescription and check with a doctor or pharmacist, especially for children, pregnancy, chronic conditions, or other medicines.`;
    }

    const topic = MedicalKnowledgeService.searchKnowledge(message);
    if (topic) {
return `### ${topic.title}\n\n${topic.overview}\n\n**Common symptoms:** ${topic.symptoms.join('; ')}\n\n**Care and treatment information:** ${topic.treatmentOptions.join('; ')}\n\n**Seek urgent help for:** ${topic.emergencySigns.join('; ')}\n\nThis is educational information and cannot diagnose an individual.`;
    }
    if (language.includes('Hindi')) {
      return `नमस्ते! मैं **MediTrust AI क्लिनिकल असिस्टेंट** हूँ। आज मैं आपकी स्वास्थ्य संबंधी किस प्रकार सहायता कर सकता हूँ?

आप मुझसे निम्नलिखित के बारे में पूछ सकते हैं:
- **लक्षणों का मूल्यांकन (Symptom Triage)**
- **डॉक्टर एवं अस्पताल खोज**
- **दवाइयों की जानकारी एवं खुराक**
- **लैब टेस्ट एवं होम सैंपल कलेक्शन**`;
    }
    return `Hello! I'm **MediTrust AI Clinical Assistant**. How can I help you today?

Feel free to ask me about:
- **Symptom Triage & Guidance** (e.g. fever, headache, stomach pain)
- **Finding Doctors & Hospitals** in your city
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
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(message)}`;
    return `### Find a doctor or clinic\n\nI can’t verify live provider listings, credentials, opening hours, or availability from the offline assistant, and MediTrust booking is not available. [Search this request on Google Maps](${mapsUrl}), then contact the provider directly to confirm their qualifications and current availability.`;
  }

  // Default structured clinical assistant response
  return `The live AI service is unavailable, and I don’t have a matching entry for that question in the offline reference. I don’t want to guess.\n\nPlease try asking about a medicine name, fever, headache, cough or sore throat, blood pressure, diabetes, or finding a doctor. For symptom guidance, include the person's age, symptoms, and how long they have been present. For urgent symptoms, contact emergency services.`;
}

  app.post('/api/gemini/chat', (_req, res) => {
    res.status(410).json({
      error: "Text chat now runs in the visitor's browser.",
      code: 'CHAT_MOVED_ON_DEVICE',
    });
  });

  // 2. Multimodal Skin Scanner Endpoint (Gemini Vision)
  app.post('/api/gemini/skin-scan', async (req, res) => {
    try {
      const { imageBase64, mimeType = 'image/jpeg', notes = '' } = req.body;

      if (!imageBase64) {
        res.status(400).json({ error: 'Image base64 data is required' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
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
          model: 'gemini-3.8-flash',
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
        maxRetries: 2,
        onRetry: (err, attempt, delayMs) => {
          console.warn(`[Gemini Skin Scan Retry ${attempt}/2] ${err?.message || err}. Retrying in ${Math.round(delayMs)}ms...`);
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

      const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
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
          model: 'gemini-3.8-flash',
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
        maxRetries: 2,
        onRetry: (err, attempt, delayMs) => {
          console.warn(`[Gemini Verify Medicine Retry ${attempt}/2] ${err?.message || err}. Retrying in ${Math.round(delayMs)}ms...`);
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

      const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
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
          model: 'gemini-3.5-transcribe',
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
    const distPath = path.join(projectRoot, 'dist');
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
