/**
 * Server-side Exponential Backoff & Retry Utility for Gemini API requests.
 * Catches network glitches, status 429 (Too Many Requests), 500, 502, 503, 504,
 * and socket resets, waiting with exponential backoff and random jitter.
 */

export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffFactor?: number;
  onRetry?: (error: any, attempt: number, delayMs: number) => void;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const maxRetries = options.maxRetries ?? 3;
  const initialDelayMs = options.initialDelayMs ?? 1000;
  const maxDelayMs = options.maxDelayMs ?? 8000;
  const backoffFactor = options.backoffFactor ?? 2;

  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (err: any) {
      attempt++;

      const status = err?.status || err?.statusCode || err?.response?.status;
      const message = String(err?.message || err || '');

      const isRateLimitOr429 =
        status === 429 ||
        message.includes('429') ||
        message.includes('RESOURCE_EXHAUSTED') ||
        message.includes('Too Many Requests');

      // If error specifies a long retry delay (e.g., > 10s free tier limit), do not do rapid retries
      const errorDetails = err?.error?.details || err?.details || [];
      let serverRetryDelaySec = 0;
      for (const d of errorDetails) {
        if (d?.retryDelay) {
          const match = String(d.retryDelay).match(/(\d+)/);
          if (match) serverRetryDelaySec = parseInt(match[1], 10);
        }
      }

      const isLongQuotaExhaustion = isRateLimitOr429 && serverRetryDelaySec > 10;

      const isTransientServerError =
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504 ||
        message.includes('503') ||
        message.includes('500') ||
        message.includes('Service Unavailable') ||
        message.includes('Overloaded');

      const isNetworkError =
        message.includes('fetch failed') ||
        message.includes('ETIMEDOUT') ||
        message.includes('ECONNRESET') ||
        message.includes('network') ||
        message.includes('socket hang up') ||
        err?.name === 'AbortError';

      const isRetryable = attempt <= maxRetries && !isLongQuotaExhaustion && (isRateLimitOr429 || isTransientServerError || isNetworkError);

      if (!isRetryable) {
        throw err;
      }

      // Calculate exponential delay with jitter
      const exponentialDelay = initialDelayMs * Math.pow(backoffFactor, attempt - 1);
      const jitter = Math.random() * 400;
      const delayMs = Math.min(exponentialDelay + jitter, maxDelayMs);

      if (options.onRetry) {
        options.onRetry(err, attempt, delayMs);
      } else {
        console.warn(`[Gemini Retry] Attempt ${attempt}/${maxRetries} failed (${message}). Retrying in ${Math.round(delayMs)}ms...`);
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}
