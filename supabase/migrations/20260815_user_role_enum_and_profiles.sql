-- MediTrust Healthcare Platform: User Role Migration & Schema
-- Creates user_role enum type and ensures existing user records are properly typed.

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'pharmacy', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. Create or alter profiles and users table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'patient',
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

-- Ensure avatar_url column exists if table was created previously without it
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE IF EXISTS public.users ADD COLUMN IF NOT EXISTS avatar_url TEXT;

CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'patient',
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

-- 2. Safe migration for existing DB records if column was text previously
DO $$ BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = 'users' 
          AND column_name = 'role' 
          AND data_type = 'text'
    ) THEN
        ALTER TABLE public.users 
        ALTER COLUMN role TYPE user_role 
        USING (
            CASE 
                WHEN role ILIKE 'doctor%' THEN 'doctor'::user_role
                WHEN role ILIKE 'pharm%' THEN 'pharmacy'::user_role
                WHEN role ILIKE 'admin%' THEN 'admin'::user_role
                ELSE 'patient'::user_role
            END
        );
    END IF;
END $$;

-- 3. Row Level Security (RLS) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile or doctors/pharmacies can be queried"
    ON public.users
    FOR SELECT
    USING (auth.uid() = id OR role IN ('doctor', 'pharmacy'));

CREATE POLICY "Users can update own profile"
    ON public.users
    FOR UPDATE
    USING (auth.uid() = id);
