export type OsmPlaceType = 'pharmacy' | 'hospital';

export interface MapLocation {
  label: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface MapPlace {
  id: string;
  name: string;
  type: OsmPlaceType;
  latitude: number;
  longitude: number;
  address?: string;
  phone?: string;
  openingHours?: string;
  distanceKm: number;
}

export async function geocodeLocation(query: string): Promise<MapLocation[]> {
  const res = await fetch(`/api/osm/geocode?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Location search is unavailable right now. Please try again.');
  const data = await res.json();
  return (data.results || []) as MapLocation[];
}

export async function reverseGeocodeCoords(lat: number, lng: number): Promise<MapLocation | null> {
  const res = await fetch(`/api/osm/reverse?lat=${lat}&lng=${lng}`);
  if (!res.ok) return null;
  const data = await res.json();
  return (data.result || null) as MapLocation | null;
}

export async function findNearbyCare(
  lat: number,
  lng: number,
  radiusMeters: number,
  types: OsmPlaceType[]
): Promise<MapPlace[]> {
  const params = new URLSearchParams({
    lat: String(lat),
    lng: String(lng),
    radius: String(radiusMeters),
    types: types.join(',')
  });
  const res = await fetch(`/api/osm/nearby?${params.toString()}`);
  if (!res.ok) throw new Error('Nearby pharmacies and hospitals could not be loaded. Please try again.');
  const data = await res.json();
  return (data.places || []) as MapPlace[];
}

export function getOsmDirectionsUrl(lat: number, lng: number): string {
  return `https://www.openstreetmap.org/directions?to=${lat}%2C${lng}`;
}

export function getOsmPlaceUrl(lat: number, lng: number): string {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`;
}
