# MediTrust

MediTrust is a healthcare discovery platform for finding doctors, hospitals, pharmacies, and medicine information.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Add the server-side API keys needed for optional voice transcription, text-to-speech, skin scanning, and medicine verification. Keep secrets server-only; do not add a `VITE_` prefix or commit the file.
4. Start the app with `npm run dev`.

The assistant's text chat runs in the visitor's browser using the multilingual Qwen3 0.6B model through WebLLM and WebGPU; it does not send chat prompts to Gemini or require a chat API key. The first chat downloads about **0.33 GB** of model files from Hugging Face and stores them in the browser cache. The download is one-time per browser unless its site data is cleared. A WebGPU-capable browser and sufficient device memory are required. The compact model can make mistakes and is not a medical device; its responses are general information, not diagnosis or treatment.

The server loads `.env.local` first, then `.env`. For Vercel deployments, configure `GEMINI_API_KEY` only if you enable the separate Gemini-backed voice transcription, text-to-speech, skin scanning, or medicine-verification tools. Those optional tools may incur API usage; the browser-local text chat does not.

## Search and listings

- Doctor and medicine pages are search-only; appointment booking and medicine ordering are not available.
- Doctor and pharmacy search links open Google Maps in a new tab. These links do not require a Maps API key.
- In-app nearby place discovery requires `GOOGLE_MAPS_API_KEY` with the Google Places API enabled.
- Medicine results come from the MediTrust reference catalog. Prices and pharmacy inventory are not live; confirm them with a pharmacist.
