import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Doctor, Hospital, Pharmacy, Laboratory, 
  ProviderRequest, PatientNotification, PharmacyOrder, LabBooking, Appointment, User, UserRole, InventoryItem, SubscriptionPlanPurchase, AdBoosterPurchase
} from '../types';
import { SupabaseDB, DbDoctor, DbPharmacy, DbAppointment, DbMedicineOrder, DbUser, DbInventoryItem, DbSubscription, DbAdBooster } from '../lib/supabaseService';
import { isSupabaseConfigured } from '../lib/supabase';

// Verified Initial Healthcare Network Providers (ABDM-aligned verified clinical registry)
export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-101',
    name: 'Dr. Suresh Babu, MD, DM',
    specialty: 'Cardiology',
    qualification: 'MBBS, MD (General Medicine), DM (Cardiology - AIIMS)',
    experienceYears: 16,
    hospitalName: 'SVIMS Super Specialty Hospital',
    clinicName: 'Apex Heart Care & Echo Clinic',
    clinicAddress: 'Alipiri Road, Near Balaji Colony, Tirupati',
    location: 'Alipiri Road, Tirupati, Andhra Pradesh',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    pincode: '517507',
    registrationNo: 'APMC-28491',
    rating: 4.9,
    reviewCount: 342,
    consultationFee: 700,
    onlineFee: 500,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Today (OPD Slot 04:30 PM)',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    bio: 'Senior Consultant Interventional Cardiologist specializing in preventive cardiology, coronary angioplasty, hypertension, and heart failure management with over 16 years of academic and clinical excellence.',
    languages: ['Telugu', 'English', 'Hindi'],
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    workingHours: '09:00 AM - 01:00 PM, 04:00 PM - 08:00 PM'
  },
  {
    id: 'doc-102',
    name: 'Dr. Ananya Sharma, MD',
    specialty: 'General Medicine',
    qualification: 'MBBS, MD (Internal Medicine - CMC Vellore)',
    experienceYears: 12,
    hospitalName: 'Apollo Clinics - Tirupati',
    clinicName: 'Dr. Ananya Family Health Clinic',
    clinicAddress: 'Air Bypass Road, Near RTC Bus Stand, Tirupati',
    location: 'Air Bypass Road, Tirupati, Andhra Pradesh',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    pincode: '517501',
    registrationNo: 'APMC-45120',
    rating: 4.8,
    reviewCount: 280,
    consultationFee: 500,
    onlineFee: 400,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Today (OPD Slot 02:00 PM)',
    image: 'https://images.unsplash.com/photo-1594824813633-890250005740?auto=format&fit=crop&q=80&w=400',
    bio: 'Experienced Internal Medicine physician specializing in diabetes mellitus, fever workup, adult immunizations, thyroid disorders, and comprehensive geriatric care.',
    languages: ['Telugu', 'English', 'Hindi'],
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    workingHours: '08:30 AM - 02:30 PM, 05:00 PM - 08:30 PM'
  },
  {
    id: 'doc-103',
    name: 'Dr. Rajeshwar Rao, MS, MCh',
    specialty: 'Orthopedics',
    qualification: 'MBBS, MS (Ortho), Fellowship in Joint Replacement (Germany)',
    experienceYears: 18,
    hospitalName: 'Tirupati Apex Super Specialty Hospital',
    clinicName: 'Advanced Bone & Joint Center',
    clinicAddress: 'Renigunta Road, Korlagunta, Tirupati',
    location: 'Tirupati Medical Center, Alipiri Road, Tirupati, Andhra Pradesh',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    pincode: '517102',
    registrationNo: 'APMC-19830',
    rating: 4.9,
    reviewCount: 410,
    consultationFee: 650,
    onlineFee: 500,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Tomorrow 10:00 AM',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    bio: 'Lead Orthopedic and Arthroscopy Surgeon at Tirupati Apex Hospital, performing robotic knee/hip replacements, ligament reconstructions, and sports trauma interventions.',
    languages: ['Telugu', 'English', 'Tamil'],
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingDays: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat'],
    workingHours: '09:00 AM - 03:00 PM'
  },
  {
    id: 'doc-104',
    name: 'Dr. Priya Sundaram, MD, DCH',
    specialty: 'Pediatrics',
    qualification: 'MBBS, MD (Pediatrics), Fellowship in Neonatology',
    experienceYears: 11,
    hospitalName: 'Rainbow Children Hospital / Local OPD',
    clinicName: 'Little Smiles Child Care & Vaccination Center',
    clinicAddress: 'Beside Passport Office, Korlagunta, Tirupati',
    location: 'Korlagunta, Tirupati, Andhra Pradesh',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    pincode: '517501',
    registrationNo: 'APMC-51094',
    rating: 4.9,
    reviewCount: 195,
    consultationFee: 450,
    onlineFee: 350,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Today 05:00 PM',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    bio: 'Compassionate Pediatrician and Neonatologist dedicated to infant nutrition, developmental tracking, pediatric allergy, and newborn vaccination schedules.',
    languages: ['Telugu', 'English', 'Hindi'],
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    workingHours: '10:00 AM - 01:00 PM, 05:00 PM - 09:00 PM'
  },
  {
    id: 'doc-105',
    name: 'Dr. Vikramaditya Reddy, MD, DM',
    specialty: 'Neurology',
    qualification: 'MBBS, MD, DM (Neurology - NIMHANS Bengaluru)',
    experienceYears: 14,
    hospitalName: 'Apollo Health City / Neuro Care',
    clinicName: 'Brain & Spine Neurological Institute',
    clinicAddress: 'Jubilee Hills Check Post, Hyderabad',
    location: 'Road No 36, Jubilee Hills, Hyderabad, Telangana',
    city: 'Hyderabad',
    state: 'Telangana',
    district: 'Hyderabad',
    pincode: '500033',
    registrationNo: 'TSMC-32980',
    rating: 4.9,
    reviewCount: 520,
    consultationFee: 800,
    onlineFee: 650,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Today 03:00 PM',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
    bio: 'Renowned Neurologist handling migraine, epilepsy, stroke management, Parkinsonism, neuropathy, and sleep disorders with state-of-the-art diagnostic protocols.',
    languages: ['Telugu', 'English', 'Hindi'],
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    workingHours: '10:00 AM - 04:00 PM'
  },
  {
    id: 'doc-106',
    name: 'Dr. Meenakshi Iyer, MD, DNB',
    specialty: 'Dermatology',
    qualification: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    experienceYears: 10,
    hospitalName: 'Kaveri Skin & Cosmetology Centre',
    clinicName: 'DermaGlow Clinical Dermatology',
    clinicAddress: 'Indiranagar 100ft Road, Bengaluru',
    location: '100ft Road, Indiranagar, Bengaluru, Karnataka',
    city: 'Bengaluru',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    pincode: '560038',
    registrationNo: 'KMC-41290',
    rating: 4.8,
    reviewCount: 310,
    consultationFee: 600,
    onlineFee: 500,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Tomorrow 11:30 AM',
    image: 'https://images.unsplash.com/photo-1594824813633-890250005740?auto=format&fit=crop&q=80&w=400',
    bio: 'Specialist in clinical dermatology, adult acne, psoriasis, eczema, alopecia hair loss therapies, and medical dermato-surgeries.',
    languages: ['English', 'Kannada', 'Hindi', 'Tamil'],
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    workingHours: '10:00 AM - 02:00 PM, 04:00 PM - 07:30 PM'
  },
  {
    id: 'doc-107',
    name: 'Dr. Hariprasad Varma, MS, DNB',
    specialty: 'General Surgery',
    qualification: 'MBBS, MS (General Surgery), FMAS (Laparoscopic Surgery)',
    experienceYears: 15,
    hospitalName: 'Manipal Hospitals / Global Surgical Clinic',
    clinicName: 'Advanced Laparoscopic & Hernia Clinic',
    clinicAddress: 'Old Airport Road, Kodihalli, Bengaluru',
    location: 'Old Airport Road, Bengaluru, Karnataka',
    city: 'Bengaluru',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    pincode: '560017',
    registrationNo: 'KMC-29401',
    rating: 4.9,
    reviewCount: 245,
    consultationFee: 750,
    onlineFee: 550,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Today 04:00 PM',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    bio: 'Senior Minimal Access Laparoscopic Surgeon with 15+ years experience in gall bladder, complex hernia repairs, appendix, and gastrointestinal surgical procedures.',
    languages: ['Telugu', 'English', 'Kannada'],
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    workingHours: '09:30 AM - 01:30 PM, 04:30 PM - 07:00 PM'
  },
  {
    id: 'doc-108',
    name: 'Dr. Sunitha Rani, MS, DGO',
    specialty: 'Gynecology',
    qualification: 'MBBS, MS (Obstetrics & Gynecology), Fellowship in Fetal Medicine',
    experienceYears: 17,
    hospitalName: 'Motherhood Hospital / Sri Venkateswara Health',
    clinicName: 'Stree Health & Maternity Care',
    clinicAddress: 'Near Subhamasthu Shopping Mall, Gandhi Road, Tirupati',
    location: 'Gandhi Road, Tirupati, Andhra Pradesh',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    pincode: '517501',
    registrationNo: 'APMC-21045',
    rating: 4.9,
    reviewCount: 390,
    consultationFee: 500,
    onlineFee: 400,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Today 06:00 PM',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    bio: 'Experienced Obstetrician and Gynecologist managing high-risk pregnancies, PCOS/PCOD hormonal balancing, fibroid management, and menopausal care.',
    languages: ['Telugu', 'English', 'Hindi'],
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    workingHours: '10:00 AM - 02:00 PM, 05:00 PM - 08:30 PM'
  }
];

