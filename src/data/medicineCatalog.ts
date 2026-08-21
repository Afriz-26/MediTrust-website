export interface MedicineItem {
  id: string;
  name: string;
  brandName: string;
  genericName: string;
  composition: string;
  dosageForm: 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Ointment' | 'Inhaler' | 'Drops';
  strength: string;
  manufacturer: string;
  category: 'Analgesics & Pain' | 'Antibiotics' | 'Cardiology & BP' | 'Diabetes Care' | 'Gastrointestinal' | 'Respiratory & Cold' | 'Dermatology' | 'Vitamins & Supplements';
  prescriptionRequired: boolean;
  mrp: number;
  discountedPrice: number;
  packSize: string;
  description: string;
  sideEffects: string[];
  directions: string;
  availablePharmaciesCount: number;
}

export const MEDICINE_CATALOG: MedicineItem[] = [
  {
    id: 'med-01',
    name: 'Dolo 650 Tablet',
    brandName: 'Dolo 650',
    genericName: 'Paracetamol',
    composition: 'Paracetamol (650mg)',
    dosageForm: 'Tablet',
    strength: '650mg',
    manufacturer: 'Micro Labs Ltd',
    category: 'Analgesics & Pain',
    prescriptionRequired: false,
    mrp: 35,
    discountedPrice: 31,
    packSize: 'Strip of 15 tablets',
    description: 'Dolo 650 Tablet is an analgesic (pain reliever) and antipyretic (fever reducer) used to treat headache, toothache, body ache, fever, and common cold symptoms.',
    sideEffects: ['Nausea (rare)', 'Allergic skin reaction (very rare)'],
    directions: 'Take with a glass of water after food. Do not exceed 4 tablets in 24 hours without physician advice.',
    availablePharmaciesCount: 8
  },
  {
    id: 'med-02',
    name: 'Augmentin 625 Duo Tablet',
    brandName: 'Augmentin 625 Duo',
    genericName: 'Amoxicillin + Clavulanic Acid',
    composition: 'Amoxicillin (500mg) + Clavulanic Acid (125mg)',
    dosageForm: 'Tablet',
    strength: '625mg',
    manufacturer: 'GlaxoSmithKline Pharmaceuticals Ltd',
    category: 'Antibiotics',
    prescriptionRequired: true,
    mrp: 220,
    discountedPrice: 198,
    packSize: 'Strip of 10 tablets',
    description: 'Augmentin 625 Duo is a broad-spectrum penicillin-type antibiotic that helps your body fight infections caused by bacteria in the lungs, ear, nasal sinus, urinary tract, and skin.',
    sideEffects: ['Mild diarrhea', 'Nausea', 'Vomiting'],
    directions: 'Take with a meal to prevent stomach upset. Complete full prescribed course even if symptoms resolve.',
    availablePharmaciesCount: 6
  },
  {
    id: 'med-03',
    name: 'Telma 40 Tablet',
    brandName: 'Telma 40',
    genericName: 'Telmisartan',
    composition: 'Telmisartan (40mg)',
    dosageForm: 'Tablet',
    strength: '40mg',
    manufacturer: 'Glenmark Pharmaceuticals Ltd',
    category: 'Cardiology & BP',
    prescriptionRequired: true,
    mrp: 145,
    discountedPrice: 128,
    packSize: 'Strip of 15 tablets',
    description: 'Telma 40 is an angiotensin receptor blocker (ARB) widely prescribed to lower high blood pressure (hypertension) and reduce the risk of stroke and myocardial infarction.',
    sideEffects: ['Dizziness upon standing', 'Back pain', 'Sinus inflammation'],
    directions: 'Take once daily at the same time each day, with or without food.',
    availablePharmaciesCount: 7
  },
  {
    id: 'med-04',
    name: 'Glycomet-GP 1 Forte Tablet',
    brandName: 'Glycomet-GP 1 Forte',
    genericName: 'Glimepiride + Metformin',
    composition: 'Glimepiride (1mg) + Metformin Hydrochloride (1000mg)',
    dosageForm: 'Tablet',
    strength: '1mg / 1000mg',
    manufacturer: 'USV Ltd',
    category: 'Diabetes Care',
    prescriptionRequired: true,
    mrp: 130,
    discountedPrice: 114,
    packSize: 'Strip of 15 tablets',
    description: 'A combination anti-diabetic medicine used in adults with type 2 diabetes mellitus when diet, exercise, and single agents alone do not provide adequate glycemic control.',
    sideEffects: ['Hypoglycemia (low blood sugar)', 'Flatulence', 'Metallic taste'],
    directions: 'Take with breakfast or the first main meal of the day.',
    availablePharmaciesCount: 5
  },
  {
    id: 'med-05',
    name: 'Pan-D Capsule',
    brandName: 'Pan-D',
    genericName: 'Pantoprazole + Domperidone',
    composition: 'Pantoprazole (40mg) + Domperidone (30mg)',
    dosageForm: 'Capsule',
    strength: '40mg / 30mg',
    manufacturer: 'Alkem Laboratories Ltd',
    category: 'Gastrointestinal',
    prescriptionRequired: true,
    mrp: 195,
    discountedPrice: 172,
    packSize: 'Strip of 15 capsules',
    description: 'Prescribed for the treatment of gastroesophageal reflux disease (GERD), hyperacidity, peptic ulcer disease, and nausea associated with acid reflux.',
    sideEffects: ['Dry mouth', 'Diarrhea', 'Mild headache'],
    directions: 'Take in the morning on an empty stomach, at least 30 to 60 minutes before breakfast.',
    availablePharmaciesCount: 9
  },
  {
    id: 'med-06',
    name: 'Azithral 500 Tablet',
    brandName: 'Azithral 500',
    genericName: 'Azithromycin',
    composition: 'Azithromycin (500mg)',
    dosageForm: 'Tablet',
    strength: '500mg',
    manufacturer: 'Alembic Pharmaceuticals Ltd',
    category: 'Antibiotics',
    prescriptionRequired: true,
    mrp: 135,
    discountedPrice: 120,
    packSize: 'Strip of 5 tablets',
    description: 'A macrolide antibiotic indicated for respiratory tract infections, tonsillitis, pharyngitis, skin infections, and certain sexually transmitted infections.',
    sideEffects: ['Abdominal pain', 'Loose stools', 'Nausea'],
    directions: 'Take once daily either 1 hour before or 2 hours after meals.',
    availablePharmaciesCount: 7
  },
  {
    id: 'med-07',
    name: 'Montair-LC Tablet',
    brandName: 'Montair-LC',
    genericName: 'Montelukast + Levocetirizine',
    composition: 'Montelukast (10mg) + Levocetirizine Dihydrochloride (5mg)',
    dosageForm: 'Tablet',
    strength: '10mg / 5mg',
    manufacturer: 'Cipla Ltd',
    category: 'Respiratory & Cold',
    prescriptionRequired: true,
    mrp: 230,
    discountedPrice: 205,
    packSize: 'Strip of 10 tablets',
    description: 'Dual-action medication for allergic rhinitis, seasonal allergies, persistent sneezing, runny nose, and bronchial asthma maintenance.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Headache'],
    directions: 'Best taken at bedtime due to mild sedative properties.',
    availablePharmaciesCount: 8
  },
  {
    id: 'med-08',
    name: 'Becosules Z Capsule',
    brandName: 'Becosules Z',
    genericName: 'B-Complex + Vitamin C + Zinc',
    composition: 'Vitamin B-Complex, Vitamin C (50mg), Zinc Sulphate Monohydrate (41.4mg)',
    dosageForm: 'Capsule',
    strength: 'Multi-vitamin',
    manufacturer: 'Pfizer Ltd',
    category: 'Vitamins & Supplements',
    prescriptionRequired: false,
    mrp: 54,
    discountedPrice: 48,
    packSize: 'Strip of 20 capsules',
    description: 'Essential nutritional supplement providing comprehensive Vitamin B-Complex, Vitamin C, and Zinc for oral ulcers, immunity, and post-illness recovery.',
    sideEffects: ['Bright yellow urine (normal harmless effect of riboflavin)'],
    directions: 'Take 1 capsule daily after a meal.',
    availablePharmaciesCount: 10
  }
];
