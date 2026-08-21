import React, { createContext, useContext, useState } from 'react';
import { UserLocation } from '../types';

export interface LocationOption {
  state: string;
  districts: {
    district: string;
    cities: {
      city: string;
      areas: string[];
      pincode: string;
    }[];
  }[];
}

export const INDIA_LOCATION_HIERARCHY: LocationOption[] = [
  {
    state: 'Andhra Pradesh',
    districts: [
      {
        district: 'Tirupati',
        cities: [
          { city: 'Tirupati', areas: ['Alipiri', 'MR Palli', 'Korlagunta', 'Bairagipatteda', 'Renigunta Road', 'TUDA Layout'], pincode: '517501' },
          { city: 'Chandragiri', areas: ['Fort Road', 'University Campus', 'Main Bazaar'], pincode: '517101' },
          { city: 'Srikalahasti', areas: ['Temple Road', 'Town Center', 'Bypass Road'], pincode: '517644' }
        ]
      },
      {
        district: 'Visakhapatnam',
        cities: [
          { city: 'Visakhapatnam', areas: ['Beach Road', 'Gajuwaka', 'Siripuram', 'MVP Colony', 'Dwaraka Nagar'], pincode: '530001' }
        ]
      },
      {
        district: 'NTR (Vijayawada)',
        cities: [
          { city: 'Vijayawada', areas: ['Benz Circle', 'MG Road', 'Labbipet', 'Governorpet', 'Poranki'], pincode: '520010' }
        ]
      }
    ]
  },
  {
    state: 'Telangana',
    districts: [
      {
        district: 'Hyderabad',
        cities: [
          { city: 'Hyderabad', areas: ['Hitec City', 'Jubilee Hills', 'Banjara Hills', 'Gachibowli', 'Kukatpally', 'Madhapur', 'Secunderabad'], pincode: '500081' }
        ]
      },
      {
        district: 'Rangareddy',
        cities: [
          { city: 'Kondapur', areas: ['Hafeezpet', 'Botanical Garden Road', 'Kothaguda'], pincode: '500084' },
          { city: 'Manikonda', areas: ['Lanco Hills', 'Puppalguda', 'Financial District'], pincode: '500089' }
        ]
      }
    ]
  },
  {
    state: 'Karnataka',
    districts: [
      {
        district: 'Bengaluru Urban',
        cities: [
          { city: 'Bengaluru', areas: ['Indiranagar', 'Koramangala', 'Whitefield', 'HSR Layout', 'Jayanagar', 'Electronic City', 'Hebbal'], pincode: '560038' }
        ]
      }
    ]
  },
  {
    state: 'Tamil Nadu',
    districts: [
      {
        district: 'Chennai',
        cities: [
          { city: 'Chennai', areas: ['Adyar', 'Anna Nagar', 'T. Nagar', 'Velachery', 'OMR', 'Mylapore', 'Nungambakkam'], pincode: '600020' }
        ]
      }
    ]
  },
  {
    state: 'Maharashtra',
    districts: [
      {
        district: 'Mumbai City',
        cities: [
          { city: 'Mumbai', areas: ['Bandra West', 'Andheri East', 'Juhu', 'Colaba', 'Powai', 'Worli', 'Lower Parel'], pincode: '400050' }
        ]
      },
      {
        district: 'Pune',
        cities: [
          { city: 'Pune', areas: ['Koregaon Park', 'Kothrud', 'Viman Nagar', 'Hinjewadi', 'Baner'], pincode: '411001' }
        ]
      }
    ]
  },
  {
    state: 'Delhi NCR',
    districts: [
      {
        district: 'New Delhi',
        cities: [
          { city: 'New Delhi', areas: ['Connaught Place', 'South Extension', 'Dwarka', 'Vasant Kunj', 'Saket', 'Rohini'], pincode: '110001' }
        ]
      },
      {
        district: 'Gurugram',
        cities: [
          { city: 'Gurugram', areas: ['DLF Phase 5', 'Cyber City', 'Golf Course Road', 'Sohna Road'], pincode: '122002' }
        ]
      }
    ]
  },
  {
    state: 'West Bengal',
    districts: [
      {
        district: 'Kolkata',
        cities: [
          { city: 'Kolkata', areas: ['Park Street', 'Salt Lake', 'New Town', 'Ballygunge', 'Alipore'], pincode: '700016' }
        ]
      }
    ]
  },
  {
    state: 'Kerala',
    districts: [
      {
        district: 'Ernakulam',
        cities: [
          { city: 'Kochi', areas: ['MG Road', 'Marine Drive', 'Kakkanad', 'Edappally', 'Panampilly Nagar'], pincode: '682011' }
        ]
      }
    ]
  },
  {
    state: 'Gujarat',
    districts: [
      {
        district: 'Ahmedabad',
        cities: [
          { city: 'Ahmedabad', areas: ['SG Highway', 'Bodakdev', 'Navrangpura', 'Satellite', 'Prahlad Nagar'], pincode: '380015' }
        ]
      }
    ]
  },
  {
    state: 'Punjab',
    districts: [
      {
        district: 'Ludhiana',
        cities: [
          { city: 'Ludhiana', areas: ['Model Town', 'Sarabha Nagar', 'BRS Nagar', 'Civil Lines'], pincode: '141001' }
        ]
      }
    ]
  }
];

