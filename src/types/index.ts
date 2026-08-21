export enum UserRoleEnum {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  PHARMACY = 'pharmacy',
  ADMIN = 'admin'
}

export type UserRole = 'patient' | 'doctor' | 'pharmacy' | 'admin';

export type OnboardingStatus = 'Active' | 'Not Yet Onboarded' | 'Verification Pending' | 'Verified' | 'Inactive';

export type SupportedLanguage = 
  | 'en' // English
  | 'hi' // Hindi
  | 'te' // Telugu
  | 'ta' // Tamil
  | 'kn' // Kannada
  | 'ml' // Malayalam
  | 'bn' // Bengali
  | 'mr' // Marathi
  | 'gu' // Gujarati
  | 'pa'; // Punjabi

export interface UserLocation {
  mode: 'gps' | 'manual';
  country: string;
  state: string;
  district: string;
  city: string;
  area: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  organization?: string;
  registrationNo?: string;
  verified: boolean;
  createdAt: string;
  location?: UserLocation;
  preferredLanguage?: SupportedLanguage;
  age?: number;
  gender?: string;
  address?: string;
  state?: string;
  district?: string;
  city?: string;
  pincode?: string;
  emergencyContact?: string;
  status?: 'Active' | 'Suspended';
  lastLogin?: string;
}

export interface Doctor {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  specialty: string;
  qualification: string;
  experienceYears: number;
  hospitalName: string;
  clinicName?: string;
  clinicAddress?: string;
  location: string;
  state?: string;
  district?: string;
  city?: string;
  area?: string;
  pincode?: string;
  registrationNo?: string;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  onlineFee?: number;
  availableOnline: boolean;
  availableOffline: boolean;
  nextAvailable: string;
  image: string;
  bio: string;
  languages: string[];
  gender?: 'Male' | 'Female' | 'Other';
  onboardingStatus?: OnboardingStatus;
  verificationStatus?: 'Pending' | 'Active' | 'Rejected';
  workingDays?: string[];
  workingHours?: string;
  medicalLicense?: string;
  subscriptionPlan?: 'Free' | 'Silver' | 'Gold' | 'Platinum';
  adBooster?: boolean;
  requestCount?: number;
  distanceKm?: number;
  openingHours?: string;
  lat?: number;
  lng?: number;
  createdAt?: string;
}

export interface Hospital {
  id: string;
  name: string;
  email?: string;
  phone: string;
  location: string;
  state?: string;
  district?: string;
  city?: string;
  area?: string;
  pincode?: string;
  type: string;
  rating: number;
  emergencyServices: boolean;
  availableBeds: number;
  totalBeds: number;
  icuBedsAvailable?: number;
  ventilatorsAvailable?: number;
  departments: string[];
  image: string;
  nabhAccredited: boolean;
  hospitalLicense?: string;
  onboardingStatus?: OnboardingStatus;
  verificationStatus?: 'Pending' | 'Active' | 'Rejected';
  subscriptionPlan?: 'Free' | 'Silver' | 'Gold' | 'Platinum';
  adBooster?: boolean;
  requestCount?: number;
  distanceKm?: number;
  openingHours?: string;
  address?: string;
  lat?: number;
  lng?: number;
  createdAt?: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  ownerName?: string;
  email?: string;
  phone: string;
  drugLicenseNumber?: string;
  gstNumber?: string;
  address: string;
  state?: string;
  district?: string;
  city?: string;
  area?: string;
  pincode?: string;
  deliveryRadiusKm?: number;
  rating: number;
  deliveryAvailable: boolean;
  open24x7: boolean;
  image: string;
  inStockMedicinesCount: number;
  pharmacyLicense?: string;
  onboardingStatus?: OnboardingStatus;
  verificationStatus?: 'Pending' | 'Active' | 'Rejected';
  subscriptionPlan?: 'Free' | 'Silver' | 'Gold' | 'Platinum';
  adBooster?: boolean;
  workingHours?: string;
  requestCount?: number;
  distanceKm?: number;
  openingHours?: string;
  lat?: number;
  lng?: number;
  createdAt?: string;
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  price: number;
  prescriptionRequired: boolean;
  dosage: string;
  inStock: boolean;
}

export interface LabTest {
  id: string;
  name: string;
  category: string;
  turnaroundTime: string;
  fastingRequired: boolean;
  price: number;
  discountPrice?: number;
  sampleType: string;
}

export interface Laboratory {
  id: string;
  name: string;
  location: string;
  city?: string;
  area?: string;
  nablAccredited: boolean;
  homeCollection: boolean;
  rating: number;
  image: string;
  popularTests: LabTest[];
  onboardingStatus?: OnboardingStatus;
  requestCount?: number;
  distanceKm?: number;
  phone?: string;
  openingHours?: string;
}

