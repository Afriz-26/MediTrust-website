export interface DoctorSearchResult {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experienceYears: number;
  hospitalName: string;
  location: string;
  rating: number;
  consultationFee: number;
  availableOnline: boolean;
  nextAvailable: string;
}

export const DOCTORS_DATABASE: DoctorSearchResult[] = [
  {
    id: 'doc-1',
    name: 'Dr. Suresh Babu',
    specialty: 'Cardiology',
    qualification: 'MD, DM (Cardiology), SVIMS',
    experienceYears: 16,
    hospitalName: 'SVIMS Super Specialty Hospital',
    location: 'Alipiri Road, Tirupati, Andhra Pradesh',
    rating: 4.9,
    consultationFee: 700,
    availableOnline: true,
    nextAvailable: 'Today, 03:00 PM'
  },
  {
    id: 'doc-2',
    name: 'Dr. K. Radhika Rao',
    specialty: 'Dermatology',
    qualification: 'MD (Dermatology, Venereology & Leprosy)',
    experienceYears: 12,
    hospitalName: 'MediTrust Skin & Laser Clinic',
    location: 'MR Palli, Tirupati, Andhra Pradesh',
    rating: 4.8,
    consultationFee: 600,
    availableOnline: true,
    nextAvailable: 'Tomorrow, 10:30 AM'
  },
  {
    id: 'doc-3',
    name: 'Dr. Ananya Sharma',
    specialty: 'Cardiology',
    qualification: 'MD, DM (Cardiology), AIIMS New Delhi',
    experienceYears: 14,
    hospitalName: 'MediTrust Heart Institute',
    location: 'Banjara Hills, Hyderabad, Telangana',
    rating: 4.95,
    consultationFee: 800,
    availableOnline: true,
    nextAvailable: 'Today, 04:30 PM'
  },
  {
    id: 'doc-4',
    name: 'Dr. Rajesh Nair',
    specialty: 'Neurology',
    qualification: 'MBBS, DNB (Neurology), FRCP London',
    experienceYears: 18,
    hospitalName: 'Medynex Neuro Care',
    location: 'Indiranagar, Bengaluru, Karnataka',
    rating: 4.88,
    consultationFee: 1000,
    availableOnline: true,
    nextAvailable: 'Tomorrow, 11:00 AM'
  },
  {
    id: 'doc-5',
    name: 'Dr. Priya Venkatesh',
    specialty: 'Pediatrics',
    qualification: 'MD (Pediatrics), DCH',
    experienceYears: 10,
    hospitalName: 'MediTrust Child Care Hospital',
    location: 'Adyar, Chennai, Tamil Nadu',
    rating: 4.92,
    consultationFee: 600,
    availableOnline: true,
    nextAvailable: 'Today, 05:00 PM'
  }
];

export class DoctorSearchService {
  public static searchDoctors(query: string, location?: string): DoctorSearchResult[] {
    const q = query.toLowerCase().trim();
    const loc = location ? location.toLowerCase().trim() : '';

    return DOCTORS_DATABASE.filter(d => {
      const matchSpecialty = d.specialty.toLowerCase().includes(q) || d.name.toLowerCase().includes(q) || q.includes(d.specialty.toLowerCase());
      const matchLoc = !loc || d.location.toLowerCase().includes(loc) || d.hospitalName.toLowerCase().includes(loc);
      return matchSpecialty && matchLoc;
    });
  }
}
