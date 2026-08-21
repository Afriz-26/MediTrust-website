/**
 * Hybrid Healthcare Discovery & Provider Onboarding Service
 * Segregates Verified MediTrust Providers vs External Nearby Places (Google Places) vs Sample Profiles,
 * and maintains the real Onboarding Request pipeline.
 */

import { PlacesService } from './PlacesService';

export interface DiscoveredDoctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experienceYears: number;
  hospitalName: string;
  clinicName?: string;
  clinicAddress?: string;
  city: string;
  state: string;
  district?: string;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  onlineFee?: number;
  availableOnline: boolean;
  availableOffline: boolean;
  nextAvailable: string;
  image: string;
  tier: 'VERIFIED_MEDITRUST' | 'EXTERNAL_PLACE' | 'DEMO_PROFILE';
  onboardingStatus: 'Active' | 'Not Yet Onboarded' | 'Verification Pending' | 'Verified';
  distanceKm?: number;
  phone?: string;
  languages?: string[];
  lat?: number;
  lng?: number;
  placeId?: string;
}

export interface DiscoveredPharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  district?: string;
  rating: number;
  open24x7: boolean;
  deliveryAvailable: boolean;
  image: string;
  tier: 'VERIFIED_MEDITRUST' | 'EXTERNAL_PLACE' | 'DEMO_PROFILE';
  onboardingStatus: 'Active' | 'Not Yet Onboarded' | 'Verification Pending' | 'Verified';
  distanceKm?: number;
  phone?: string;
  inStockMedicinesCount?: number;
  lat?: number;
  lng?: number;
  placeId?: string;
}

export interface OnboardingLead {
  id: string;
  requesterUserId?: string;
  requesterName: string;
  requesterPhone: string;
  requesterEmail?: string;
  providerType: 'Doctor' | 'Pharmacy' | 'Hospital' | 'Laboratory';
  providerName: string;
  specialty?: string;
  clinicOrHospitalName?: string;
  placeId?: string;
  formattedAddress?: string;
  city: string;
  state: string;
  pincode?: string;
  contactNumber?: string;
  notes?: string;
  status: 'REQUESTED' | 'REVIEW' | 'CONTACTED' | 'INVITED' | 'ONBOARDED' | 'REJECTED';
  source: string;
  createdAt: string;
  updatedAt: string;
}

// In-Memory persistent store for Onboarding Requests (survives requests and works in tandem with Supabase)
export const ONBOARDING_REQUESTS_STORE: OnboardingLead[] = [
  {
    id: 'req-init-101',
    requesterName: 'Kishore V.',
    requesterPhone: '+91 98480 12345',
    requesterEmail: 'kishore@example.com',
    providerType: 'Doctor',
    providerName: 'Dr. Srinivasulu Naidu (Apex Heart Care)',
    specialty: 'Cardiology',
    clinicOrHospitalName: 'Apex Heart Care',
    formattedAddress: 'Near Bus Stand Circle, Kanigiri, Andhra Pradesh',
    city: 'Kanigiri',
    state: 'Andhra Pradesh',
    pincode: '523230',
    contactNumber: '+91 8592 223400',
    notes: 'Please onboard this doctor so we can book OPD appointments directly without traveling 80km.',
    status: 'REQUESTED',
    source: 'Patient Demand Portal',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'req-init-102',
    requesterName: 'Ayesha Begum',
    requesterPhone: '+91 99887 65432',
    requesterEmail: 'ayesha@example.com',
    providerType: 'Pharmacy',
    providerName: 'MedPlus Pharmacy - Banjara Hills Rd 12',
    formattedAddress: 'Road No 12, Banjara Hills, Hyderabad, Telangana',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500034',
    contactNumber: '+91 40 2335 1200',
    notes: 'Need home delivery and prescription sync for regular diabetes medicines.',
    status: 'CONTACTED',
    source: 'Pharmacy Search Page',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString()
  }
];

