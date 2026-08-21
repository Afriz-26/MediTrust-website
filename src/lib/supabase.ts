import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;

function getValidSupabaseUrl(url: string | undefined): string {
  if (!url || typeof url !== 'string') {
    return 'https://xyzcompany.supabase.co';
  }
  const trimmed = url.trim();
  if (!trimmed) {
    return 'https://xyzcompany.supabase.co';
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return trimmed;
    }
  } catch {
    // URL parsing failed
  }
  return 'https://xyzcompany.supabase.co';
}

const supabaseUrl = getValidSupabaseUrl(rawUrl);
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const isSupabaseConfigured = Boolean(
  rawUrl &&
  typeof rawUrl === 'string' &&
  getValidSupabaseUrl(rawUrl) !== 'https://xyzcompany.supabase.co' &&
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  import.meta.env.VITE_SUPABASE_ANON_KEY !== 'your-supabase-anon-key'
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
});