export interface ProviderRequest {
  id: string;
  patientId?: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  providerId: string;
  providerName: string;
  providerType: 'Doctor' | 'Hospital' | 'Pharmacy' | 'Laboratory';
  serviceType: 'Offline OPD' | 'Online Video' | 'Voice Call' | 'Chat' | 'Medicine Order' | 'Diagnostic Test';
  reason: string;
  preferredDate: string;
  preferredTime: string;
  requestedCity: string;
  requestedArea?: string;
  specialization?: string;
  status: 'Pending Onboarding' | 'Notified & Onboarded';
  createdAt: string;
}

export interface PatientNotification {
  id: string;
  patientEmail: string;
  title: string;
  message: string;
  providerId: string;
  providerName: string;
  providerType: 'Doctor' | 'Hospital' | 'Pharmacy' | 'Laboratory';
  consultationFee?: number;
  availableSlots?: string[];
  read: boolean;
  createdAt: string;
}

export interface PharmacyOrder {
  id: string;
  patientName: string;
  patientPhone: string;
  patientAddress: string;
  pharmacyId: string;
  pharmacyName: string;
  deliveryType: 'Home Delivery' | 'Store Pickup';
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  prescriptionUploaded?: boolean;
  prescriptionFileName?: string;
  status: 'Order Received' | 'Preparing' | 'Ready for Pickup' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
}

export interface LabBooking {
  id: string;
  patientName: string;
  patientPhone: string;
  labId: string;
  labName: string;
  testName: string;
  sampleType: string;
  bookingType: 'Home Collection' | 'Center Visit';
  date: string;
  time: string;
  price: number;
  address?: string;
  status: 'Confirmed' | 'Sample Collected' | 'Report Ready';
  reportUrl?: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  hospitalName: string;
  date: string;
  time: string;
  type: 'Online Video' | 'In-Person OPD';
  status: 'Confirmed' | 'Completed' | 'Cancelled' | 'In Progress';
  tokenNumber: string;
  consultationFee?: number;
  qrCodeUrl?: string;
}

export interface DigitalPrescription {
  id: string;
  doctorName: string;
  patientName: string;
  diagnosis: string;
  date: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }[];
  notes?: string;
  qrCodeUrl?: string;
}

export interface QueueToken {
  id: string;
  tokenNumber: string;
  patientName: string;
  department: string;
  doctorName: string;
  estimatedWaitMinutes: number;
  status: 'Waiting' | 'Serving' | 'Completed' | 'Skipped';
  currentServingToken: string;
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Remote';
  experienceRequired: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
}

export interface InternshipProgram {
  id: string;
  title: string;
  track: string;
  durationMonths?: number;
  duration?: string;
  mode?: 'Remote' | 'Hybrid' | 'On-site' | string;
  eligibility?: string;
  stipend: string;
  location: string;
  benefits: string[];
  learningOutcomes: string[];
  responsibilities?: string[];
  requirements?: string[];
  certificate?: boolean | string;
  ppoEligibility?: boolean | string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
}

export interface SubscriptionPlanPurchase {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  planType: 'Silver' | 'Gold' | 'Platinum';
  amount: number;
  status: 'Active' | 'Expired';
  expiryDate: string;
  createdAt: string;
}

export interface AdBoosterPurchase {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  targetCity: string;
  amount: number;
  status: 'Active' | 'Expired';
  expiryDate: string;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  pharmacyId: string;
  name: string;
  category: string;
  price: number;
  stockQuantity: number;
  isOutOfStock: boolean;
  createdAt?: string;
}

export interface ProviderOnboardingRequest {
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
  source?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PharmaceuticalMedicine {
  id: string;
  name: string;
  brandName: string;
  genericName: string;
  composition: string;
  dosageForm: 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Ointment' | 'Inhaler' | 'Drops' | 'Suspension' | 'Powder';
  strength: string;
  manufacturer: string;
  category: 'Analgesics & Pain' | 'Antibiotics' | 'Cardiology & BP' | 'Diabetes Care' | 'Gastrointestinal' | 'Respiratory & Cold' | 'Dermatology' | 'Vitamins & Supplements' | 'Neurology & Psych' | 'Ophthalmology';
  prescriptionRequired: boolean;
  scheduleClass: 'OTC' | 'Schedule H' | 'Schedule H1' | 'Schedule X' | 'Ayurvedic / OTC';
  mrp: number | null;
  sellingPrice: number | null;
  currency: string;
  priceLive: boolean;
  priceSource: string;
  packSize: string;
  description: string;
  indications: string[];
  sideEffects: string[];
  directions: string;
  contraindications?: string[];
  storageAdvice: string;
  isJanAushadhiGenericAlternativeAvailable?: boolean;
  janAushadhiGenericName?: string;
  janAushadhiEstimatedPrice?: number;
  lastUpdated: string;
}

export type AdminRoleScope = 'Super-Admin' | 'Operations Manager' | 'Clinical Verifier' | 'Support Lead';

export interface AdminCollaborator {
  id: string;
  name: string;
  email: string;
  roleScope: AdminRoleScope;
  phone?: string;
  department?: string;
  status: 'Active' | 'Suspended';
  createdAt: string;
  lastActive?: string;
  assignedBy?: string;
  accessKey?: string;
  notes?: string;
}