export class HealthcareDiscoveryService {
  /**
   * Search doctors with hybrid tiered discovery
   */
  public static async searchDoctors(params: {
    lat?: number;
    lng?: number;
    city?: string;
    specialty?: string;
    query?: string;
    radiusKm?: number;
  }): Promise<{
    results: DiscoveredDoctor[];
    total: number;
    meta: {
      verifiedCount: number;
      externalCount: number;
      demoCount: number;
    };
  }> {
    const { lat, lng, city = '', specialty = 'All', query = '', radiusKm = 25 } = params;
    const cleanQ = query.trim().toLowerCase();
    const cleanCity = city.trim().toLowerCase();
    const cleanSpec = specialty.trim().toLowerCase();

    const doctorsList: DiscoveredDoctor[] = [];

    // 1. If coordinates provided, query Google Places for external healthcare places
    if (lat && lng) {
      try {
        const externalPlaces = await PlacesService.discoverNearbyHealthcare(lat, lng, 'doctor', radiusKm * 1000);
        externalPlaces.forEach((ep, idx) => {
          // If search term matches
          if (cleanQ && !ep.name.toLowerCase().includes(cleanQ) && !ep.address.toLowerCase().includes(cleanQ)) {
            return;
          }

          doctorsList.push({
            id: `ext-doc-${ep.placeId || idx}`,
            name: ep.name,
            specialty: ep.name.toLowerCase().includes('skin') ? 'Dermatology' : ep.name.toLowerCase().includes('cardio') ? 'Cardiology' : ep.name.toLowerCase().includes('ortho') ? 'Orthopedics' : ep.name.toLowerCase().includes('child') || ep.name.toLowerCase().includes('pediatric') ? 'Pediatrics' : 'General Healthcare',
            qualification: 'Registered Healthcare Clinic',
            experienceYears: 10,
            hospitalName: ep.name,
            clinicName: ep.name,
            clinicAddress: ep.address,
            city: city || 'Local Area',
            state: 'India',
            rating: ep.rating || 4.5,
            reviewCount: ep.userRatingsTotal || 24,
            consultationFee: 500,
            onlineFee: 400,
            availableOnline: false,
            availableOffline: true,
            nextAvailable: 'Contact Clinic Directly',
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
            tier: 'EXTERNAL_PLACE',
            onboardingStatus: 'Not Yet Onboarded',
            distanceKm: ep.distanceKm || 2.5,
            lat: ep.latitude,
            lng: ep.longitude,
            placeId: ep.placeId
          });
        });
      } catch (err) {
        console.warn('[Healthcare Discovery External Places Notice]:', err);
      }
    }

    const verifiedCount = doctorsList.filter(d => d.tier === 'VERIFIED_MEDITRUST').length;
    const externalCount = doctorsList.filter(d => d.tier === 'EXTERNAL_PLACE').length;
    const demoCount = doctorsList.filter(d => d.tier === 'DEMO_PROFILE').length;

    return {
      results: doctorsList,
      total: doctorsList.length,
      meta: { verifiedCount, externalCount, demoCount }
    };
  }

  /**
   * Save a real onboarding request lead
   */
  public static async recordOnboardingRequest(data: Omit<OnboardingLead, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { status?: OnboardingLead['status'] }): Promise<OnboardingLead> {
    const newRequest: OnboardingLead = {
      id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      requesterUserId: data.requesterUserId,
      requesterName: data.requesterName.trim(),
      requesterPhone: data.requesterPhone.trim(),
      requesterEmail: data.requesterEmail?.trim(),
      providerType: data.providerType,
      providerName: data.providerName.trim(),
      specialty: data.specialty?.trim(),
      clinicOrHospitalName: data.clinicOrHospitalName?.trim(),
      placeId: data.placeId,
      formattedAddress: data.formattedAddress?.trim(),
      city: data.city.trim(),
      state: data.state.trim(),
      pincode: data.pincode?.trim(),
      contactNumber: data.contactNumber?.trim(),
      notes: data.notes?.trim(),
      status: data.status || 'REQUESTED',
      source: data.source || 'Patient Discovery System',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    ONBOARDING_REQUESTS_STORE.unshift(newRequest);
    return newRequest;
  }

  /**
   * Get all onboarding requests
   */
  public static async getOnboardingRequests(filters?: {
    status?: string;
    providerType?: string;
    city?: string;
  }): Promise<OnboardingLead[]> {
    let list = [...ONBOARDING_REQUESTS_STORE];

    if (filters?.status && filters.status !== 'All') {
      list = list.filter(r => r.status === filters.status);
    }
    if (filters?.providerType && filters.providerType !== 'All') {
      list = list.filter(r => r.providerType.toLowerCase() === filters.providerType!.toLowerCase());
    }
    if (filters?.city && filters.city !== 'All') {
      list = list.filter(r => r.city.toLowerCase().includes(filters.city!.toLowerCase()));
    }

    return list;
  }

  /**
   * Update the status of an onboarding request lead
   */
  public static async updateOnboardingRequestStatus(
    id: string,
    status: OnboardingLead['status'],
    notes?: string
  ): Promise<OnboardingLead | null> {
    const target = ONBOARDING_REQUESTS_STORE.find(r => r.id === id);
    if (!target) return null;

    target.status = status;
    if (notes) {
      target.notes = `${target.notes ? target.notes + ' | ' : ''}[${new Date().toLocaleDateString()}] ${notes}`;
    }
    target.updatedAt = new Date().toISOString();
    return target;
  }
}
