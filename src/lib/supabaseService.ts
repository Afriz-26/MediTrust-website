import { supabase, isSupabaseConfigured } from './supabase';
import { Doctor, Pharmacy, Hospital, Laboratory, Appointment, PharmacyOrder, UserRole, User } from '../types';

export interface DbUser {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  age?: number;
  gender?: string;
  address?: string;
  state?: string;
  district?: string;
  city?: string;
  pincode?: string;
  preferred_language?: string;
  emergency_contact?: string;
  avatar_url?: string;
  created_at: string;
  last_login?: string;
  status?: 'Active' | 'Suspended';
}

export interface DbDoctor {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  phone?: string;
  registration_number: string;
  qualification: string;
  specialization: string;
  experience_years: number;
  hospital_name: string;
  clinic_name?: string;
  clinic_address: string;
  state?: string;
  district?: string;
  city: string;
  pincode?: string;
  working_days: string[];
  working_hours: string;
  offline_fee: number;
  profile_photo?: string;
  medical_license?: string;
  verification_status: 'Pending' | 'Active' | 'Rejected';
  subscription_plan: 'Free' | 'Silver' | 'Gold' | 'Platinum';
  ad_booster: boolean;
  rating: number;
  review_count: number;
  created_at: string;
}

export interface DbPharmacy {
  id: string;
  user_id?: string;
  name: string;
  owner_name: string;
  email: string;
  phone: string;
  drug_license_number: string;
  gst_number?: string;
  address: string;
  state?: string;
  district?: string;
  city: string;
  pincode?: string;
  delivery_radius_km: number;
  working_hours: string;
  pharmacy_license?: string;
  verification_status: 'Pending' | 'Active' | 'Rejected';
  subscription_plan: 'Free' | 'Silver' | 'Gold' | 'Platinum';
  ad_booster: boolean;
  open_24x7: boolean;
  rating: number;
  created_at: string;
}

export interface DbAppointment {
  id: string;
  booking_id: string;
  token_number: string;
  patient_id?: string;
  doctor_id: string;
  patient_name: string;
  patient_phone: string;
  doctor_name: string;
  specialty: string;
  date: string;
  time_slot: string;
  reason: string;
  status: 'Pending' | 'Confirmed' | 'Rejected' | 'Completed' | 'Cancelled';
  offline_fee: number;
  created_at: string;
}

export interface DbMedicineOrder {
  id: string;
  order_number: string;
  patient_id?: string;
  pharmacy_id: string;
  patient_name: string;
  patient_phone: string;
  delivery_address: string;
  items: string; // JSON string or text summary
  total_amount: number;
  prescription_url?: string;
  status: 'Pending' | 'Accepted' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Rejected';
  payment_status: 'Pending' | 'Paid' | 'Cash on Delivery';
  created_at: string;
}

export interface DbInventoryItem {
  id: string;
  pharmacy_id: string;
  name: string;
  category: string;
  price: number;
  stock_quantity: number;
  is_out_of_stock: boolean;
  created_at: string;
}

export interface DbSubscription {
  id: string;
  user_id: string;
  user_role: UserRole;
  plan_type: 'Silver' | 'Gold' | 'Platinum';
  amount: number;
  status: 'Active' | 'Expired';
  expiry_date: string;
  created_at: string;
}

export interface DbAdBooster {
  id: string;
  user_id: string;
  user_role: UserRole;
  target_city: string;
  amount: number;
  status: 'Active' | 'Expired';
  expiry_date: string;
  created_at: string;
}

