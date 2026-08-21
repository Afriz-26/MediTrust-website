import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Doctor, Hospital, Pharmacy, Laboratory, 
  ProviderRequest, PatientNotification, PharmacyOrder, LabBooking, Appointment, User, UserRole, InventoryItem, SubscriptionPlanPurchase, AdBoosterPurchase
} from '../types';
import { SupabaseDB, DbDoctor, DbPharmacy, DbAppointment, DbMedicineOrder, DbUser, DbInventoryItem, DbSubscription, DbAdBooster } from '../lib/supabaseService';
import { isSupabaseConfigured } from '../lib/supabase';

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-101',
    name: 'Dr. Suresh Babu (Mohan Babu Health)',
    email: 'dr.suresh@medynex.com',
    phone: '+91 877 228 7777',
    specialty: 'Cardiology',
    qualification: 'MD, DM (Cardiology), SVIMS Tirupati',
    experienceYears: 15,
    hospitalName: 'SVIMS Super Specialty Hospital',
    clinicName: 'Suresh Cardiac Care',
    clinicAddress: 'Alipiri Road, Tirupati',
    location: 'Alipiri Road, Tirupati',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    pincode: '517501',
    rating: 4.9,
    reviewCount: 184,
    consultationFee: 700,
    onlineFee: 500,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Today, 03:00 PM',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    bio: 'Renowned cardiologist specializing in non-invasive cardiac care, hypertension, and preventive cardiology in Rayalaseema region.',
    languages: ['Telugu', 'English', 'Hindi'],
    gender: 'Male',
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    workingHours: '09:00 AM - 06:00 PM',
    subscriptionPlan: 'Gold',
    adBooster: true,
    requestCount: 42,
    distanceKm: 1.2
  },
  {
    id: 'doc-102',
    name: 'Dr. K. Radhika Rao',
    email: 'dr.radhika@medynex.com',
    phone: '+91 877 225 9900',
    specialty: 'Dermatology & Cosmetology',
    qualification: 'MD (Dermatology), AIIMS',
    experienceYears: 11,
    hospitalName: 'Rao Skin & Laser Clinic',
    clinicName: 'Rao Skin Clinic',
    clinicAddress: 'MR Palli Circle, Tirupati',
    location: 'MR Palli Circle, Tirupati',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    pincode: '517502',
    rating: 4.75,
    reviewCount: 96,
    consultationFee: 600,
    onlineFee: 450,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Tomorrow, 11:00 AM',
    image: 'https://images.unsplash.com/photo-1594824813566-888242a45d62?auto=format&fit=crop&q=80&w=400',
    bio: 'Expert dermatologist specializing in laser skin rejuvenation, allergy treatments, and clinical dermatology.',
    languages: ['Telugu', 'English'],
    gender: 'Female',
    onboardingStatus: 'Not Yet Onboarded',
    verificationStatus: 'Pending',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    workingHours: '10:00 AM - 08:00 PM',
    subscriptionPlan: 'Free',
    adBooster: false,
    requestCount: 128,
    distanceKm: 2.5
  },
  {
    id: 'doc-103',
    name: 'Dr. Ramesh Kumar Reddy',
    email: 'dr.ramesh@medynex.com',
    phone: '+91 877 224 1122',
    specialty: 'Orthopedics & Joint Replacement',
    qualification: 'MS (Ortho), MCh (UK)',
    experienceYears: 20,
    hospitalName: 'Tirumala Ortho Centre',
    clinicName: 'Tirumala Joint Care',
    clinicAddress: 'Renigunta Road, Tirupati',
    location: 'Renigunta Road, Tirupati',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    pincode: '517506',
    rating: 4.88,
    reviewCount: 230,
    consultationFee: 800,
    onlineFee: 600,
    availableOnline: false,
    availableOffline: true,
    nextAvailable: 'Today, 05:00 PM',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    bio: 'Senior joint replacement surgeon having performed over 3,000 successful hip and knee surgeries.',
    languages: ['Telugu', 'English', 'Tamil'],
    gender: 'Male',
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    workingHours: '09:00 AM - 08:00 PM',
    subscriptionPlan: 'Silver',
    adBooster: false,
    requestCount: 94,
    distanceKm: 3.8
  },
  {
    id: 'doc-104',
    name: 'Dr. P. Venkata Subbaiah',
    email: 'dr.subbaiah@medynex.com',
    phone: '+91 859 220 1144',
    specialty: 'General Medicine & Diabetology',
    qualification: 'MD (General Medicine), SVMC Tirupati',
    experienceYears: 18,
    hospitalName: 'Kanigiri Government Area Hospital / Private Clinic',
    clinicName: 'Kanigiri Life Care Clinic',
    clinicAddress: 'Main Road, Kanigiri',
    location: 'Main Road, Kanigiri',
    city: 'Kanigiri',
    state: 'Andhra Pradesh',
    district: 'Prakasam',
    pincode: '523230',
    rating: 4.8,
    reviewCount: 142,
    consultationFee: 400,
    onlineFee: 300,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Today, 04:30 PM',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    bio: 'Trusted family physician and diabetes consultant serving Kanigiri & Prakasam district for 18 years.',
    languages: ['Telugu', 'English'],
    gender: 'Male',
    onboardingStatus: 'Not Yet Onboarded',
    verificationStatus: 'Pending',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    workingHours: '08:30 AM - 07:00 PM',
    subscriptionPlan: 'Free',
    adBooster: false,
    requestCount: 67,
    distanceKm: 1.5
  },
  {
    id: 'doc-105',
    name: 'Dr. Ananya Sharma',
    email: 'dr.ananya@medynex.com',
    phone: '+91 40 4000 8899',
    specialty: 'Cardiology',
    qualification: 'MD, DM (Cardiology), AIIMS New Delhi',
    experienceYears: 14,
    hospitalName: 'Apollo Hospitals, Jubilee Hills',
    clinicName: 'Ananya Heart Clinic',
    clinicAddress: 'Road No 36, Jubilee Hills, Hyderabad',
    location: 'Jubilee Hills, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    district: 'Hyderabad',
    pincode: '500033',
    rating: 4.9,
    reviewCount: 382,
    consultationFee: 900,
    onlineFee: 700,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Today, 02:30 PM',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    bio: 'Pioneer in interventional cardiology and non-invasive preventive cardiac care.',
    languages: ['Telugu', 'Hindi', 'English'],
    gender: 'Female',
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    workingHours: '09:00 AM - 05:00 PM',
    subscriptionPlan: 'Gold',
    adBooster: true,
    requestCount: 210,
    distanceKm: 4.2
  },
  {
    id: 'doc-106',
    name: 'Dr. Mallikarjuna Reddy',
    email: 'dr.mallikarjuna@medynex.com',
    phone: '+91 8596 225500',
    specialty: 'General Surgery & Trauma',
    qualification: 'MS (General Surgery), Osmania Medical College',
    experienceYears: 16,
    hospitalName: 'Mallikarjuna Hospital & Trauma Care',
    clinicName: 'Mallikarjuna Surgical Clinic',
    clinicAddress: 'Main Road, Kanigiri',
    location: 'Main Road, Kanigiri',
    city: 'Kanigiri',
    state: 'Andhra Pradesh',
    district: 'Prakasam',
    pincode: '523230',
    rating: 4.85,
    reviewCount: 164,
    consultationFee: 500,
    onlineFee: 400,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Today, 05:00 PM',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    bio: 'Senior consultant surgeon specializing in laparoscopic procedures, hernia repair, and emergency trauma care in Kanigiri.',
    languages: ['Telugu', 'English'],
    gender: 'Male',
    onboardingStatus: 'Not Yet Onboarded',
    verificationStatus: 'Pending',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    workingHours: '09:00 AM - 08:00 PM',
    subscriptionPlan: 'Free',
    adBooster: false,
    requestCount: 189,
    distanceKm: 0.9
  }
];