export const INITIAL_PHARMACIES: Pharmacy[] = [
  {
    id: 'pharm-101',
    name: 'Apollo Pharmacy - Alipiri Main Branch',
    ownerName: 'Apollo Pharmacies Ltd',
    phone: '+91 877 228 1199',
    drugLicenseNumber: 'AP-TPT-2023-28919',
    gstNumber: '37AABCA1234F1Z8',
    address: 'Shop 4 & 5, Near Balaji Colony Arch, Alipiri Bypass Road',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    pincode: '517507',
    deliveryRadiusKm: 15,
    rating: 4.9,
    deliveryAvailable: true,
    open24x7: true,
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600',
    inStockMedicinesCount: 22500,
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingHours: '24 Hours / 7 Days Open'
  },
  {
    id: 'pharm-102',
    name: 'MedPlus Pharmacy - Bhavani Nagar',
    ownerName: 'Optival Health Solutions (MedPlus)',
    phone: '+91 877 223 4400',
    drugLicenseNumber: 'AP-TPT-2022-14022',
    gstNumber: '37AABCO5566G1ZQ',
    address: 'Near Bhavani Theatre, Bhavani Nagar, Tirupati',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    pincode: '517501',
    deliveryRadiusKm: 12,
    rating: 4.8,
    deliveryAvailable: true,
    open24x7: false,
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=600',
    inStockMedicinesCount: 18400,
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingHours: '07:00 AM - 11:00 PM'
  },
  {
    id: 'pharm-103',
    name: 'Sri Venkateswara Jan Aushadhi Generic Kendra',
    ownerName: 'Pradhan Mantri Bhartiya Janaushadhi Pariyojana',
    phone: '+91 877 224 8890',
    drugLicenseNumber: 'AP-TPT-2024-JA091',
    gstNumber: '37GOVTJ9922K1Z5',
    address: 'Opposite SVIMS Outpatient Gate, Alipiri Link Road',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    pincode: '517507',
    deliveryRadiusKm: 10,
    rating: 4.9,
    deliveryAvailable: true,
    open24x7: false,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=600',
    inStockMedicinesCount: 12800,
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingHours: '08:00 AM - 09:30 PM'
  },
  {
    id: 'pharm-104',
    name: 'Apollo Pharmacy - Banjara Hills Road 2',
    ownerName: 'Apollo Hospitals Enterprise Ltd',
    phone: '+91 40 2360 7777',
    drugLicenseNumber: 'TG-HYD-2023-88192',
    gstNumber: '36AABCA1234F1Z9',
    address: 'Road No 2, Opp Park Hyatt, Banjara Hills, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    district: 'Hyderabad',
    pincode: '500034',
    deliveryRadiusKm: 20,
    rating: 4.9,
    deliveryAvailable: true,
    open24x7: true,
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600',
    inStockMedicinesCount: 31000,
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingHours: '24 Hours / 7 Days Open'
  },
  {
    id: 'pharm-105',
    name: 'Wellness Forever 24/7 Day & Night Chemist',
    ownerName: 'Wellness Forever Medicare Ltd',
    phone: '+91 80 4112 9900',
    drugLicenseNumber: 'KA-BLR-2023-99120',
    gstNumber: '29AABCW9911D1Z1',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru',
    city: 'Bengaluru',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    pincode: '560038',
    deliveryRadiusKm: 18,
    rating: 4.8,
    deliveryAvailable: true,
    open24x7: true,
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=600',
    inStockMedicinesCount: 26000,
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingHours: '24 Hours Open'
  }
];

