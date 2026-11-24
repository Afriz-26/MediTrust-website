import React, { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/nearby-care-map.css';
import {
  findNearbyCare,
  geocodeLocation,
  reverseGeocodeCoords,
  getOsmDirectionsUrl,
  getOsmPlaceUrl,
  MapPlace,
  OsmPlaceType
} from '../../lib/osmLocator';
import { useLocation } from '../../context/LocationContext';
import { AlertCircle, Crosshair, ExternalLink, Loader2, MapPin, Navigation, Search } from 'lucide-react';

type TypeFilter = 'all' | OsmPlaceType;

interface NearbyCareMapProps {
  /** Which places the filter starts on. */
  defaultType?: TypeFilter;
  /** Match the surrounding page: light cards or dark cards. */
  variant?: 'light' | 'dark';
}

const DEFAULT_CENTER = { lat: 13.6288, lng: 79.4192 };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDistance(km: number): string {
  return km < 1 ? `${Math.max(50, Math.round(km * 1000))} m` : `${km.toFixed(1)} km`;
}

function placePin(type: OsmPlaceType): L.DivIcon {
  return L.divIcon({
    className: `mt-map-pin mt-map-pin--${type}`,
    html: '<span></span>',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -12]
  });
}

const youPin = L.divIcon({
  className: 'mt-map-you',
  html: '<span></span>',
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

export const NearbyCareMap: React.FC<NearbyCareMapProps> = ({ defaultType = 'all', variant = 'light' }) => {
  const { location } = useLocation();

  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [centerLabel, setCenterLabel] = useState('');
  const [places, setPlaces] = useState<MapPlace[]>([]);
  const [busy, setBusy] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [radiusKm, setRadiusKm] = useState(5);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>(defaultType);
  const [activeId, setActiveId] = useState<string | null>(null);

  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const markerIndexRef = useRef<Map<string, L.Marker>>(new Map());
  const youMarkerRef = useRef<L.Marker | null>(null);

  const visiblePlaces = useMemo(
    () => (typeFilter === 'all' ? places : places.filter((place) => place.type === typeFilter)),
    [places, typeFilter]
  );

  // Build the OpenStreetMap once.
  useEffect(() => {
    if (!mapElRef.current || mapRef.current) return;

    const map = L.map(mapElRef.current, {
      center: [center.lat, center.lng],
      zoom: 13,
      scrollWheelZoom: false
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    const resize = window.setTimeout(() => map.invalidateSize(), 200);

    return () => {
      window.clearTimeout(resize);
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
      markerIndexRef.current.clear();
      youMarkerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the map pointed at the searched location.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.setView([center.lat, center.lng], map.getZoom() < 11 ? 14 : map.getZoom());

    if (!youMarkerRef.current) {
      youMarkerRef.current = L.marker([center.lat, center.lng], { icon: youPin, zIndexOffset: 500 }).addTo(map);
      youMarkerRef.current.bindTooltip('Search centre', { direction: 'top', offset: [0, -12] });
    } else {
      youMarkerRef.current.setLatLng([center.lat, center.lng]);
    }
  }, [center]);

  // Draw a marker per visible result.
  useEffect(() => {
    const map = mapRef.current;
    const layer = markersRef.current;
    if (!map || !layer) return;

    layer.clearLayers();
    markerIndexRef.current.clear();

    visiblePlaces.forEach((place) => {
      const marker = L.marker([place.latitude, place.longitude], { icon: placePin(place.type) });

      const details = [
        place.address,
        place.openingHours ? `Hours: ${place.openingHours}` : '',
        place.phone ? `Phone: ${place.phone}` : ''
      ]
        .filter(Boolean)
        .map((line) => `<div class="mt-map-popup-line">${escapeHtml(line as string)}</div>`)
        .join('');

      marker.bindPopup(
        `<div class="mt-map-popup">
          <div class="mt-map-popup-title">${escapeHtml(place.name)}</div>
          <div class="mt-map-popup-meta">${place.type === 'hospital' ? 'Hospital' : 'Pharmacy'} · ${formatDistance(place.distanceKm)} away</div>
          ${details}
          <a class="mt-map-popup-link" href="${getOsmDirectionsUrl(place.latitude, place.longitude)}" target="_blank" rel="noopener noreferrer">Get directions</a>
        </div>`,
        { maxWidth: 260 }
      );

      marker.on('click', () => setActiveId(place.id));
      marker.addTo(layer);
      markerIndexRef.current.set(place.id, marker);
    });
  }, [visiblePlaces]);

  const loadNearby = async (lat: number, lng: number, label: string, radiusOverride?: number) => {
    setBusy(true);
    setError(null);
    try {
      const radius = radiusOverride ?? radiusKm;
      const found = await findNearbyCare(lat, lng, radius * 1000, ['pharmacy', 'hospital']);
      setPlaces(found);
      setStatusMessage(
        found.length
          ? `${found.length} ${found.length === 1 ? 'place' : 'places'} found within ${radius} km of ${label}`
          : `No pharmacies or hospitals found within ${radius} km of ${label}. Try a wider radius or another area.`
      );
    } catch (err: any) {
      setPlaces([]);
      setStatusMessage(null);
      setError(err?.message || 'Nearby pharmacies and hospitals could not be loaded. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  // Follow the city chosen in the site's location selector.
  useEffect(() => {
    if (location.latitude == null || location.longitude == null) return;
    const label = [location.area, location.city].filter(Boolean).join(', ') || location.city || 'your area';
    setCenter({ lat: location.latitude, lng: location.longitude });
    setCenterLabel(label);
    void loadNearby(location.latitude, location.longitude, label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.city, location.latitude, location.longitude]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || busy) return;

    setBusy(true);
    setError(null);
    setStatusMessage(null);
    try {
      const results = await geocodeLocation(trimmed);
      if (!results.length) {
        setError(`No location matched "${trimmed}". Try a city, area, or pincode.`);
        return;
      }
      const best = results[0];
      const label = [best.city, best.state].filter(Boolean).join(', ') || best.label;
      setCenter({ lat: best.latitude, lng: best.longitude });
      setCenterLabel(label);
      await loadNearby(best.latitude, best.longitude, label);
    } catch (err: any) {
      setError(err?.message || 'Location search is unavailable right now. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!('geolocation' in navigator)) {
      setError('This browser does not support location detection. Search for a city or area instead.');
      return;
    }

    setLocating(true);
    setError(null);
    setStatusMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        let label = 'your current location';

        const resolved = await reverseGeocodeCoords(lat, lng);
        if (resolved) {
          label = [resolved.city, resolved.state].filter(Boolean).join(', ') || resolved.label;
        }

        setCenter({ lat, lng });
        setCenterLabel(label);
        setLocating(false);
        await loadNearby(lat, lng, label);
      },
      (geoError) => {
        setLocating(false);
        setError(
          geoError.code === geoError.PERMISSION_DENIED
            ? 'Location access is blocked. Allow it in your browser settings, or search for a city or area instead.'
            : geoError.code === geoError.TIMEOUT
              ? 'We could not detect your location in time. Try again or search for a city or area.'
              : 'Your location is unavailable right now. Search for a city or area instead.'
        );
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  };

  const focusPlace = (place: MapPlace) => {
    setActiveId(place.id);
    const map = mapRef.current;
    const marker = markerIndexRef.current.get(place.id);
    if (map && marker) {
      map.setView([place.latitude, place.longitude], Math.max(map.getZoom(), 16));
      marker.openPopup();
    }
  };

  const handleRadiusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const km = Number(event.target.value);
    setRadiusKm(km);
    void loadNearby(center.lat, center.lng, centerLabel || 'your area', km);
  };

  const filters: { key: TypeFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pharmacy', label: 'Pharmacies' },
    { key: 'hospital', label: 'Hospitals' }
  ];

  return (
    <section className={`mt-map ${variant === 'dark' ? 'mt-map--dark' : ''}`} aria-label="Nearby pharmacies and hospitals map">
      <div className="mt-map-head">
        <div>
          <h2 className="mt-map-title">
            <MapPin className="mt-map-title-icon" aria-hidden="true" />
            Pharmacies and hospitals near you
          </h2>
          <p className="mt-map-subtitle">
            Map data from OpenStreetMap. Always call ahead to confirm opening hours and stock.
          </p>
        </div>

        <div className="mt-map-controls">
          <button type="button" className="mt-map-geo" onClick={handleUseMyLocation} disabled={locating || busy}>
            {locating ? <Loader2 className="mt-map-spin" aria-hidden="true" /> : <Crosshair aria-hidden="true" />}
            <span>{locating ? 'Locating…' : 'Use my current location'}</span>
          </button>

          <label className="mt-map-radius">
            <span>Within</span>
            <select value={radiusKm} onChange={handleRadiusChange} disabled={busy}>
              <option value={2}>2 km</option>
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={20}>20 km</option>
            </select>
          </label>
        </div>
      </div>

      <form className="mt-map-search" onSubmit={handleSearch} role="search">
        <Search className="mt-map-search-icon" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a city, area, or pincode (e.g. Tirupati, Kukatpally, 500081)"
          aria-label="Search a location on the map"
        />
        <button type="submit" disabled={busy || !query.trim()}>
          {busy ? <Loader2 className="mt-map-spin" aria-hidden="true" /> : <Navigation aria-hidden="true" />}
          <span>Search</span>
        </button>
      </form>

      <div className="mt-map-tabs" role="tablist" aria-label="Filter nearby places">
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            role="tab"
            aria-selected={typeFilter === filter.key}
            className={typeFilter === filter.key ? 'is-active' : ''}
            onClick={() => setTypeFilter(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-map-alert" role="alert">
          <AlertCircle aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {!error && statusMessage && <p className="mt-map-status">{statusMessage}</p>}

      <div className="mt-map-body">
        <div className="mt-map-canvas-wrap">
          <div ref={mapElRef} className="mt-map-canvas" />
          {busy && (
            <div className="mt-map-overlay" role="status">
              <Loader2 className="mt-map-spin" aria-hidden="true" />
              <span>Loading nearby places…</span>
            </div>
          )}
        </div>

        <ul className="mt-map-results">
          {visiblePlaces.map((place) => (
            <li key={place.id}>
              <button
                type="button"
                className={`mt-map-result ${activeId === place.id ? 'is-active' : ''}`}
                onClick={() => focusPlace(place)}
              >
                <span className={`mt-map-dot mt-map-dot--${place.type}`} aria-hidden="true" />
                <span className="mt-map-result-main">
                  <span className="mt-map-result-name">{place.name}</span>
                  <span className="mt-map-result-meta">
                    {place.type === 'hospital' ? 'Hospital' : 'Pharmacy'} · {formatDistance(place.distanceKm)}
                    {place.address ? ` · ${place.address}` : ''}
                  </span>
                </span>
                <a
                  className="mt-map-result-link"
                  href={getOsmPlaceUrl(place.latitude, place.longitude)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  aria-label={`Open ${place.name} on OpenStreetMap`}
                >
                  <ExternalLink aria-hidden="true" />
                </a>
              </button>
            </li>
          ))}
          {!visiblePlaces.length && !busy && (
            <li className="mt-map-empty">
              {places.length
                ? 'No places match this filter. Try “All”.'
                : 'Search a location or use your current location to see nearby pharmacies and hospitals.'}
            </li>
          )}
        </ul>
      </div>

      <p className="mt-map-credit">
        Map and place data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors.
        Listings come from the public map and are not verified by MediTrust.
      </p>
    </section>
  );
};
