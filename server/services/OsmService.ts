/**
 * OpenStreetMap locator service.
 * Geocodes searched locations and finds nearby pharmacies and hospitals with
 * the Nominatim API, so the locator map needs no paid map key.
 */

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org';
const USER_AGENT = 'MediTrust-Locator/1.0 (https://medynex.com)';

export type OsmPlaceType = 'pharmacy' | 'hospital';

export interface OsmLocation {
  label: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface OsmPlace {
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

interface CacheEntry {
  expiresAt: number;
  value: unknown;
}

const cache = new Map<string, CacheEntry>();

function fromCache<T>(key: string, ttlMs: number, load: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && hit.expiresAt > Date.now()) {
    return Promise.resolve(hit.value as T);
  }
  return load().then((value) => {
    cache.set(key, { expiresAt: Date.now() + ttlMs, value });
    return value;
  });
}

function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const earthRadius = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function pickAddress(address: Record<string, string> | undefined): {
  city: string;
  state: string;
} {
  if (!address) return { city: '', state: '' };
  return {
    city: address.city || address.town || address.village || address.suburb || address.county || '',
    state: address.state || address.region || ''
  };
}

const NOMINATIM_INTERVAL_MS = 1000;
let nominatimQueue: Promise<unknown> = Promise.resolve();
let lastRequestAt = 0;

/** Nominatim asks for at most one request per second, so calls wait their turn. */
function queuedNominatim<T>(task: () => Promise<T>): Promise<T> {
  const run = nominatimQueue.then(async () => {
    const wait = Math.max(0, lastRequestAt + NOMINATIM_INTERVAL_MS - Date.now());
    if (wait > 0) {
      await new Promise((resolve) => setTimeout(resolve, wait));
    }
    lastRequestAt = Date.now();
    return task();
  });
  nominatimQueue = run.catch(() => undefined);
  return run;
}

async function nominatimJson(path: string): Promise<any> {
  return queuedNominatim(async () => {
    const res = await fetch(`${NOMINATIM_URL}${path}`, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' }
    });
    if (!res.ok) {
      throw new Error(`Nominatim request failed with status ${res.status}`);
    }
    return res.json();
  });
}

/** Bounding box (lon1,lat1,lon2,lat2) around a point, used to bound place searches. */
function viewboxFor(lat: number, lng: number, radiusMeters: number): string {
  const latDelta = radiusMeters / 111320;
  const lngDelta = radiusMeters / (111320 * Math.max(Math.cos((lat * Math.PI) / 180), 0.1));
  return [lng - lngDelta, lat + latDelta, lng + lngDelta, lat - latDelta]
    .map((value) => value.toFixed(6))
    .join(',');
}

function buildAddress(
  address: Record<string, string> | undefined,
  displayName: string,
  name: string
): string | undefined {
  if (address) {
    const parts = [
      [address.house_number, address.road].filter(Boolean).join(' '),
      address.suburb || address.neighbourhood,
      address.city || address.town || address.village,
      address.postcode
    ].filter(Boolean);
    if (parts.length) return parts.join(', ');
  }
  const remainder = (displayName || '')
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part && part !== name)
    .slice(0, 3);
  return remainder.length ? remainder.join(', ') : undefined;
}

export class OsmService {
  /** Resolve a typed location (city, area, pincode, landmark) to coordinates. */
  static async geocode(query: string): Promise<OsmLocation[]> {
    const trimmed = query.trim();
    if (!trimmed) return [];

    return fromCache(`geocode:${trimmed.toLowerCase()}`, 10 * 60 * 1000, async () => {
      const params = new URLSearchParams({
        q: trimmed,
        format: 'jsonv2',
        addressdetails: '1',
        limit: '5'
      });
      const results = (await nominatimJson(`/search?${params.toString()}`)) as any[];
      return results.map((item) => {
        const { city, state } = pickAddress(item.address);
        return {
          label: item.display_name as string,
          city,
          state,
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon)
        };
      });
    });
  }

  /** Describe coordinates so the map can name the area the visitor is standing in. */
  static async reverseGeocode(lat: number, lng: number): Promise<OsmLocation | null> {
    return fromCache(`reverse:${lat.toFixed(3)},${lng.toFixed(3)}`, 10 * 60 * 1000, async () => {
      const params = new URLSearchParams({
        lat: String(lat),
        lon: String(lng),
        format: 'jsonv2',
        addressdetails: '1',
        zoom: '14'
      });
      const item = await nominatimJson(`/reverse?${params.toString()}`);
      if (!item || item.error) return null;
      const { city, state } = pickAddress(item.address);
      return {
        label: item.display_name as string,
        city,
        state,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon)
      };
    });
  }

  /** Pharmacies and hospitals within radiusMeters of a point, nearest first. */
  static async nearby(
    lat: number,
    lng: number,
    radiusMeters: number,
    types: OsmPlaceType[]
  ): Promise<OsmPlace[]> {
    const activeTypes = types.length ? types : (['pharmacy', 'hospital'] as OsmPlaceType[]);
    const cacheKey = `nearby:${lat.toFixed(3)},${lng.toFixed(3)}:${radiusMeters}:${activeTypes.join(',')}`;

    return fromCache(cacheKey, 10 * 60 * 1000, async () => {
      const viewbox = viewboxFor(lat, lng, radiusMeters);

      const responses = await Promise.all(
        activeTypes.map(async (type) => {
          const params = new URLSearchParams({
            q: type,
            format: 'jsonv2',
            addressdetails: '1',
            extratags: '1',
            limit: '50',
            bounded: '1',
            viewbox
          });
          const results = (await nominatimJson(`/search?${params.toString()}`)) as any[];
          return { type, results };
        })
      );

      const maxKm = (radiusMeters / 1000) * 1.05;
      const seen = new Set<string>();
      const places: OsmPlace[] = [];

      for (const { results } of responses) {
        for (const item of results) {
          if (item.category !== 'amenity') continue;
          if (item.type !== 'pharmacy' && item.type !== 'hospital') continue;

          const placeLat = parseFloat(item.lat);
          const placeLng = parseFloat(item.lon);
          if (!Number.isFinite(placeLat) || !Number.isFinite(placeLng)) continue;

          const id = `${item.osm_type}/${item.osm_id}`;
          if (seen.has(id)) continue;

          const km = distanceKm(lat, lng, placeLat, placeLng);
          if (km > maxKm) continue;

          const name = (item.name || (item.display_name || '').split(',')[0] || '').trim();
          if (!name) continue;

          seen.add(id);
          const extra = item.extratags || {};
          places.push({
            id,
            name,
            type: item.type,
            latitude: placeLat,
            longitude: placeLng,
            address: buildAddress(item.address, item.display_name, name),
            phone: extra.phone || extra['contact:phone'] || undefined,
            openingHours: extra.opening_hours || undefined,
            distanceKm: Math.round(km * 100) / 100
          });
        }
      }

      return places.sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 60);
    });
  }
}
