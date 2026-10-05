# MediTrust

MediTrust is a healthcare discovery platform for finding doctors, hospitals, pharmacies, and medicine information.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `GEMINI_API_KEY` in `.env.local` to your Gemini API key. This is a server-only secret; do not add a `VITE_` prefix or commit the file.
4. Start the app with `npm run dev`.

The server loads `.env.local` first, then `.env`. Without a Gemini key, or while Gemini is rate-limited or temporarily unavailable, the assistant shows a notice and uses its built-in healthcare guidance fallback. General generative answers require a working Gemini key and available provider quota.

## Search and listings

- Doctor and medicine pages are search-only; appointment booking and medicine ordering are not available.
- Doctor and pharmacy search links open Google Maps in a new tab. These links do not require a Maps API key.
- In-app nearby place discovery requires `GOOGLE_MAPS_API_KEY` with the Google Places API enabled.
- Medicine results come from the MediTrust reference catalog. Prices and pharmacy inventory are not live; confirm them with a pharmacist.
