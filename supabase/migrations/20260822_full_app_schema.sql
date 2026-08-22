-- ============================================================================
-- MediTrust Healthcare Platform — Full Application Schema
-- Creates every table the app queries via src/lib/supabaseService.ts:
--   profiles, users, doctors, pharmacies, appointments, medicine_orders,
--   medicines_inventory, subscriptions, ad_boosters
-- Enables Row Level Security on every table and adds ownership policies so
-- patients only access their own records and doctors/pharmacies manage their own.
-- Safe to run repeatedly (idempotent).
-- ----------------------------------------------------------------------------
-- REQUIRED ENV for the app to reach these tables:
--   VITE_SUPABASE_URL  = https://ltecvwczfeizevoytrzf.supabase.co
--   VITE_SUPABASE_ANON_KEY = <anon key from Dashboard -> Settings -> API>
-- Run this file in: Dashboard -> SQL Editor -> New query -> Run
-- ============================================================================

-- 0. user_role enum
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('patient', 'doctor', 'pharmacy', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role public.user_role NOT NULL DEFAULT 'patient',
    age INTEGER,
    gender TEXT,
    address TEXT,
    state TEXT,
    district TEXT,
    city TEXT,
    pincode TEXT,
    preferred_language TEXT DEFAULT 'en',
    emergency_contact TEXT,
    avatar_url TEXT,
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Suspended')),
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. users (legacy/fallback)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role public.user_role NOT NULL DEFAULT 'patient',
    age INTEGER,
    gender TEXT,
    address TEXT,
    state TEXT,
    district TEXT,
    city TEXT,
    pincode TEXT,
    preferred_language TEXT DEFAULT 'en',
    emergency_contact TEXT,
    avatar_url TEXT,
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Suspended')),
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. doctors
CREATE TABLE IF NOT EXISTS public.doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    registration_number TEXT,
    qualification TEXT,
    specialization TEXT,
    experience_years INTEGER DEFAULT 0,
    hospital_name TEXT,
    clinic_name TEXT,
    clinic_address TEXT,
    state TEXT,
    district TEXT,
    city TEXT,
    pincode TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    working_days TEXT[] DEFAULT '{}',
    working_hours TEXT,
    offline_fee NUMERIC(10,2) DEFAULT 0,
    profile_photo TEXT,
    medical_license TEXT,
    verification_status TEXT DEFAULT 'Pending' CHECK (verification_status IN ('Pending', 'Active', 'Rejected')),
    subscription_plan TEXT DEFAULT 'Free' CHECK (subscription_plan IN ('Free', 'Silver', 'Gold', 'Platinum')),
    ad_booster BOOLEAN DEFAULT false,
    rating NUMERIC(3,2) DEFAULT 5,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. pharmacies
CREATE TABLE IF NOT EXISTS public.pharmacies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    owner_name TEXT,
    email TEXT,
    phone TEXT,
    drug_license_number TEXT,
    gst_number TEXT,
    address TEXT,
    state TEXT,
    district TEXT,
    city TEXT,
    pincode TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    delivery_radius_km NUMERIC(6,2) DEFAULT 10,
    working_hours TEXT,
    pharmacy_license TEXT,
    verification_status TEXT DEFAULT 'Pending' CHECK (verification_status IN ('Pending', 'Active', 'Rejected')),
    subscription_plan TEXT DEFAULT 'Free' CHECK (subscription_plan IN ('Free', 'Silver', 'Gold', 'Platinum')),
    ad_booster BOOLEAN DEFAULT false,
    open_24x7 BOOLEAN DEFAULT false,
    rating NUMERIC(3,2) DEFAULT 5,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- 5. appointments
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id TEXT,
    token_number TEXT,
    patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE,
    patient_name TEXT,
    patient_phone TEXT,
    doctor_name TEXT,
    specialty TEXT,
    date TEXT,
    time_slot TEXT,
    reason TEXT,
    offline_fee NUMERIC(10,2) DEFAULT 0,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Rejected', 'Completed', 'Cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. medicine_orders
CREATE TABLE IF NOT EXISTS public.medicine_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT,
    patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    pharmacy_id UUID REFERENCES public.pharmacies(id) ON DELETE CASCADE,
    patient_name TEXT,
    patient_phone TEXT,
    delivery_address TEXT,
    items TEXT,
    total_amount NUMERIC(10,2) DEFAULT 0,
    prescription_url TEXT,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered', 'Rejected')),
    payment_status TEXT DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Paid', 'Cash on Delivery')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. medicines_inventory
CREATE TABLE IF NOT EXISTS public.medicines_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pharmacy_id UUID REFERENCES public.pharmacies(id) ON DELETE CASCADE,
    name TEXT,
    category TEXT,
    price NUMERIC(10,2) DEFAULT 0,
    stock_quantity INTEGER DEFAULT 0,
    is_out_of_stock BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_role public.user_role,
    plan_type TEXT CHECK (plan_type IN ('Silver', 'Gold', 'Platinum')),
    amount NUMERIC(10,2) DEFAULT 0,
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Expired')),
    expiry_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ad_boosters
CREATE TABLE IF NOT EXISTS public.ad_boosters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_role public.user_role,
    target_city TEXT,
    amount NUMERIC(10,2) DEFAULT 0,
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Expired')),
    expiry_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY — enable on EVERY table
-- ============================================================================
ALTER TABLE public.profiles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacies          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicine_orders     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicines_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_boosters         ENABLE ROW LEVEL SECURITY;

-- Helper: is the current user an admin?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
$$;

-- PROFILES & USERS — patients access ONLY their own row; admins see all
DROP POLICY IF EXISTS "profiles_select_own_or_admin" ON public.profiles;
CREATE POLICY "profiles_select_own_or_admin" ON public.profiles
    FOR SELECT TO authenticated
    USING (id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles
    FOR INSERT TO authenticated
    WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "profiles_update_own_or_admin" ON public.profiles;
CREATE POLICY "profiles_update_own_or_admin" ON public.profiles
    FOR UPDATE TO authenticated
    USING (id = auth.uid() OR public.is_admin())
    WITH CHECK (id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "users_select_own_or_admin" ON public.users;
CREATE POLICY "users_select_own_or_admin" ON public.users
    FOR SELECT TO authenticated
    USING (id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "users_insert_own" ON public.users;
CREATE POLICY "users_insert_own" ON public.users
    FOR INSERT TO authenticated
    WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "users_update_own_or_admin" ON public.users;
CREATE POLICY "users_update_own_or_admin" ON public.users
    FOR UPDATE TO authenticated
    USING (id = auth.uid() OR public.is_admin())
    WITH CHECK (id = auth.uid() OR public.is_admin());

-- DOCTORS — public can browse Active listings; a doctor manages ONLY their own row
DROP POLICY IF EXISTS "doctors_public_read" ON public.doctors;
CREATE POLICY "doctors_public_read" ON public.doctors
    FOR SELECT USING (
        verification_status = 'Active'
        OR user_id = auth.uid()
        OR public.is_admin()
    );

DROP POLICY IF EXISTS "doctors_owner_insert" ON public.doctors;
CREATE POLICY "doctors_owner_insert" ON public.doctors
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "doctors_owner_update" ON public.doctors;
CREATE POLICY "doctors_owner_update" ON public.doctors
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid() OR public.is_admin())
    WITH CHECK (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "doctors_owner_delete" ON public.doctors;
CREATE POLICY "doctors_owner_delete" ON public.doctors
    FOR DELETE TO authenticated
    USING (user_id = auth.uid() OR public.is_admin());

-- PHARMACIES — same pattern as doctors
DROP POLICY IF EXISTS "pharmacies_public_read" ON public.pharmacies;
CREATE POLICY "pharmacies_public_read" ON public.pharmacies
    FOR SELECT USING (
        verification_status = 'Active'
        OR user_id = auth.uid()
        OR public.is_admin()
    );

DROP POLICY IF EXISTS "pharmacies_owner_insert" ON public.pharmacies;
CREATE POLICY "pharmacies_owner_insert" ON public.pharmacies
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "pharmacies_owner_update" ON public.pharmacies;
CREATE POLICY "pharmacies_owner_update" ON public.pharmacies
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid() OR public.is_admin())
    WITH CHECK (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "pharmacies_owner_delete" ON public.pharmacies;
CREATE POLICY "pharmacies_owner_delete" ON public.pharmacies
    FOR DELETE TO authenticated
    USING (user_id = auth.uid() OR public.is_admin());

-- APPOINTMENTS — patient sees own bookings; the booked doctor sees theirs; only patient creates
DROP POLICY IF EXISTS "appointments_patient_or_doctor_read" ON public.appointments;
CREATE POLICY "appointments_patient_or_doctor_read" ON public.appointments
    FOR SELECT TO authenticated
    USING (
        patient_id = auth.uid()
        OR doctor_id IN (SELECT id FROM public.doctors WHERE user_id = auth.uid())
        OR public.is_admin()
    );

DROP POLICY IF EXISTS "appointments_patient_insert" ON public.appointments;
CREATE POLICY "appointments_patient_insert" ON public.appointments
    FOR INSERT TO authenticated
    WITH CHECK (patient_id = auth.uid());

DROP POLICY IF EXISTS "appointments_patient_or_doctor_update" ON public.appointments;
CREATE POLICY "appointments_patient_or_doctor_update" ON public.appointments
    FOR UPDATE TO authenticated
    USING (
        patient_id = auth.uid()
        OR doctor_id IN (SELECT id FROM public.doctors WHERE user_id = auth.uid())
        OR public.is_admin()
    )
    WITH CHECK (
        patient_id = auth.uid()
        OR doctor_id IN (SELECT id FROM public.doctors WHERE user_id = auth.uid())
        OR public.is_admin()
    );

DROP POLICY IF EXISTS "appointments_patient_cancel" ON public.appointments;
CREATE POLICY "appointments_patient_cancel" ON public.appointments
    FOR DELETE TO authenticated
    USING (patient_id = auth.uid() OR public.is_admin());

-- MEDICINE ORDERS — patient sees own orders; fulfilling pharmacy sees theirs; only patient places orders
DROP POLICY IF EXISTS "orders_patient_or_pharmacy_read" ON public.medicine_orders;
CREATE POLICY "orders_patient_or_pharmacy_read" ON public.medicine_orders
    FOR SELECT TO authenticated
    USING (
        patient_id = auth.uid()
        OR pharmacy_id IN (SELECT id FROM public.pharmacies WHERE user_id = auth.uid())
        OR public.is_admin()
    );

DROP POLICY IF EXISTS "orders_patient_insert" ON public.medicine_orders;
CREATE POLICY "orders_patient_insert" ON public.medicine_orders
    FOR INSERT TO authenticated
    WITH CHECK (patient_id = auth.uid());

DROP POLICY IF EXISTS "orders_patient_or_pharmacy_update" ON public.medicine_orders;
CREATE POLICY "orders_patient_or_pharmacy_update" ON public.medicine_orders
    FOR UPDATE TO authenticated
    USING (
        patient_id = auth.uid()
        OR pharmacy_id IN (SELECT id FROM public.pharmacies WHERE user_id = auth.uid())
        OR public.is_admin()
    )
    WITH CHECK (
        patient_id = auth.uid()
        OR pharmacy_id IN (SELECT id FROM public.pharmacies WHERE user_id = auth.uid())
        OR public.is_admin()
    );

-- MEDICINES INVENTORY — anyone can browse; owning pharmacy manages its stock
DROP POLICY IF EXISTS "inventory_public_read" ON public.medicines_inventory;
CREATE POLICY "inventory_public_read" ON public.medicines_inventory
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "inventory_pharmacy_write" ON public.medicines_inventory;
CREATE POLICY "inventory_pharmacy_write" ON public.medicines_inventory
    FOR ALL TO authenticated
    USING (
        pharmacy_id IN (SELECT id FROM public.pharmacies WHERE user_id = auth.uid())
        OR public.is_admin()
    )
    WITH CHECK (
        pharmacy_id IN (SELECT id FROM public.pharmacies WHERE user_id = auth.uid())
        OR public.is_admin()
    );

-- SUBSCRIPTIONS & AD BOOSTERS — owner-only, plus admins
DROP POLICY IF EXISTS "subscriptions_owner_read" ON public.subscriptions;
CREATE POLICY "subscriptions_owner_read" ON public.subscriptions
    FOR SELECT TO authenticated
    USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "subscriptions_owner_insert" ON public.subscriptions;
CREATE POLICY "subscriptions_owner_insert" ON public.subscriptions
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "subscriptions_owner_update" ON public.subscriptions;
CREATE POLICY "subscriptions_owner_update" ON public.subscriptions
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid() OR public.is_admin())
    WITH CHECK (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "ad_boosters_owner_read" ON public.ad_boosters;
CREATE POLICY "ad_boosters_owner_read" ON public.ad_boosters
    FOR SELECT TO authenticated
    USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "ad_boosters_owner_insert" ON public.ad_boosters;
CREATE POLICY "ad_boosters_owner_insert" ON public.ad_boosters
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "ad_boosters_owner_update" ON public.ad_boosters;
CREATE POLICY "ad_boosters_owner_update" ON public.ad_boosters
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid() OR public.is_admin())
    WITH CHECK (user_id = auth.uid() OR public.is_admin());

-- Performance indexes for geo lookups and ownership filters
CREATE INDEX IF NOT EXISTS idx_doctors_location     ON public.doctors (state, district, city);
CREATE INDEX IF NOT EXISTS idx_doctors_user         ON public.doctors (user_id);
CREATE INDEX IF NOT EXISTS idx_pharmacies_location  ON public.pharmacies (state, district, city);
CREATE INDEX IF NOT EXISTS idx_pharmacies_user      ON public.pharmacies (user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON public.appointments (patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor  ON public.appointments (doctor_id);
CREATE INDEX IF NOT EXISTS idx_orders_patient       ON public.medicine_orders (patient_id);
CREATE INDEX IF NOT EXISTS idx_orders_pharmacy      ON public.medicine_orders (pharmacy_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user   ON public.subscriptions (user_id);
CREATE INDEX IF NOT EXISTS idx_ad_boosters_user     ON public.ad_boosters (user_id);

-- Minimal privileges; RLS policies above are what actually gate every row
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