interface LocationContextType {
  location: UserLocation;
  setLocation: (location: UserLocation) => void;
  requestGPSLocation: () => Promise<UserLocation>;
  setPlaceById: (placeId: string) => Promise<UserLocation | null>;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  locationHierarchy: LocationOption[];
}

const DEFAULT_LOCATION: UserLocation = {
  mode: 'manual',
  country: 'India',
  state: 'Andhra Pradesh',
  district: 'Tirupati',
  city: 'Tirupati',
  area: 'Alipiri',
  pincode: '517501',
  latitude: 13.6288,
  longitude: 79.4192
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocationState] = useState<UserLocation>(() => {
    const saved = localStorage.getItem('meditrust_user_location');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEFAULT_LOCATION;
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const setLocation = (newLoc: UserLocation) => {
    setLocationState(newLoc);
    localStorage.setItem('meditrust_user_location', JSON.stringify(newLoc));
  };

  const setPlaceById = async (placeId: string): Promise<UserLocation | null> => {
    try {
      const res = await fetch(`/api/places/details?placeId=${encodeURIComponent(placeId)}`);
      if (res.ok) {
        const data = await res.json();
        const resolved: UserLocation = {
          mode: 'manual',
          country: data.country || 'India',
          state: data.state || 'Andhra Pradesh',
          district: data.district || data.city,
          city: data.city || data.locality || 'Hyderabad',
          area: data.locality || data.name || 'Center',
          pincode: data.pincode || '',
          latitude: data.latitude,
          longitude: data.longitude
        };
        setLocation(resolved);
        return resolved;
      }
    } catch (err) {
      console.warn('[LocationContext setPlaceById Error]:', err);
    }
    return null;
  };

  const requestGPSLocation = async (): Promise<UserLocation> => {
    return new Promise((resolve) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            try {
              // Real reverse geocoding via server endpoint
              const res = await fetch(`/api/places/reverse-geocode?lat=${lat}&lng=${lng}`);
              if (res.ok) {
                const geoData = await res.json();
                const gpsLocation: UserLocation = {
                  mode: 'gps',
                  country: geoData.country || 'India',
                  state: geoData.state || 'Andhra Pradesh',
                  district: geoData.district || geoData.city,
                  city: geoData.city || geoData.locality || 'Current City',
                  area: `${geoData.locality || geoData.name || 'GPS Area'}`,
                  pincode: geoData.pincode || '',
                  latitude: lat,
                  longitude: lng
                };
                setLocation(gpsLocation);
                resolve(gpsLocation);
                return;
              }
            } catch (err) {
              console.warn('[GPS Reverse Geocode Network Notice]:', err);
            }

            // Fallback with actual lat/lng
            const fallbackGps: UserLocation = {
              mode: 'gps',
              country: 'India',
              state: location.state || 'Andhra Pradesh',
              district: location.district || 'Tirupati',
              city: location.city || 'Tirupati',
              area: 'Detected Location',
              pincode: location.pincode || '',
              latitude: lat,
              longitude: lng
            };
            setLocation(fallbackGps);
            resolve(fallbackGps);
          },
          (err) => {
            console.warn('[GPS Geolocation Permission/Error]:', err.message);
            resolve(location);
          },
          { timeout: 8000, enableHighAccuracy: true }
        );
      } else {
        resolve(location);
      }
    });
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        requestGPSLocation,
        setPlaceById,
        isLocationModalOpen,
        setIsLocationModalOpen,
        locationHierarchy: INDIA_LOCATION_HIERARCHY
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