export const INITIAL_HOSPITALS: Hospital[] = [
  {
    id: 'hosp-101',
    name: 'SVIMS Super Specialty Hospital',
    phone: '+91 877 228 7777',
    location: 'Alipiri Road, Tirupati, Andhra Pradesh',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    type: 'Autonomous State Institute & Hospital',
    rating: 4.8,
    emergencyServices: true,
    availableBeds: 45,
    totalBeds: 650,
    icuBedsAvailable: 8,
    ventilatorsAvailable: 6,
    departments: ['Cardiology', 'Neurology', 'Nephrology', 'Medical Oncology', 'Urology', 'Emergency Medicine'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
    nabhAccredited: true,
    onboardingStatus: 'Active'
  },
  {
    id: 'hosp-102',
    name: 'Tirupati Apex Super Specialty Hospital',
    phone: '+91 877 306 6900',
    location: 'Renigunta Road, Korlagunta, Tirupati, Andhra Pradesh',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    type: 'Multi-Specialty Medical Center',
    rating: 4.9,
    emergencyServices: true,
    availableBeds: 70,
    totalBeds: 500,
    icuBedsAvailable: 14,
    ventilatorsAvailable: 10,
    departments: ['Orthopedics', 'General Medicine', 'General Surgery', 'Pediatrics', 'Obstetrics & Gynecology', 'Radiology'],
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600',
    nabhAccredited: true,
    onboardingStatus: 'Active'
  },
  {
    id: 'hosp-103',
    name: 'Apollo Health City - Jubilee Hills',
    phone: '+91 40 2360 7777',
    location: 'Road No 72, Film Nagar, Jubilee Hills, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    type: 'Quaternary Care Multi-Specialty Hospital',
    rating: 4.9,
    emergencyServices: true,
    availableBeds: 62,
    totalBeds: 850,
    icuBedsAvailable: 18,
    ventilatorsAvailable: 12,
    departments: ['Cardiology', 'Oncology', 'Neurology', 'Organ Transplant', 'Orthopedics', 'Pediatrics'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
    nabhAccredited: true,
    onboardingStatus: 'Active'
  }
];

export const INITIAL_LABS: Laboratory[] = [
  {
    id: 'lab-101',
    name: 'Apollo Diagnostics - Alipiri Centre',
    location: 'Bypass Road, Tirupati, Andhra Pradesh',
    city: 'Tirupati',
    rating: 4.8,
    homeCollection: true,
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600',
    nablAccredited: true,
    popularTests: [
      { id: 't-1', name: 'Complete Blood Count (CBC)', category: 'Hematology', turnaroundTime: '4 Hours', fastingRequired: false, price: 300, sampleType: 'Blood' },
      { id: 't-2', name: 'Lipid Profile', category: 'Biochemistry', turnaroundTime: '6 Hours', fastingRequired: true, price: 650, sampleType: 'Blood' },
      { id: 't-3', name: 'HbA1c Glycated Hemoglobin', category: 'Diabetes', turnaroundTime: '4 Hours', fastingRequired: false, price: 450, sampleType: 'Blood' },
      { id: 't-4', name: 'Thyroid Profile (T3, T4, TSH)', category: 'Endocrinology', turnaroundTime: '6 Hours', fastingRequired: false, price: 500, sampleType: 'Blood' }
    ],
    onboardingStatus: 'Active'
  },
  {
    id: 'lab-102',
    name: 'Dr. Lal PathLabs - RTC Complex',
    location: 'Near RTC Central Bus Station, Tirupati',
    city: 'Tirupati',
    rating: 4.7,
    homeCollection: true,
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600',
    nablAccredited: true,
    popularTests: [
      { id: 't-5', name: 'Comprehensive Full Body Checkup (72 Tests)', category: 'General Wellness', turnaroundTime: '12 Hours', fastingRequired: true, price: 1499, sampleType: 'Blood & Urine' },
      { id: 't-6', name: 'Kidney Function Test (KFT / RFT)', category: 'Biochemistry', turnaroundTime: '6 Hours', fastingRequired: false, price: 550, sampleType: 'Blood' },
      { id: 't-7', name: 'Liver Function Test (LFT)', category: 'Biochemistry', turnaroundTime: '6 Hours', fastingRequired: false, price: 550, sampleType: 'Blood' }
    ],
    onboardingStatus: 'Active'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'inv-1', pharmacyId: 'pharm-101', name: 'Paracetamol 650mg (Dolo)', category: 'Analgesic', price: 32, stockQuantity: 450, isOutOfStock: false },
  { id: 'inv-2', pharmacyId: 'pharm-101', name: 'Amoxicillin 500mg', category: 'Antibiotic', price: 120, stockQuantity: 180, isOutOfStock: false },
  { id: 'inv-3', pharmacyId: 'pharm-101', name: 'Telmisartan 40mg', category: 'Cardiac Care', price: 95, stockQuantity: 210, isOutOfStock: false },
  { id: 'inv-4', pharmacyId: 'pharm-101', name: 'Metformin 500mg', category: 'Diabetes Care', price: 45, stockQuantity: 0, isOutOfStock: true },
  { id: 'inv-5', pharmacyId: 'pharm-102', name: 'Azithromycin 500mg', category: 'Antibiotic', price: 140, stockQuantity: 90, isOutOfStock: false }
];

interface HealthcareContextType {
  doctors: Doctor[];
  allDoctors: Doctor[]; // Includes pending ones for Admin
  pharmacies: Pharmacy[];
  allPharmacies: Pharmacy[]; // Includes pending ones for Admin
  hospitals: Hospital[];
  labs: Laboratory[];
  laboratories: Laboratory[];
  demandRequests: ProviderRequest[];
  providerRequests: ProviderRequest[];
  notifications: PatientNotification[];
  appointments: Appointment[];
  pharmacyOrders: PharmacyOrder[];
  labBookings: LabBooking[];
  allUsers: User[];
  inventory: InventoryItem[];
  subscriptions: SubscriptionPlanPurchase[];
  adBoosters: AdBoosterPurchase[];

  // Admin & User Operations
  approveDoctor: (doctorId: string) => Promise<void>;
  rejectDoctor: (doctorId: string) => Promise<void>;
  approvePharmacy: (pharmacyId: string) => Promise<void>;
  rejectPharmacy: (pharmacyId: string) => Promise<void>;
  updateUserStatus: (userId: string, status: 'Active' | 'Suspended') => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;

  // Appointment Operations
  bookAppointment: (aptData: Omit<Appointment, 'id' | 'tokenNumber'> & { reason?: string }) => Promise<{ bookingId: string; tokenNumber: string }>;
  acceptAppointment: (appointmentId: string) => Promise<void>;
  rejectAppointment: (appointmentId: string) => Promise<void>;
  cancelAppointment: (appointmentId: string) => Promise<void>;
  updateAppointmentStatus: (appointmentId: string, status: Appointment['status']) => Promise<void>;

  // Doctor & Pharmacy Profile Updates
  updateDoctorProfile: (doctorId: string, updates: Partial<Doctor>) => Promise<void>;
  updatePharmacyProfile: (pharmacyId: string, updates: Partial<Pharmacy>) => Promise<void>;

  // Orders
  placePharmacyOrder: (orderData: Omit<PharmacyOrder, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updatePharmacyOrderStatus: (orderId: string, status: PharmacyOrder['status']) => Promise<void>;

  // Inventory Management
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => Promise<void>;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => Promise<void>;
  deleteInventoryItem: (id: string) => Promise<void>;

  // Subscriptions & Boosters
  purchaseSubscription: (userId: string, userName: string, role: UserRole, plan: 'Silver' | 'Gold' | 'Platinum', amount: number) => Promise<void>;
  purchaseAdBooster: (userId: string, userName: string, role: UserRole, targetCity: string, amount: number) => Promise<void>;

  submitProviderRequest: (reqData: Omit<ProviderRequest, 'id' | 'createdAt' | 'status'>) => void;
  markNotificationRead: (id: string) => void;
  refreshData: () => Promise<void>;
}

const HealthcareContext = createContext<HealthcareContextType | undefined>(undefined);

export const HealthcareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allDoctorsState, setAllDoctorsState] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('meditrust_all_doctors');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.warn('Failed parsing saved doctors', e);
      }
    }
    return INITIAL_DOCTORS;
  });

  const [allPharmaciesState, setAllPharmaciesState] = useState<Pharmacy[]>(() => {
    const saved = localStorage.getItem('meditrust_all_pharmacies');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.warn('Failed parsing saved pharmacies', e);
      }
    }
    return INITIAL_PHARMACIES;
  });

  const [hospitals] = useState<Hospital[]>(INITIAL_HOSPITALS);
  const [labs] = useState<Laboratory[]>(INITIAL_LABS);

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('meditrust_appointments');
    return saved ? JSON.parse(saved) : [
      {
        id: 'apt-001',
        patientName: 'Siddharth Varma',
        doctorName: 'Dr. Suresh Babu, MD, DM',
        specialty: 'Cardiology',
        hospitalName: 'SVIMS Super Specialty Hospital',
        date: new Date().toISOString().split('T')[0],
        time: '03:00 PM',
        type: 'In-Person OPD',
        status: 'Confirmed',
        tokenNumber: 'TK-011',
        consultationFee: 700
      }
    ];
  });

  const [pharmacyOrders, setPharmacyOrders] = useState<PharmacyOrder[]>(() => {
    const saved = localStorage.getItem('meditrust_pharmacy_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ord-1001',
        patientName: 'Siddharth Varma',
        patientPhone: '+91 98765 00112',
        patientAddress: '12-3 MR Palli, Tirupati',
        pharmacyId: 'pharm-101',
        pharmacyName: 'Apollo Pharmacy - Alipiri Branch',
        deliveryType: 'Home Delivery',
        items: [{ name: 'Paracetamol 650mg', quantity: 2, price: 32 }],
        totalAmount: 64,
        status: 'Order Received',
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('meditrust_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [subscriptions, setSubscriptions] = useState<SubscriptionPlanPurchase[]>(() => {
    const saved = localStorage.getItem('meditrust_subscriptions');
    return saved ? JSON.parse(saved) : [
      {
        id: 'sub-1',
        userId: 'usr-doc-01',
        userName: 'Dr. Ananya Sharma',
        userRole: 'doctor',
        planType: 'Gold',
        amount: 2999,
        status: 'Active',
        expiryDate: '2026-12-31',
        createdAt: '2026-01-01'
      }
    ];
  });

  const [adBoosters, setAdBoosters] = useState<AdBoosterPurchase[]>(() => {
    const saved = localStorage.getItem('meditrust_ad_boosters');
    return saved ? JSON.parse(saved) : [
      {
        id: 'bst-1',
        userId: 'usr-pharm-01',
        userName: 'MediTrust Express Pharmacy',
        userRole: 'pharmacy',
        targetCity: 'Tirupati',
        amount: 1499,
        status: 'Active',
        expiryDate: '2026-08-31',
        createdAt: '2026-02-01'
      }
    ];
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('meditrust_users');
    return saved ? JSON.parse(saved) : [
      { id: 'usr-pat-01', name: 'Siddharth Varma', email: 'siddharth.p@medynex.com', role: 'patient', phone: '+91 98765 00112', verified: true, createdAt: '2026-01-15', status: 'Active' },
      { id: 'usr-doc-01', name: 'Dr. Ananya Sharma', email: 'dr.ananya@medynex.com', role: 'doctor', phone: '+91 98765 22334', verified: true, createdAt: '2025-11-20', status: 'Active' },
      { id: 'usr-pharm-01', name: 'MediTrust Express Pharmacy', email: 'pharmacy.dispense@medynex.com', role: 'pharmacy', phone: '+91 98765 43210', verified: true, createdAt: '2026-02-01', status: 'Active' },
      { id: 'usr-admin-01', name: 'Medynex Platform Super-Admin', email: 'admin@medynex.com', role: 'admin', phone: '+91 80 4000 9000', verified: true, createdAt: '2025-01-01', status: 'Active' }
    ];
  });

  const [demandRequests, setDemandRequests] = useState<ProviderRequest[]>([]);
  const [notifications, setNotifications] = useState<PatientNotification[]>([]);

  // Fetch initial data from Supabase
  const loadSupabaseData = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    try {
      const [dbDocs, dbPharms, dbApts, dbOrders, dbUsers, dbSubs, dbBoosts] = await Promise.all([
        SupabaseDB.fetchDoctors(),
        SupabaseDB.fetchPharmacies(),
        SupabaseDB.fetchAppointments(),
        SupabaseDB.fetchMedicineOrders(),
        SupabaseDB.fetchUsers(),
        SupabaseDB.fetchSubscriptions(),
        SupabaseDB.fetchAdBoosters()
      ]);

      if (dbDocs.length > 0) {
        const mappedDocs: Doctor[] = dbDocs.map(d => ({
          id: d.id,
          name: d.name,
          email: d.email,
          phone: d.phone,
          specialty: d.specialization,
          qualification: d.qualification,
          experienceYears: d.experience_years,
          hospitalName: d.hospital_name,
          clinicName: d.clinic_name,
          clinicAddress: d.clinic_address,
          location: d.clinic_address || d.city,
          city: d.city,
          state: d.state,
          district: d.district,
          pincode: d.pincode,
          registrationNo: d.registration_number,
          rating: d.rating || 5.0,
          reviewCount: d.review_count || 0,
          consultationFee: d.offline_fee,
          availableOnline: true,
          availableOffline: true,
          nextAvailable: 'Today',
          image: d.profile_photo || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
          bio: `${d.specialization} specialist with ${d.experience_years} years experience.`,
          languages: ['English', 'Telugu', 'Hindi'],
          verificationStatus: d.verification_status,
          onboardingStatus: d.verification_status === 'Active' ? 'Active' : 'Verification Pending',
          workingDays: d.working_days,
          workingHours: d.working_hours,
          subscriptionPlan: d.subscription_plan,
          adBooster: d.ad_booster
        }));
        setAllDoctorsState(mappedDocs);
      }

      if (dbPharms.length > 0) {
        const mappedPharms: Pharmacy[] = dbPharms.map(p => ({
          id: p.id,
          name: p.name,
          ownerName: p.owner_name,
          email: p.email,
          phone: p.phone,
          drugLicenseNumber: p.drug_license_number,
          gstNumber: p.gst_number,
          address: p.address,
          city: p.city,
          state: p.state,
          district: p.district,
          pincode: p.pincode,
          deliveryRadiusKm: p.delivery_radius_km,
          rating: p.rating || 5.0,
          deliveryAvailable: true,
          open24x7: p.open_24x7,
          image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=600',
          inStockMedicinesCount: 15000,
          verificationStatus: p.verification_status,
          onboardingStatus: p.verification_status === 'Active' ? 'Active' : 'Verification Pending',
          subscriptionPlan: p.subscription_plan,
          adBooster: p.ad_booster,
          workingHours: p.working_hours
        }));
        setAllPharmaciesState(mappedPharms);
      }

      if (dbApts.length > 0) {
        const mappedApts: Appointment[] = dbApts.map(a => ({
          id: a.id,
          patientName: a.patient_name,
          doctorName: a.doctor_name,
          specialty: a.specialty,
          hospitalName: a.doctor_name,
          date: a.date,
          time: a.time_slot,
          type: 'In-Person OPD',
          status: a.status as any,
          tokenNumber: a.token_number,
          consultationFee: a.offline_fee
        }));
        setAppointments(mappedApts);
      }

      if (dbOrders.length > 0) {
        const mappedOrders: PharmacyOrder[] = dbOrders.map(o => ({
          id: o.id,
          patientName: o.patient_name,
          patientPhone: o.patient_phone,
          patientAddress: o.delivery_address,
          pharmacyId: o.pharmacy_id,
          pharmacyName: 'MediTrust Express Pharmacy',
          deliveryType: 'Home Delivery',
          items: typeof o.items === 'string' ? JSON.parse(o.items || '[]') : o.items,
          totalAmount: o.total_amount,
          status: o.status as any,
          createdAt: o.created_at
        }));
        setPharmacyOrders(mappedOrders);
      }

      if (dbUsers.length > 0) {
        const mappedUsers: User[] = dbUsers.map(u => ({
          id: u.id,
          name: u.full_name,
          email: u.email,
          role: u.role,
          phone: u.phone,
          verified: true,
          createdAt: u.created_at ? u.created_at.split('T')[0] : '2026-01-01',
          status: u.status || 'Active',
          city: u.city,
          state: u.state
        }));
        setAllUsers(mappedUsers);
      }

    } catch (e) {
      console.warn('Error loading Supabase data:', e);
    }
  }, []);

  // Setup Realtime Sync
  useEffect(() => {
    loadSupabaseData();

    if (isSupabaseConfigured) {
      const unsubDocs = SupabaseDB.subscribeToChanges('doctors', loadSupabaseData);
      const unsubPharms = SupabaseDB.subscribeToChanges('pharmacies', loadSupabaseData);
      const unsubApts = SupabaseDB.subscribeToChanges('appointments', loadSupabaseData);
      const unsubOrders = SupabaseDB.subscribeToChanges('medicine_orders', loadSupabaseData);
      const unsubProfiles = SupabaseDB.subscribeToChanges('profiles', loadSupabaseData);

      return () => {
        unsubDocs();
        unsubPharms();
        unsubApts();
        unsubOrders();
        unsubProfiles();
      };
    }
  }, [loadSupabaseData]);

  // Save to local storage cache as backup
  useEffect(() => { localStorage.setItem('meditrust_all_doctors', JSON.stringify(allDoctorsState)); }, [allDoctorsState]);
  useEffect(() => { localStorage.setItem('meditrust_all_pharmacies', JSON.stringify(allPharmaciesState)); }, [allPharmaciesState]);
  useEffect(() => { localStorage.setItem('meditrust_appointments', JSON.stringify(appointments)); }, [appointments]);
  useEffect(() => { localStorage.setItem('meditrust_pharmacy_orders', JSON.stringify(pharmacyOrders)); }, [pharmacyOrders]);
  useEffect(() => { localStorage.setItem('meditrust_inventory', JSON.stringify(inventory)); }, [inventory]);
  useEffect(() => { localStorage.setItem('meditrust_users', JSON.stringify(allUsers)); }, [allUsers]);

  // Derived Public Active Provider Lists (Filtered so Pending ones do NOT appear publicly until approved by Admin!)
  const publicDoctors = allDoctorsState.filter(d => d.verificationStatus === 'Active' || d.onboardingStatus === 'Active');
  const publicPharmacies = allPharmaciesState.filter(p => p.verificationStatus === 'Active' || p.onboardingStatus === 'Active');

  // --- ADMIN APPROVAL ACTIONS ---
  const approveDoctor = async (doctorId: string) => {
    setAllDoctorsState(prev => prev.map(d => d.id === doctorId ? { ...d, verificationStatus: 'Active', onboardingStatus: 'Active' } : d));
    if (isSupabaseConfigured) {
      await SupabaseDB.updateDoctorVerification(doctorId, 'Active');
    }
  };

  const rejectDoctor = async (doctorId: string) => {
    setAllDoctorsState(prev => prev.map(d => d.id === doctorId ? { ...d, verificationStatus: 'Rejected', onboardingStatus: 'Inactive' } : d));
    if (isSupabaseConfigured) {
      await SupabaseDB.updateDoctorVerification(doctorId, 'Rejected');
    }
  };

  const approvePharmacy = async (pharmacyId: string) => {
    setAllPharmaciesState(prev => prev.map(p => p.id === pharmacyId ? { ...p, verificationStatus: 'Active', onboardingStatus: 'Active' } : p));
    if (isSupabaseConfigured) {
      await SupabaseDB.updatePharmacyVerification(pharmacyId, 'Active');
    }
  };

  const rejectPharmacy = async (pharmacyId: string) => {
    setAllPharmaciesState(prev => prev.map(p => p.id === pharmacyId ? { ...p, verificationStatus: 'Rejected', onboardingStatus: 'Inactive' } : p));
    if (isSupabaseConfigured) {
      await SupabaseDB.updatePharmacyVerification(pharmacyId, 'Rejected');
    }
  };

  // Admin User Management
  const updateUserStatus = async (userId: string, status: 'Active' | 'Suspended') => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    if (isSupabaseConfigured) {
      await SupabaseDB.updateUserStatus(userId, status);
    }
  };

  const deleteUser = async (userId: string) => {
    setAllUsers(prev => prev.filter(u => u.id !== userId));
    if (isSupabaseConfigured) {
      await SupabaseDB.deleteUser(userId);
    }
  };

  // --- APPOINTMENTS ---
  const bookAppointment = async (aptData: Omit<Appointment, 'id' | 'tokenNumber'> & { reason?: string }) => {
    const bookingId = `MT-BKG-${Math.floor(10000 + Math.random() * 90000)}`;
    const tokenNumber = `TK-0${Math.floor(12 + appointments.length + 1)}`;
    const newApt: Appointment = {
      ...aptData,
      id: `apt-${Date.now()}`,
      status: 'Confirmed',
      tokenNumber,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bookingId}`
    };

    setAppointments(prev => [newApt, ...prev]);

    if (isSupabaseConfigured) {
      await SupabaseDB.createAppointment({
        booking_id: bookingId,
        token_number: tokenNumber,
        doctor_id: aptData.doctorName,
        patient_name: aptData.patientName,
        patient_phone: '+91 98765 00000',
        doctor_name: aptData.doctorName,
        specialty: aptData.specialty,
        date: aptData.date,
        time_slot: aptData.time,
        reason: aptData.reason || 'General Consultation',
        status: 'Confirmed',
        offline_fee: aptData.consultationFee || 500
      });
    }

    return { bookingId, tokenNumber };
  };

  const acceptAppointment = async (appointmentId: string) => {
    setAppointments(prev => prev.map(a => a.id === appointmentId ? { ...a, status: 'Confirmed' } : a));
    if (isSupabaseConfigured) {
      await SupabaseDB.updateAppointmentStatus(appointmentId, 'Confirmed');
    }
  };

  const rejectAppointment = async (appointmentId: string) => {
    setAppointments(prev => prev.map(a => a.id === appointmentId ? { ...a, status: 'Cancelled' } : a));
    if (isSupabaseConfigured) {
      await SupabaseDB.updateAppointmentStatus(appointmentId, 'Cancelled');
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    setAppointments(prev => prev.map(a => a.id === appointmentId ? { ...a, status: 'Cancelled' } : a));
    if (isSupabaseConfigured) {
      await SupabaseDB.updateAppointmentStatus(appointmentId, 'Cancelled');
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === appointmentId ? { ...a, status } : a));
    if (isSupabaseConfigured) {
      const dbStatus = status === 'In Progress' ? 'Pending' : status;
      await SupabaseDB.updateAppointmentStatus(appointmentId, dbStatus as any);
    }
  };

  // Doctor & Pharmacy Profile Updates
  const updateDoctorProfile = async (doctorId: string, updates: Partial<Doctor>) => {
    setAllDoctorsState(prev => prev.map(d => d.id === doctorId ? { ...d, ...updates } : d));
    if (isSupabaseConfigured) {
      await SupabaseDB.updateDoctorProfile(doctorId, {
        clinic_address: updates.clinicAddress || updates.location,
        offline_fee: updates.consultationFee,
        working_hours: updates.workingHours
      });
    }
  };

  const updatePharmacyProfile = async (pharmacyId: string, updates: Partial<Pharmacy>) => {
    setAllPharmaciesState(prev => prev.map(p => p.id === pharmacyId ? { ...p, ...updates } : p));
    if (isSupabaseConfigured) {
      await SupabaseDB.updatePharmacyProfile(pharmacyId, {
        address: updates.address,
        working_hours: updates.workingHours,
        delivery_radius_km: updates.deliveryRadiusKm
      });
    }
  };

  // Medicine Orders
  const placePharmacyOrder = async (orderData: Omit<PharmacyOrder, 'id' | 'createdAt' | 'status'>) => {
    const orderId = `ord-${Date.now()}`;
    const nowIso = new Date().toISOString();
    const newOrder: PharmacyOrder = {
      ...orderData,
      id: orderId,
      status: 'Order Received',
      createdAt: nowIso
    };

    setPharmacyOrders(prev => [newOrder, ...prev]);

    if (isSupabaseConfigured) {
      await SupabaseDB.createMedicineOrder({
        order_number: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        pharmacy_id: orderData.pharmacyId,
        patient_name: orderData.patientName,
        patient_phone: orderData.patientPhone,
        delivery_address: orderData.patientAddress,
        items: JSON.stringify(orderData.items),
        total_amount: orderData.totalAmount,
        status: 'Pending',
        payment_status: 'Paid'
      });
    }
  };

  const updatePharmacyOrderStatus = async (orderId: string, status: PharmacyOrder['status']) => {
    setPharmacyOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    if (isSupabaseConfigured) {
      const dbStatusMap: Record<string, any> = {
        'Order Received': 'Pending',
        'Preparing': 'Preparing',
        'Ready for Pickup': 'Accepted',
        'Out for Delivery': 'Out for Delivery',
        'Delivered': 'Delivered'
      };
      await SupabaseDB.updateMedicineOrderStatus(orderId, dbStatusMap[status] || 'Pending');
    }
  };

  // Inventory Management
  const addInventoryItem = async (item: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = { ...item, id: `inv-${Date.now()}` };
    setInventory(prev => [newItem, ...prev]);
    if (isSupabaseConfigured) {
      await SupabaseDB.addInventoryItem({
        pharmacy_id: item.pharmacyId,
        name: item.name,
        category: item.category,
        price: item.price,
        stock_quantity: item.stockQuantity,
        is_out_of_stock: item.isOutOfStock
      });
    }
  };

  const updateInventoryItem = async (id: string, updates: Partial<InventoryItem>) => {
    setInventory(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
    if (isSupabaseConfigured) {
      await SupabaseDB.updateInventoryItem(id, {
        price: updates.price,
        stock_quantity: updates.stockQuantity,
        is_out_of_stock: updates.isOutOfStock
      });
    }
  };

  const deleteInventoryItem = async (id: string) => {
    setInventory(prev => prev.filter(i => i.id !== id));
    if (isSupabaseConfigured) {
      await SupabaseDB.deleteInventoryItem(id);
    }
  };

  // Subscriptions & Boosters
  const purchaseSubscription = async (userId: string, userName: string, role: UserRole, plan: 'Silver' | 'Gold' | 'Platinum', amount: number) => {
    const newSub: SubscriptionPlanPurchase = {
      id: `sub-${Date.now()}`,
      userId,
      userName,
      userRole: role,
      planType: plan,
      amount,
      status: 'Active',
      expiryDate: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    setSubscriptions(prev => [newSub, ...prev]);

    // Update doctor or pharmacy subscription plan
    if (role === 'doctor') {
      setAllDoctorsState(prev => prev.map(d => d.id === userId ? { ...d, subscriptionPlan: plan } : d));
    } else if (role === 'pharmacy') {
      setAllPharmaciesState(prev => prev.map(p => p.id === userId ? { ...p, subscriptionPlan: plan } : p));
    }

    if (isSupabaseConfigured) {
      await SupabaseDB.createSubscription({
        user_id: userId,
        user_role: role,
        plan_type: plan,
        amount,
        status: 'Active',
        expiry_date: newSub.expiryDate
      });
    }
  };

  const purchaseAdBooster = async (userId: string, userName: string, role: UserRole, targetCity: string, amount: number) => {
    const newBooster: AdBoosterPurchase = {
      id: `bst-${Date.now()}`,
      userId,
      userName,
      userRole: role,
      targetCity,
      amount,
      status: 'Active',
      expiryDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    setAdBoosters(prev => [newBooster, ...prev]);

    if (role === 'doctor') {
      setAllDoctorsState(prev => prev.map(d => d.id === userId ? { ...d, adBooster: true } : d));
    } else if (role === 'pharmacy') {
      setAllPharmaciesState(prev => prev.map(p => p.id === userId ? { ...p, adBooster: true } : p));
    }

    if (isSupabaseConfigured) {
      await SupabaseDB.createAdBooster({
        user_id: userId,
        user_role: role,
        target_city: targetCity,
        amount,
        status: 'Active',
        expiry_date: newBooster.expiryDate
      });
    }
  };

  const submitProviderRequest = (reqData: Omit<ProviderRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: ProviderRequest = {
      ...reqData,
      id: `req-${Date.now()}`,
      status: 'Pending Onboarding',
      createdAt: new Date().toISOString()
    };
    setDemandRequests(prev => [newReq, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <HealthcareContext.Provider
      value={{
        doctors: publicDoctors,
        allDoctors: allDoctorsState,
        pharmacies: publicPharmacies,
        allPharmacies: allPharmaciesState,
        hospitals,
        labs,
        laboratories: labs,
        demandRequests,
        providerRequests: demandRequests,
        notifications,
        appointments,
        pharmacyOrders,
        labBookings: [],
        allUsers,
        inventory,
        subscriptions,
        adBoosters,
        approveDoctor,
        rejectDoctor,
        approvePharmacy,
        rejectPharmacy,
        updateUserStatus,
        deleteUser,
        bookAppointment,
        acceptAppointment,
        rejectAppointment,
        cancelAppointment,
        updateAppointmentStatus,
        updateDoctorProfile,
        updatePharmacyProfile,
        placePharmacyOrder,
        updatePharmacyOrderStatus,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        purchaseSubscription,
        purchaseAdBooster,
        submitProviderRequest,
        markNotificationRead,
        refreshData: loadSupabaseData
      }}
    >
      {children}
    </HealthcareContext.Provider>
  );
};

export const useHealthcare = () => {
  const context = useContext(HealthcareContext);
  if (!context) {
    throw new Error('useHealthcare must be used within a HealthcareProvider');
  }
  return context;
};
