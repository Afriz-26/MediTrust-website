export function getGoogleMapsSearchUrl(query: string): string {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) {
    return 'https://www.google.com/maps';
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(normalizedQuery)}`;
}
