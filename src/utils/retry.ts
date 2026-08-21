/**
 * Resilient client-side fetch helper with exponential backoff and timeout.
 */
export async function fetchJSONWithRetryAndTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 25000,
  maxRetries: number = 3
): Promise<any> {
  let attempt = 0;

  while (attempt <= maxRetries) {
    attempt++;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type') || '';
      const text = await response.text();

      if (!response.ok) {
        let errorMsg = `HTTP_${response.status}`;
        try {
          const errData = JSON.parse(text);
          if (errData.error || errData.message) {
            errorMsg = errData.error || errData.message;
          }
        } catch {
          // If HTML error page, keep clean HTTP status
        }
        if (response.status === 429 || response.status >= 500) {
          throw new Error(`HTTP_${response.status}: ${errorMsg}`);
        }
        throw new Error(errorMsg || `Server status ${response.status}`);
      }

      if (!contentType.includes('application/json') && text.trim().startsWith('<')) {
        throw new Error('SERVER_WARMING_UP_HTML');
      }

      try {
        return JSON.parse(text);
      } catch {
        throw new Error('SERVER_WARMING_UP_HTML');
      }
    } catch (err: any) {
      clearTimeout(timeoutId);

      const isRetryable =
        attempt < maxRetries &&
        (err.name === 'AbortError' ||
          err.message?.includes('HTTP_429') ||
          err.message?.includes('HTTP_500') ||
          err.message?.includes('HTTP_502') ||
          err.message?.includes('HTTP_503') ||
          err.message?.includes('SERVER_WARMING_UP_HTML') ||
          err.message?.includes('Failed to fetch') ||
          err.message?.includes('fetch failed'));

      if (!isRetryable) {
        throw err;
      }

      const backoffMs = Math.min(800 * Math.pow(1.8, attempt - 1) + Math.random() * 200, 3000);
      console.warn(`[Client JSON Retry ${attempt}/${maxRetries}] Retrying in ${Math.round(backoffMs)}ms...`);
      await new Promise((res) => setTimeout(res, backoffMs));
    }
  }
}
