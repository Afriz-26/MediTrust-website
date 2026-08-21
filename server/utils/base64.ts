/**
 * Utility functions for robust Base64 data and MIME type handling.
 */

/**
 * Strips data URL prefix (e.g. "data:audio/webm;codecs=opus;base64,...") and returns pure base64 payload.
 */
export function cleanBase64Data(input: string | undefined | null): string {
  if (!input || typeof input !== 'string') return '';
  const trimmed = input.trim();
  
  // If it contains ";base64,", split by that pattern
  const base64Index = trimmed.indexOf(';base64,');
  if (base64Index !== -1) {
    return trimmed.substring(base64Index + 8).trim();
  }
  
  // If it starts with "data:", find the first comma
  if (trimmed.startsWith('data:')) {
    const commaIndex = trimmed.indexOf(',');
    if (commaIndex !== -1) {
      return trimmed.substring(commaIndex + 1).trim();
    }
  }

  // Otherwise remove standard prefix or return raw
  return trimmed.replace(/^data:[^;]+;base64,/, '').trim();
}

/**
 * Normalizes MIME type string, stripping codec/charset parameters that can cause Gemini API validation errors.
 * e.g. "audio/webm;codecs=opus" -> "audio/webm"
 */
export function sanitizeMimeType(mime: string | undefined | null, fallback: string = 'audio/webm'): string {
  if (!mime || typeof mime !== 'string') return fallback;
  const clean = mime.split(';')[0].trim().toLowerCase();
  return clean || fallback;
}