// Supabase DB API Helper Functions
export const SupabaseDB = {
  // --- USERS & PROFILES ---
  async fetchProfile(userId: string): Promise<DbUser | null> {
    if (!isSupabaseConfigured || !userId) return null;
    try {
      let { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
      if (error && (error.code === '42P01' || error.message?.includes('profiles'))) {
        const fallbackRes = await supabase.from('users').select('*').eq('id', userId).maybeSingle();
        data = fallbackRes.data;
        error = fallbackRes.error;
      }
      if (error || !data) return null;
      return {
        ...data,
        avatar_url: data.avatar_url || data.avatar || data.photo_url || ''
      };
    } catch (e) {
      return null;
    }
  },

  async fetchUsers(): Promise<DbUser[]> {
    if (!isSupabaseConfigured) return [];
    try {
      let { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (error && (error.code === '42P01' || error.message?.includes('profiles'))) {
        // Fallback to 'users' table if 'profiles' does not exist
        const fallbackRes = await supabase.from('users').select('*').order('created_at', { ascending: false });
        data = fallbackRes.data;
        error = fallbackRes.error;
      }
      if (error) {
        console.warn('Supabase fetchUsers warning:', error.message);
        return [];
      }
      return (data || []).map((u: any) => ({
        ...u,
        avatar_url: u.avatar_url || u.avatar || u.photo_url || ''
      }));
    } catch (e) {
      console.warn('Supabase fetchUsers exception:', e);
      return [];
    }
  },

  async upsertProfile(profile: Partial<DbUser>): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      let currentPayload: Record<string, any> = { ...profile };
      let targetTable = 'profiles';

      for (let attempt = 0; attempt < 6; attempt++) {
        const { error } = await supabase.from(targetTable).upsert(currentPayload);
        if (!error) return true;

        // Missing column error code (PGRST204: Could not find the 'xyz' column of 'profiles' in the schema cache)
        if (error.code === 'PGRST204' || error.message?.includes('schema cache') || error.message?.includes('column')) {
          const match = error.message?.match(/Could not find the '([^']+)' column/i);
          if (match && match[1] && match[1] in currentPayload) {
            delete currentPayload[match[1]];
            continue;
          }

          // Strip specific known optional fields if avatar_url is failing
          if ('avatar_url' in currentPayload) {
            delete currentPayload['avatar_url'];
            continue;
          }

          // Strip other non-critical profile fields one by one
          const optionalCols = [
            'preferred_language', 
            'emergency_contact', 
            'district', 
            'pincode', 
            'address', 
            'age', 
            'gender', 
            'city', 
            'state', 
            'last_login', 
            'status'
          ];
          const foundCol = optionalCols.find(col => col in currentPayload);
          if (foundCol) {
            delete currentPayload[foundCol];
            continue;
          }
        }

        // If 'profiles' table itself is not found, try fallback to 'users' table
        if (targetTable === 'profiles' && (error.code === '42P01' || error.message?.includes('profiles') || error.message?.includes('schema cache'))) {
          targetTable = 'users';
          currentPayload = { ...profile };
          continue;
        }

        console.warn('Supabase upsertProfile notice (non-fatal sync):', error.message || error);
        return false;
      }
      return false;
    } catch (e) {
      console.warn('Supabase upsertProfile handled safely:', e);
      return false;
    }
  },

  async updateUserStatus(userId: string, status: 'Active' | 'Suspended'): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      let { error } = await supabase.from('profiles').update({ status }).eq('id', userId);
      if (error && (error.code === '42P01' || error.message?.includes('profiles'))) {
        const fallbackRes = await supabase.from('users').update({ status }).eq('id', userId);
        error = fallbackRes.error;
      }
      return !error;
    } catch (e) {
      return false;
    }
  },

  async deleteUser(userId: string): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      let { error } = await supabase.from('profiles').delete().eq('id', userId);
      if (error && (error.code === '42P01' || error.message?.includes('profiles'))) {
        const fallbackRes = await supabase.from('users').delete().eq('id', userId);
        error = fallbackRes.error;
      }
      return !error;
    } catch (e) {
      return false;
    }
  },

  // --- DOCTORS ---
  async fetchDoctors(): Promise<DbDoctor[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase.from('doctors').select('*').order('created_at', { ascending: false });
      if (error) return [];
      return data || [];
    } catch (e) {
      return [];
    }
  },

  async createDoctor(doc: Omit<DbDoctor, 'id' | 'created_at'>): Promise<DbDoctor | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase.from('doctors').insert([doc]).select().single();
      if (error) console.error('createDoctor error:', error);
      return data || null;
    } catch (e) {
      return null;
    }
  },

  async updateDoctorVerification(doctorId: string, status: 'Pending' | 'Active' | 'Rejected'): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('doctors').update({ verification_status: status }).eq('id', doctorId);
      return !error;
    } catch (e) {
      return false;
    }
  },

  async updateDoctorProfile(doctorId: string, updates: Partial<DbDoctor>): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('doctors').update(updates).eq('id', doctorId);
      return !error;
    } catch (e) {
      return false;
    }
  },

  // --- PHARMACIES ---
  async fetchPharmacies(): Promise<DbPharmacy[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase.from('pharmacies').select('*').order('created_at', { ascending: false });
      if (error) return [];
      return data || [];
    } catch (e) {
      return [];
    }
  },

  async createPharmacy(pharm: Omit<DbPharmacy, 'id' | 'created_at'>): Promise<DbPharmacy | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase.from('pharmacies').insert([pharm]).select().single();
      if (error) console.error('createPharmacy error:', error);
      return data || null;
    } catch (e) {
      return null;
    }
  },

  async updatePharmacyVerification(pharmacyId: string, status: 'Pending' | 'Active' | 'Rejected'): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('pharmacies').update({ verification_status: status }).eq('id', pharmacyId);
      return !error;
    } catch (e) {
      return false;
    }
  },

  async updatePharmacyProfile(pharmacyId: string, updates: Partial<DbPharmacy>): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('pharmacies').update(updates).eq('id', pharmacyId);
      return !error;
    } catch (e) {
      return false;
    }
  },

  // --- APPOINTMENTS ---
  async fetchAppointments(): Promise<DbAppointment[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
      if (error) return [];
      return data || [];
    } catch (e) {
      return [];
    }
  },

  async createAppointment(appt: Omit<DbAppointment, 'id' | 'created_at'>): Promise<DbAppointment | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase.from('appointments').insert([appt]).select().single();
      if (error) console.error('createAppointment error:', error);
      return data || null;
    } catch (e) {
      return null;
    }
  },

  async updateAppointmentStatus(appointmentId: string, status: DbAppointment['status']): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('appointments').update({ status }).eq('id', appointmentId);
      return !error;
    } catch (e) {
      return false;
    }
  },

  // --- MEDICINE ORDERS ---
  async fetchMedicineOrders(): Promise<DbMedicineOrder[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase.from('medicine_orders').select('*').order('created_at', { ascending: false });
      if (error) return [];
      return data || [];
    } catch (e) {
      return [];
    }
  },

  async createMedicineOrder(order: Omit<DbMedicineOrder, 'id' | 'created_at'>): Promise<DbMedicineOrder | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase.from('medicine_orders').insert([order]).select().single();
      if (error) console.error('createMedicineOrder error:', error);
      return data || null;
    } catch (e) {
      return null;
    }
  },

  async updateMedicineOrderStatus(orderId: string, status: DbMedicineOrder['status']): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('medicine_orders').update({ status }).eq('id', orderId);
      return !error;
    } catch (e) {
      return false;
    }
  },

  // --- INVENTORY ---
  async fetchInventory(pharmacyId: string): Promise<DbInventoryItem[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase.from('medicines_inventory').select('*').eq('pharmacy_id', pharmacyId);
      if (error) return [];
      return data || [];
    } catch (e) {
      return [];
    }
  },

  async addInventoryItem(item: Omit<DbInventoryItem, 'id' | 'created_at'>): Promise<DbInventoryItem | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase.from('medicines_inventory').insert([item]).select().single();
      return data || null;
    } catch (e) {
      return null;
    }
  },

  async updateInventoryItem(itemId: string, updates: Partial<DbInventoryItem>): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('medicines_inventory').update(updates).eq('id', itemId);
      return !error;
    } catch (e) {
      return false;
    }
  },

  async deleteInventoryItem(itemId: string): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('medicines_inventory').delete().eq('id', itemId);
      return !error;
    } catch (e) {
      return false;
    }
  },

  // --- SUBSCRIPTIONS & AD BOOSTERS ---
  async fetchSubscriptions(): Promise<DbSubscription[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase.from('subscriptions').select('*').order('created_at', { ascending: false });
      if (error) return [];
      return data || [];
    } catch (e) {
      return [];
    }
  },

  async createSubscription(sub: Omit<DbSubscription, 'id' | 'created_at'>): Promise<DbSubscription | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase.from('subscriptions').insert([sub]).select().single();
      return data || null;
    } catch (e) {
      return null;
    }
  },

  async fetchAdBoosters(): Promise<DbAdBooster[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase.from('ad_boosters').select('*').order('created_at', { ascending: false });
      if (error) return [];
      return data || [];
    } catch (e) {
      return [];
    }
  },

  async createAdBooster(booster: Omit<DbAdBooster, 'id' | 'created_at'>): Promise<DbAdBooster | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase.from('ad_boosters').insert([booster]).select().single();
      return data || null;
    } catch (e) {
      return null;
    }
  },

  // --- REALTIME SUBSCRIPTIONS ---
  subscribeToChanges(table: string, callback: () => void) {
    if (!isSupabaseConfigured) return () => {};
    const channel = supabase
      .channel(`public:${table}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, () => {
        callback();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
};