export const INITIAL_PHARMACIES: Pharmacy[] = [
  {
    id: 'pharm-101',
    name: 'Apollo Pharmacy - Alipiri Branch',
    ownerName: 'Apollo Hospitals Group',
    email: 'apollo.alipiri@medynex.com',
    phone: '+91 877 228 1234',
    drugLicenseNumber: 'AP-DRUG-88391',
    address: 'Alipiri Main Road, Near Bus Stand',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    pincode: '517501',
    deliveryRadiusKm: 15,
    rating: 4.85,
    deliveryAvailable: true,
    open24x7: true,
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=600',
    inStockMedicinesCount: 18500,
    onboardingStatus: 'Active',
    verificationStatus: 'Active',
    subscriptionPlan: 'Gold',
    adBooster: true,
    workingHours: 'Open 24 Hours',
    requestCount: 52,
    distanceKm: 0.8
  },
  {
    id: 'pharm-102',
    name: 'MedPlus Wellness Pharmacy',
    ownerName: 'Suresh Varma',
    email: 'medplus.mrpalli@medynex.com',
    phone: '+91 877 223 5566',
    drugLicenseNumber: 'AP-DRUG-99201',
    address: 'MR Palli Junction, Opp Bank of Baroda',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    pincode: '517502',
    deliveryRadiusKm: 8,
    rating: 4.7,
    deliveryAvailable: true,
    open24x7: false,
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600',
    inStockMedicinesCount: 12400,
    onboardingStatus: 'Verification Pending',
    verificationStatus: 'Pending',
    subscriptionPlan: 'Free',
    adBooster: false,
    workingHours: '07:00 AM - 11:00 PM',
    requestCount: 89,
    distanceKm: 2.1
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
    return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
  });

  const [allPharmaciesState, setAllPharmaciesState] = useState<Pharmacy[]>(() => {
    const saved = localStorage.getItem('meditrust_all_pharmacies');
    return saved ? JSON.parse(saved) : INITIAL_PHARMACIES;
  });

  const [hospitals] = useState<Hospital[]>([]);
  const [labs] = useState<Laboratory[]>([]);

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('meditrust_appointments');
    return saved ? JSON.parse(saved) : [
      {
        id: 'apt-001',
        patientName: 'Siddharth Varma',
        doctorName: 'Dr. Suresh Babu (Mohan Babu Health)',
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
