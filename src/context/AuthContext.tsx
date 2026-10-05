import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AdminCollaborator, AdminRoleScope } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { SupabaseDB } from '../lib/supabaseService';

export interface PatientRegistrationData {
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  address: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  preferredLanguage: string;
  emergencyContact: string;
  profilePhoto?: string;
  password?: string;
}

export interface DoctorRegistrationData {
  doctorName: string;
  email: string;
  phone: string;
  registrationNumber: string;
  qualification: string;
  specialization: string;
  experienceYears: number;
  hospitalName: string;
  clinicName?: string;
  clinicAddress: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  lat?: number;
  lng?: number;
  workingDays: string[];
  workingHours: string;
  offlineFee: number;
  profilePhoto?: string;
  medicalLicense?: string;
  password?: string;
}

export interface PharmacyRegistrationData {
  pharmacyName: string;
  ownerName: string;
  email: string;
  phone: string;
  drugLicenseNumber: string;
  gstNumber?: string;
  address: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  deliveryRadiusKm: number;
  workingHours: string;
  lat?: number;
  lng?: number;
  pharmacyLicense?: string;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  authenticated?: boolean;
  isLoading: boolean;
  login: (role: UserRole, email?: string, name?: string) => Promise<boolean>;
  loginWithPassword: (email: string, pass: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  registerPatient: (data: PatientRegistrationData) => Promise<{ success: boolean; error?: string }>;
  registerDoctor: (data: DoctorRegistrationData) => Promise<{ success: boolean; error?: string }>;
  registerPharmacy: (data: PharmacyRegistrationData) => Promise<{ success: boolean; error?: string }>;
  registerGeneric: (role: UserRole, name: string, email: string, details?: Record<string, any>) => Promise<{ success: boolean; error?: string }>;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  
  // Restricted Admin Account & Collaborator Management
  adminCollaborators: AdminCollaborator[];
  isMasterAdminConfigured: boolean;
  initializeMasterAdmin: (name: string, email: string, password?: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  addAdminCollaborator: (data: { name: string; email: string; roleScope: AdminRoleScope; phone?: string; department?: string; accessKey?: string; notes?: string }) => Promise<{ success: boolean; error?: string; collaborator?: AdminCollaborator }>;
  updateAdminCollaboratorStatus: (id: string, status: 'Active' | 'Suspended') => Promise<{ success: boolean; error?: string }>;
  removeAdminCollaborator: (id: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const PRESET_USERS: Record<UserRole, User> = {
  patient: {
    id: 'usr-pat-01',
    name: 'Siddharth Varma',
    email: 'siddharth.p@medynex.com',
    role: 'patient',
    phone: '+91 98765 00112',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    verified: true,
    createdAt: '2026-01-15',
    age: 32,
    gender: 'Male',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    pincode: '517501',
    address: '12-3 MR Palli, Tirupati',
    preferredLanguage: 'en',
    emergencyContact: '+91 98765 99999',
    status: 'Active'
  },
  doctor: {
    id: 'usr-doc-01',
    name: 'Dr. Ananya Sharma',
    email: 'dr.ananya@medynex.com',
    role: 'doctor',
    phone: '+91 98765 22334',
    organization: 'MediTrust Heart Institute',
    registrationNo: 'MCI-2012-884920',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    verified: true,
    createdAt: '2025-11-20',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    status: 'Active'
  },
  pharmacy: {
    id: 'usr-pharm-01',
    name: 'MediTrust Express Pharmacy',
    email: 'pharmacy.dispense@medynex.com',
    role: 'pharmacy',
    phone: '+91 98765 43210',
    organization: 'MediTrust Retail Chain',
    registrationNo: 'DRUG-LIC-33921',
    avatar: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=200',
    verified: true,
    createdAt: '2026-02-01',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    status: 'Active'
  },
  admin: {
    id: 'usr-admin-01',
    name: 'Shaik Afriz (Super-Admin)',
    email: 'admin@medynex.com',
    role: 'admin',
    phone: '+91 83286 20294',
    organization: 'Medynex Solutions LLP',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    verified: true,
    createdAt: '2025-01-01',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'Active'
  }
};

export const DEFAULT_ADMIN_COLLABORATORS: AdminCollaborator[] = [
  {
    id: 'collab-01',
    name: 'Shaik Afriz',
    email: 'admin@medynex.com',
    roleScope: 'Super-Admin',
    phone: '+91 83286 20294',
    department: 'Executive Leadership & Engineering',
    status: 'Active',
    createdAt: '2025-01-01',
    lastActive: 'Just now',
    assignedBy: 'Primary Master Slot'
  },
  {
    id: 'collab-02',
    name: 'Bandi Nandini',
    email: 'nandini.ops@medynex.com',
    roleScope: 'Operations Manager',
    phone: '+91 877 228 9911',
    department: 'Hospital & Clinic Onboarding',
    status: 'Active',
    createdAt: '2025-06-15',
    lastActive: '10 mins ago',
    assignedBy: 'Shaik Afriz (Super-Admin)'
  },
  {
    id: 'collab-03',
    name: 'Dr. Suresh Babu',
    email: 'clinical.review@medynex.com',
    roleScope: 'Clinical Verifier',
    phone: '+91 877 228 7777',
    department: 'Medical License Verification',
    status: 'Active',
    createdAt: '2025-09-10',
    lastActive: '1 hour ago',
    assignedBy: 'Shaik Afriz (Super-Admin)'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('medynex_user_session');
        if (saved) {
          return JSON.parse(saved);
        }
      }
    } catch (e) {
      console.warn('Storage access restricted or error reading session:', e);
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [adminCollaborators, setAdminCollaborators] = useState<AdminCollaborator[]>(() => {
    try {
      const saved = localStorage.getItem('medynex_admin_collaborators');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load admin collaborators:', e);
    }
    return DEFAULT_ADMIN_COLLABORATORS;
  });

  const [isMasterAdminConfigured, setIsMasterAdminConfigured] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('medynex_master_admin_initialized');
      if (saved !== null) return JSON.parse(saved);
    } catch (e) {}
    return true; // Initialized with default Super-Admin
  });

  const initializeMasterAdmin = async (name: string, email: string, password?: string, phone?: string): Promise<{ success: boolean; error?: string }> => {
    const masterCollab: AdminCollaborator = {
      id: `collab-master-${Date.now()}`,
      name,
      email,
      roleScope: 'Super-Admin',
      phone: phone || '+91 83286 20294',
      department: 'Platform Administration',
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      assignedBy: 'Initial Master Slot'
    };
    const updated = [masterCollab, ...adminCollaborators.filter(c => c.id !== 'collab-01')];
    setAdminCollaborators(updated);
    setIsMasterAdminConfigured(true);
    localStorage.setItem('medynex_admin_collaborators', JSON.stringify(updated));
    localStorage.setItem('medynex_master_admin_initialized', JSON.stringify(true));
    
    const masterUser: User = {
      id: masterCollab.id,
      name,
      email,
      role: 'admin',
      phone,
      verified: true,
      createdAt: masterCollab.createdAt,
      status: 'Active'
    };
    setUser(masterUser);
    localStorage.setItem('medynex_user_session', JSON.stringify(masterUser));
    return { success: true };
  };

  const addAdminCollaborator = async (data: { name: string; email: string; roleScope: AdminRoleScope; phone?: string; department?: string; accessKey?: string; notes?: string }): Promise<{ success: boolean; error?: string; collaborator?: AdminCollaborator }> => {
    if (!user || user.role !== 'admin') {
      return { success: false, error: 'Unauthorized: Only an active Administrator can add team collaborators.' };
    }
    if (adminCollaborators.some(c => c.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: `A collaborator with email ${data.email} already exists.` };
    }

    const newCollab: AdminCollaborator = {
      id: `collab-${Date.now()}`,
      name: data.name,
      email: data.email,
      roleScope: data.roleScope,
      phone: data.phone,
      department: data.department || 'Platform Operations',
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      assignedBy: `${user.name} (${user.email})`,
      accessKey: data.accessKey || `ADM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      notes: data.notes
    };

    const updated = [...adminCollaborators, newCollab];
    setAdminCollaborators(updated);
    localStorage.setItem('medynex_admin_collaborators', JSON.stringify(updated));
    return { success: true, collaborator: newCollab };
  };

  const updateAdminCollaboratorStatus = async (id: string, status: 'Active' | 'Suspended'): Promise<{ success: boolean; error?: string }> => {
    if (!user || user.role !== 'admin') {
      return { success: false, error: 'Unauthorized' };
    }
    const updated = adminCollaborators.map(c => c.id === id ? { ...c, status } : c);
    setAdminCollaborators(updated);
    localStorage.setItem('medynex_admin_collaborators', JSON.stringify(updated));
    return { success: true };
  };

  const removeAdminCollaborator = async (id: string): Promise<{ success: boolean; error?: string }> => {
    if (!user || user.role !== 'admin') {
      return { success: false, error: 'Unauthorized' };
    }
    const updated = adminCollaborators.filter(c => c.id !== id);
    setAdminCollaborators(updated);
    localStorage.setItem('medynex_admin_collaborators', JSON.stringify(updated));
    return { success: true };
  };

  // Synchronize session on start & Listen to Supabase Auth State
  useEffect(() => {
    let subscription: any;

    const initAuth = async () => {
      if (isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            // Load user profile safely from Supabase
            const profile = await SupabaseDB.fetchProfile(session.user.id);

            const appUser: User = {
              id: session.user.id,
              name: profile?.full_name || session.user.user_metadata?.full_name || 'MediTrust User',
              email: profile?.email || session.user.email || '',
              role: profile?.role || (session.user.user_metadata?.role as UserRole) || 'patient',
              phone: profile?.phone || session.user.user_metadata?.phone || '',
              avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
              verified: true,
              createdAt: profile?.created_at || new Date().toISOString().split('T')[0],
              status: profile?.status || 'Active',
              city: profile?.city || '',
              state: profile?.state || ''
            };
            setUser(appUser);
          }
        } catch (err) {
          console.warn('Supabase session load error:', err);
        }

        try {
          const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
              try {
                const profile = await SupabaseDB.fetchProfile(session.user.id);

                const appUser: User = {
                  id: session.user.id,
                  name: profile?.full_name || session.user.user_metadata?.full_name || 'MediTrust User',
                  email: profile?.email || session.user.email || '',
                  role: profile?.role || (session.user.user_metadata?.role as UserRole) || 'patient',
                  phone: profile?.phone || session.user.user_metadata?.phone || '',
                  avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                  verified: true,
                  createdAt: profile?.created_at || new Date().toISOString().split('T')[0],
                  status: profile?.status || 'Active'
                };
                setUser(appUser);
              } catch (profileErr) {
                console.warn('Error fetching profile on auth state change:', profileErr);
              }
            } else if (event === 'SIGNED_OUT') {
              setUser(null);
            }
          });
          if (authListener?.subscription) {
            subscription = authListener.subscription;
          }
        } catch (listenerErr) {
          console.warn('Supabase auth listener error:', listenerErr);
        }
      }
      setIsLoading(false);
    };

    initAuth();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // Save session state locally
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        if (user) {
          localStorage.setItem('medynex_user_session', JSON.stringify(user));
        } else {
          localStorage.removeItem('medynex_user_session');
        }
      }
    } catch (e) {
      console.warn('Storage access restricted or error saving session:', e);
    }
  }, [user]);

  // Quick Preset / Role Demo Login
  const login = async (role: UserRole, email?: string, name?: string): Promise<boolean> => {
    const preset = PRESET_USERS[role];
    const newUser: User = {
      ...preset,
      email: email || preset.email,
      name: name || preset.name,
      lastLogin: new Date().toISOString()
    };
    setUser(newUser);

    // Also sync to Supabase DB profiles if configured
    if (isSupabaseConfigured) {
      await SupabaseDB.upsertProfile({
        id: newUser.id,
        email: newUser.email,
        full_name: newUser.name,
        role: newUser.role,
        phone: newUser.phone,
        avatar_url: newUser.avatar,
        status: 'Active',
        created_at: newUser.createdAt,
        last_login: newUser.lastLogin
      });
    }
    return true;
  };

  // Login with Password via Supabase Auth
  const loginWithPassword = async (email: string, pass: string, targetRole?: UserRole): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) return { success: false, error: error.message };
        
        if (data.user) {
          const profile = await SupabaseDB.fetchProfile(data.user.id);

          const role = profile?.role || targetRole || (data.user.user_metadata?.role as UserRole) || 'patient';
          const appUser: User = {
            id: data.user.id,
            name: profile?.full_name || data.user.user_metadata?.full_name || 'MediTrust User',
            email: data.user.email || email,
            role,
            phone: profile?.phone || data.user.user_metadata?.phone || '',
            avatar: profile?.avatar_url || data.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
            verified: true,
            createdAt: profile?.created_at || new Date().toISOString().split('T')[0],
            status: profile?.status || 'Active'
          };
          setUser(appUser);
          return { success: true };
        }
      } catch (e: any) {
        return { success: false, error: e.message || 'Login failed' };
      }
    }
    // Fallback for preview demo if Supabase credentials are not connected
    login(targetRole || 'patient', email);
    return { success: true };
  };

  // Google OAuth Sign-In
  const loginWithGoogle = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboards/patient'
        }
      });
    } else {
      login('patient', 'google.user@medynex.com', 'Google User');
    }
  };

  // Reset Password
  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/login'
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
    return { success: true };
  };

  // Logout
  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('medynex_user_session');
  };

  // Patient Registration
  const registerPatient = async (data: PatientRegistrationData): Promise<{ success: boolean; error?: string }> => {
    const userId = `usr-pat-${Date.now()}`;
    const nowIso = new Date().toISOString();

    if (isSupabaseConfigured) {
      try {
        const { data: authData, error: authErr } = await supabase.auth.signUp({
          email: data.email,
          password: data.password || 'Password123!',
          options: {
            data: {
              full_name: data.fullName,
              role: 'patient',
              phone: data.phone
            }
          }
        });

        if (authErr) return { success: false, error: authErr.message };

        const id = authData.user?.id || userId;

        // Upsert Profile in Supabase
        await SupabaseDB.upsertProfile({
          id,
          email: data.email,
          full_name: data.fullName,
          phone: data.phone,
          role: 'patient',
          age: data.age,
          gender: data.gender,
          address: data.address,
          state: data.state,
          district: data.district,
          city: data.city,
          pincode: data.pincode,
          preferred_language: data.preferredLanguage,
          emergency_contact: data.emergencyContact,
          avatar_url: data.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          created_at: nowIso,
          last_login: nowIso,
          status: 'Active'
        });

        const newUser: User = {
          id,
          name: data.fullName,
          email: data.email,
          role: 'patient',
          phone: data.phone,
          avatar: data.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          verified: true,
          createdAt: nowIso.split('T')[0],
          age: data.age,
          gender: data.gender,
          address: data.address,
          state: data.state,
          district: data.district,
          city: data.city,
          pincode: data.pincode,
          preferredLanguage: data.preferredLanguage as any,
          emergencyContact: data.emergencyContact,
          status: 'Active'
        };

        setUser(newUser);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    // Demo Local Registration
    const newUser: User = {
      id: userId,
      name: data.fullName,
      email: data.email,
      role: 'patient',
      phone: data.phone,
      avatar: data.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      verified: true,
      createdAt: nowIso.split('T')[0],
      age: data.age,
      gender: data.gender,
      address: data.address,
      state: data.state,
      district: data.district,
      city: data.city,
      pincode: data.pincode,
      emergencyContact: data.emergencyContact,
      status: 'Active'
    };
    setUser(newUser);
    return { success: true };
  };

  // Doctor Registration (Verification Status Defaults to 'Pending')
  const registerDoctor = async (data: DoctorRegistrationData): Promise<{ success: boolean; error?: string }> => {
    const docId = `doc-${Date.now()}`;
    const nowIso = new Date().toISOString();

    if (isSupabaseConfigured) {
      try {
        const { data: authData, error: authErr } = await supabase.auth.signUp({
          email: data.email,
          password: data.password || 'Password123!',
          options: {
            data: {
              full_name: data.doctorName,
              role: 'doctor',
              phone: data.phone
            }
          }
        });

        if (authErr) return { success: false, error: authErr.message };

        const userId = authData.user?.id || `usr-${docId}`;

        // Create Profile
        await SupabaseDB.upsertProfile({
          id: userId,
          email: data.email,
          full_name: data.doctorName,
          phone: data.phone,
          role: 'doctor',
          address: data.clinicAddress,
          state: data.state,
          district: data.district,
          city: data.city,
          pincode: data.pincode,
          avatar_url: data.profilePhoto || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
          created_at: nowIso,
          status: 'Active'
        });

        // Insert in doctors table (verification_status = 'Pending', NOT public until approved by Admin!)
        await SupabaseDB.createDoctor({
          user_id: userId,
          name: data.doctorName,
          email: data.email,
          phone: data.phone,
          registration_number: data.registrationNumber,
          qualification: data.qualification,
          specialization: data.specialization,
          experience_years: Number(data.experienceYears),
          hospital_name: data.hospitalName,
          clinic_name: data.clinicName,
          clinic_address: data.clinicAddress,
          state: data.state,
          district: data.district,
          city: data.city,
          pincode: data.pincode,
          working_days: data.workingDays,
          working_hours: data.workingHours,
          offline_fee: Number(data.offlineFee),
          profile_photo: data.profilePhoto || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
          medical_license: data.medicalLicense,
          verification_status: 'Pending', // ADMIN APPROVAL REQUIRED
          subscription_plan: 'Free',
          ad_booster: false,
          rating: 5.0,
          review_count: 0
        });

        const newUser: User = {
          id: userId,
          name: data.doctorName,
          email: data.email,
          role: 'doctor',
          phone: data.phone,
          organization: data.hospitalName,
          registrationNo: data.registrationNumber,
          avatar: data.profilePhoto || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
          verified: false, // Verification pending
          createdAt: nowIso.split('T')[0],
          city: data.city,
          state: data.state,
          status: 'Active'
        };

        setUser(newUser);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    // Demo Local Registration
    const newUser: User = {
      id: `usr-${docId}`,
      name: data.doctorName,
      email: data.email,
      role: 'doctor',
      phone: data.phone,
      organization: data.hospitalName,
      registrationNo: data.registrationNumber,
      avatar: data.profilePhoto || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
      verified: false,
      createdAt: nowIso.split('T')[0],
      city: data.city,
      state: data.state,
      status: 'Active'
    };
    setUser(newUser);
    return { success: true };
  };

  // Pharmacy Registration (Verification Status Defaults to 'Pending')
  const registerPharmacy = async (data: PharmacyRegistrationData): Promise<{ success: boolean; error?: string }> => {
    const pharmId = `pharm-${Date.now()}`;
    const nowIso = new Date().toISOString();

    if (isSupabaseConfigured) {
      try {
        const { data: authData, error: authErr } = await supabase.auth.signUp({
          email: data.email,
          password: data.password || 'Password123!',
          options: {
            data: {
              full_name: data.pharmacyName,
              role: 'pharmacy',
              phone: data.phone
            }
          }
        });

        if (authErr) return { success: false, error: authErr.message };

        const userId = authData.user?.id || `usr-${pharmId}`;

        await SupabaseDB.upsertProfile({
          id: userId,
          email: data.email,
          full_name: data.pharmacyName,
          phone: data.phone,
          role: 'pharmacy',
          address: data.address,
          state: data.state,
          district: data.district,
          city: data.city,
          pincode: data.pincode,
          avatar_url: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=200',
          created_at: nowIso,
          status: 'Active'
        });

        await SupabaseDB.createPharmacy({
          user_id: userId,
          name: data.pharmacyName,
          owner_name: data.ownerName,
          email: data.email,
          phone: data.phone,
          drug_license_number: data.drugLicenseNumber,
          gst_number: data.gstNumber,
          address: data.address,
          state: data.state,
          district: data.district,
          city: data.city,
          pincode: data.pincode,
          delivery_radius_km: Number(data.deliveryRadiusKm),
          working_hours: data.workingHours,
          pharmacy_license: data.pharmacyLicense,
          verification_status: 'Pending', // ADMIN APPROVAL REQUIRED
          subscription_plan: 'Free',
          ad_booster: false,
          open_24x7: false,
          rating: 5.0
        });

        const newUser: User = {
          id: userId,
          name: data.pharmacyName,
          email: data.email,
          role: 'pharmacy',
          phone: data.phone,
          registrationNo: data.drugLicenseNumber,
          avatar: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=200',
          verified: false, // Pending admin approval
          createdAt: nowIso.split('T')[0],
          city: data.city,
          state: data.state,
          status: 'Active'
        };

        setUser(newUser);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    const newUser: User = {
      id: `usr-${pharmId}`,
      name: data.pharmacyName,
      email: data.email,
      role: 'pharmacy',
      phone: data.phone,
      registrationNo: data.drugLicenseNumber,
      avatar: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=200',
      verified: false,
      createdAt: nowIso.split('T')[0],
      city: data.city,
      state: data.state,
      status: 'Active'
    };
    setUser(newUser);
    return { success: true };
  };

  // Generic onboarding fallback
  const registerGeneric = async (role: UserRole, name: string, email: string, details?: Record<string, any>) => {
    if (role === 'patient') {
      return registerPatient({
        fullName: name,
        email,
        phone: details?.phone || '+91 98765 00000',
        age: Number(details?.age) || 30,
        gender: details?.gender || 'Male',
        address: details?.address || '123 Main Street',
        state: details?.state || 'Andhra Pradesh',
        district: details?.district || 'Tirupati',
        city: details?.city || 'Tirupati',
        pincode: details?.pincode || '517501',
        preferredLanguage: details?.preferredLanguage || 'en',
        emergencyContact: details?.emergencyContact || '+91 98765 99999'
      });
    } else if (role === 'doctor') {
      return registerDoctor({
        doctorName: name,
        email,
        phone: details?.phone || '+91 98765 11111',
        registrationNumber: details?.registrationNo || `REG-${Date.now().toString().slice(-6)}`,
        qualification: details?.qualification || 'MBBS, MD',
        specialization: details?.specialty || 'General Physician',
        experienceYears: Number(details?.experienceYears) || 5,
        hospitalName: details?.organization || details?.hospitalName || 'MediTrust Hospital',
        clinicAddress: details?.address || 'Clinic Road',
        state: details?.state || 'Andhra Pradesh',
        district: details?.district || 'Tirupati',
        city: details?.city || 'Tirupati',
        pincode: details?.pincode || '517501',
        workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        workingHours: '09:00 AM - 05:00 PM',
        offlineFee: Number(details?.consultationFee) || 500
      });
    } else if (role === 'pharmacy') {
      return registerPharmacy({
        pharmacyName: name,
        ownerName: details?.ownerName || name,
        email,
        phone: details?.phone || '+91 98765 22222',
        drugLicenseNumber: details?.registrationNo || `DL-${Date.now().toString().slice(-6)}`,
        address: details?.address || 'Pharmacy Street',
        state: details?.state || 'Andhra Pradesh',
        district: details?.district || 'Tirupati',
        city: details?.city || 'Tirupati',
        pincode: details?.pincode || '517501',
        deliveryRadiusKm: 10,
        workingHours: '08:00 AM - 10:00 PM'
      });
    } else if (role === 'admin') {
      if (!user || user.role !== 'admin') {
        return {
          success: false,
          error: 'Restricted Access: Admin accounts cannot be registered publicly. Only an existing Super-Admin can grant credentials or add team collaborators from the Admin Panel.'
        };
      }
      const newUser: User = {
        id: `usr-admin-${Date.now().toString().slice(-4)}`,
        name,
        email,
        role: 'admin',
        verified: true,
        createdAt: new Date().toISOString().split('T')[0],
        organization: 'Medynex Solutions LLP'
      };
      setUser(newUser);
      return { success: true };
    } else {
      const newUser: User = {
        id: `usr-${role}-${Date.now().toString().slice(-4)}`,
        name,
        email,
        role,
        verified: true,
        createdAt: new Date().toISOString().split('T')[0],
        organization: details?.organization || 'MediTrust Network',
        registrationNo: details?.registrationNo || `REG-${Math.floor(100000 + Math.random() * 900000)}`
      };
      setUser(newUser);
      return { success: true };
    }
  };

  const hasRole = (role: UserRole | UserRole[]) => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      authenticated: !!user,
      isLoading,
      login,
      loginWithPassword,
      loginWithGoogle,
      resetPassword,
      logout,
      registerPatient,
      registerDoctor,
      registerPharmacy,
      registerGeneric,
      hasRole,
      adminCollaborators,
      isMasterAdminConfigured,
      initializeMasterAdmin,
      addAdminCollaborator,
      updateAdminCollaboratorStatus,
      removeAdminCollaborator
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      authenticated: false,
      isLoading: false,
      login: async () => false,
      loginWithPassword: async () => ({ success: false, error: 'Auth context unavailable' }),
      loginWithGoogle: async () => {},
      resetPassword: async () => ({ success: false, error: 'Auth context unavailable' }),
      logout: async () => {},
      registerPatient: async () => ({ success: false, error: 'Auth context unavailable' }),
      registerDoctor: async () => ({ success: false, error: 'Auth context unavailable' }),
      registerPharmacy: async () => ({ success: false, error: 'Auth context unavailable' }),
      registerGeneric: async () => ({ success: false, error: 'Auth context unavailable' }),
      hasRole: () => false,
      adminCollaborators: DEFAULT_ADMIN_COLLABORATORS,
      isMasterAdminConfigured: true,
      initializeMasterAdmin: async () => ({ success: false, error: 'Auth context unavailable' }),
      addAdminCollaborator: async () => ({ success: false, error: 'Auth context unavailable' }),
      updateAdminCollaboratorStatus: async () => ({ success: false, error: 'Auth context unavailable' }),
      removeAdminCollaborator: async () => ({ success: false, error: 'Auth context unavailable' })
    };
  }
  return context;
};
