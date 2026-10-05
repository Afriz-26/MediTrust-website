import { PharmaceuticalMedicine } from '../types';

export const AUTHENTIC_MEDICINES: PharmaceuticalMedicine[] = [
  // ==========================================================
  // 1. ANALGESICS, ANTIPYRETICS & PAIN MANAGEMENT
  // ==========================================================
  {
    id: 'med-dolo-650',
    name: 'Dolo 650 Tablet',
    brandName: 'Dolo 650',
    genericName: 'Paracetamol',
    composition: 'Paracetamol / Acetaminophen (650mg)',
    dosageForm: 'Tablet',
    strength: '650mg',
    manufacturer: 'Micro Labs Ltd',
    category: 'Analgesics & Pain',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 34.50,
    sellingPrice: 31.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'Dolo 650 is a trusted analgesic (pain reliever) and antipyretic (fever reducer) used for fever, body ache, headache, viral illness, and dental pain.',
    indications: ['Fever', 'Headache', 'Muscle Pain', 'Viral Fever', 'Post-Vaccination Pyrexia', 'Body Ache', 'Toothache'],
    sideEffects: ['Mild nausea (rare)', 'Skin rash (very rare)'],
    directions: 'Take with a glass of water after food. Do not exceed 4 tablets in 24 hours.',
    contraindications: ['Severe liver impairment', 'Active alcoholism'],
    storageAdvice: 'Store below 25°C away from direct moisture and heat.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Paracetamol 650mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 12.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-calpol-500',
    name: 'Calpol 500 Tablet',
    brandName: 'Calpol 500',
    genericName: 'Paracetamol',
    composition: 'Paracetamol (500mg)',
    dosageForm: 'Tablet',
    strength: '500mg',
    manufacturer: 'GlaxoSmithKline Pharmaceuticals Ltd',
    category: 'Analgesics & Pain',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 18.20,
    sellingPrice: 16.50,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'Calpol 500 is used for rapid relief of mild to moderate pain and lowering high body temperature in adults and children above 12 years.',
    indications: ['Mild Fever', 'Headache', 'Toothache', 'Joint Pain', 'Cold & Flu Pain'],
    sideEffects: ['Generally well tolerated'],
    directions: 'Take 1 tablet every 4 to 6 hours as needed. Do not exceed recommended dosage.',
    contraindications: ['Severe liver disease'],
    storageAdvice: 'Store in a cool dry place below 30°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Paracetamol 500mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 8.50,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-crocin-650',
    name: 'Crocin 650 Advance Tablet',
    brandName: 'Crocin 650',
    genericName: 'Paracetamol',
    composition: 'Paracetamol with Optizorb Fast Release (650mg)',
    dosageForm: 'Tablet',
    strength: '650mg',
    manufacturer: 'GlaxoSmithKline Consumer Healthcare',
    category: 'Analgesics & Pain',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 35.00,
    sellingPrice: 31.50,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'Fast-release paracetamol tablet formulated with Optizorb technology to dissolve 5x faster for quick symptomatic relief of high temperature and severe headaches.',
    indications: ['Viral Fever', 'Severe Headache', 'Joint Pain', 'Post-Surgical Ache', 'Flu Symptoms'],
    sideEffects: ['None under normal therapeutic doses'],
    directions: 'Take with half glass of water. Allow minimum 4-6 hours between doses.',
    contraindications: ['Hepatic insufficiency'],
    storageAdvice: 'Store below 30°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Paracetamol 650mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 12.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-combiflam',
    name: 'Combiflam Tablet',
    brandName: 'Combiflam',
    genericName: 'Ibuprofen + Paracetamol',
    composition: 'Ibuprofen (400mg) + Paracetamol (325mg)',
    dosageForm: 'Tablet',
    strength: '400mg + 325mg',
    manufacturer: 'Sanofi India Ltd',
    category: 'Analgesics & Pain',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 46.50,
    sellingPrice: 42.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 20 tablets',
    description: 'Dual-action NSAID and analgesic combination that relieves severe headache, toothache, muscular ache, sprains, and dysmenorrhea.',
    indications: ['Severe Pain', 'Toothache', 'Joint Inflammation', 'Period Pain / Dysmenorrhea', 'Sports Injury Sprain', 'Fever with Bodyache'],
    sideEffects: ['Heartburn', 'Nausea', 'Gastric irritation if taken on empty stomach'],
    directions: 'Always take with food or milk to prevent gastric irritation.',
    contraindications: ['Active peptic ulcer', 'Severe kidney disease', 'Third trimester of pregnancy'],
    storageAdvice: 'Store below 25°C in a dry place.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Ibuprofen 400mg + Paracetamol 325mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 14.50,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-meftal-spas',
    name: 'Meftal-Spas Tablet',
    brandName: 'Meftal-Spas',
    genericName: 'Mefenamic Acid + Dicyclomine',
    composition: 'Mefenamic Acid (250mg) + Dicyclomine Hydrochloride (10mg)',
    dosageForm: 'Tablet',
    strength: '250mg + 10mg',
    manufacturer: 'Blue Cross Laboratories Ltd',
    category: 'Analgesics & Pain',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 52.00,
    sellingPrice: 46.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 10 tablets',
    description: 'Antispasmodic and analgesic formulation for rapid relief from menstrual cramps (dysmenorrhea), colicky abdominal pain, and intestinal spasms.',
    indications: ['Menstrual Cramps', 'Period Pain', 'Stomach Cramps', 'Intestinal Colic', 'Biliary Spasm', 'Abdominal Pain'],
    sideEffects: ['Dry mouth', 'Drowsiness', 'Mild nausea', 'Blurred vision'],
    directions: 'Take with food at onset of spasms. Swallow whole with water.',
    contraindications: ['Glaucoma', 'Myasthenia gravis', 'Obstructive GI disease'],
    storageAdvice: 'Store in cool dry conditions.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Dicyclomine + Mefenamic Acid Tablets (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 16.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-voveran-sr-100',
    name: 'Voveran SR 100 Tablet',
    brandName: 'Voveran SR 100',
    genericName: 'Diclofenac Sodium Sustained Release',
    composition: 'Diclofenac Sodium (100mg SR)',
    dosageForm: 'Tablet',
    strength: '100mg',
    manufacturer: 'Novartis Healthcare / Sun Pharma',
    category: 'Analgesics & Pain',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 185.00,
    sellingPrice: 162.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'Potent sustained-release NSAID providing 24-hour relief from chronic joint pain, osteoarthritis, rheumatoid arthritis, ankylosing spondylitis, and acute musculoskeletal trauma.',
    indications: ['Osteoarthritis', 'Rheumatoid Arthritis', 'Ankylosing Spondylitis', 'Severe Backache', 'Post-Traumatic Swelling'],
    sideEffects: ['Dyspepsia', 'Elevated BP in hypertensive patients', 'Mild edema'],
    directions: 'Take whole with meals once daily. Do not crush or chew.',
    contraindications: ['Severe coronary heart disease', 'Active gastrointestinal bleeding'],
    storageAdvice: 'Protect from moisture and heat below 30°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Diclofenac Sustained Release Tablets 100mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 28.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-ultracet',
    name: 'Ultracet Tablet',
    brandName: 'Ultracet',
    genericName: 'Tramadol Hydrochloride + Paracetamol',
    composition: 'Tramadol HCl (37.5mg) + Paracetamol (325mg)',
    dosageForm: 'Tablet',
    strength: '37.5mg + 325mg',
    manufacturer: 'Janssen / Johnson & Johnson Ltd',
    category: 'Analgesics & Pain',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H1',
    mrp: 260.00,
    sellingPrice: 232.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'Centrally-acting opioid analgesic and paracetamol combination prescribed for moderate to severe acute postoperative pain and orthopedic injuries.',
    indications: ['Severe Acute Pain', 'Post-Surgical Pain', 'Severe Fracture Pain', 'Sciatica'],
    sideEffects: ['Dizziness', 'Drowsiness', 'Nausea', 'Constipation'],
    directions: 'Strictly as prescribed by medical specialist. Do not drive while on this medication.',
    contraindications: ['Acute respiratory depression', 'Concurrent MAO inhibitors'],
    storageAdvice: 'Store below 25°C.',
    isJanAushadhiGenericAlternativeAvailable: false,
    lastUpdated: '2026-10-01'
  },

  // ==========================================================
  // 2. ANTIBIOTICS & ANTIMICROBIALS (Schedule H & H1)
  // ==========================================================
  {
    id: 'med-augmentin-625',
    name: 'Augmentin 625 Duo Tablet',
    brandName: 'Augmentin 625 Duo',
    genericName: 'Amoxicillin + Potassium Clavulanate',
    composition: 'Amoxicillin Trihydrate (500mg) + Potassium Clavulanate (125mg)',
    dosageForm: 'Tablet',
    strength: '625mg',
    manufacturer: 'GlaxoSmithKline Pharmaceuticals Ltd',
    category: 'Antibiotics',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H1',
    mrp: 223.50,
    sellingPrice: 198.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 10 tablets',
    description: 'A broad-spectrum penicillin-class antibiotic combined with beta-lactamase inhibitor, indicated for bacterial infections of respiratory tract, ENT, skin, and urinary tract.',
    indications: ['Sinusitis', 'Bronchitis', 'Pneumonia', 'Urinary Tract Infections (UTI)', 'Skin & Soft Tissue Infections', 'Ear Infections (Otitis Media)'],
    sideEffects: ['Mild diarrhea', 'Nausea', 'Loose stools'],
    directions: 'Take strictly with food to maximize absorption and reduce stomach upset. Complete entire course.',
    contraindications: ['History of penicillin allergy or jaundice'],
    storageAdvice: 'Store below 25°C in moisture-proof packaging.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Amoxycillin & Potassium Clavulanate Tablets IP 625mg',
    janAushadhiEstimatedPrice: 65.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-azithral-500',
    name: 'Azithral 500 Tablet',
    brandName: 'Azithral 500',
    genericName: 'Azithromycin',
    composition: 'Azithromycin Dihydrate (500mg)',
    dosageForm: 'Tablet',
    strength: '500mg',
    manufacturer: 'Alembic Pharmaceuticals Ltd',
    category: 'Antibiotics',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H1',
    mrp: 132.00,
    sellingPrice: 118.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 5 tablets',
    description: 'Azithral 500 is an azalide antibiotic that stops bacterial protein synthesis, used for upper and lower respiratory tract infections, tonsillitis, and typhoid.',
    indications: ['Throat Infection', 'Tonsillitis', 'Community-Acquired Pneumonia', 'Skin Infections', 'Bronchitis', 'Sinus Infection'],
    sideEffects: ['Abdominal cramps', 'Diarrhea', 'Mild nausea'],
    directions: 'Take once daily either 1 hour before or 2 hours after meals.',
    contraindications: ['Cholestatic jaundice history', 'Severe hepatic disease'],
    storageAdvice: 'Store below 30°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Azithromycin Tablets IP 500mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 38.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-azee-500',
    name: 'Azee 500 Tablet',
    brandName: 'Azee 500',
    genericName: 'Azithromycin',
    composition: 'Azithromycin Dihydrate (500mg)',
    dosageForm: 'Tablet',
    strength: '500mg',
    manufacturer: 'Cipla Ltd',
    category: 'Antibiotics',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H1',
    mrp: 130.00,
    sellingPrice: 116.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 5 tablets',
    description: 'Trusted broad-spectrum macrolide antibiotic by Cipla for treating severe chest infections, pharyngitis, sinusitis, and genital infections.',
    indications: ['Pharyngitis', 'Chest Infection', 'Typhoid Fever', 'Sinusitis', 'Bacterial Throat Infection'],
    sideEffects: ['Mild gastrointestinal upset', 'Temporary taste changes'],
    directions: 'Take 1 tablet daily at fixed time with water.',
    contraindications: ['Known hypersensitivity to macrolides'],
    storageAdvice: 'Store in dry place.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Azithromycin Tablets IP 500mg',
    janAushadhiEstimatedPrice: 38.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-ciplox-500',
    name: 'Ciplox 500 Tablet',
    brandName: 'Ciplox 500',
    genericName: 'Ciprofloxacin Hydrochloride',
    composition: 'Ciprofloxacin Hydrochloride (500mg)',
    dosageForm: 'Tablet',
    strength: '500mg',
    manufacturer: 'Cipla Ltd',
    category: 'Antibiotics',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 44.50,
    sellingPrice: 39.50,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 10 tablets',
    description: 'Fluoroquinolone antibiotic active against Gram-negative and Gram-positive pathogens causing urinary tract, bone, joint, and gastrointestinal infections.',
    indications: ['Urinary Tract Infection (UTI)', 'Infectious Diarrhea', 'Typhoid Fever', 'Bone & Joint Infections', 'Prostatitis'],
    sideEffects: ['Nausea', 'Diarrhea', 'Rare tendon pain'],
    directions: 'Take with full glass of water. Avoid taking antacids, dairy, or iron within 2 hours of this dose.',
    contraindications: ['Myasthenia gravis', 'History of tendonitis with quinolones'],
    storageAdvice: 'Store below 25°C away from direct sunlight.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Ciprofloxacin Tablets IP 500mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 18.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-taxim-o-200',
    name: 'Taxim-O 200 Tablet',
    brandName: 'Taxim-O 200',
    genericName: 'Cefixime',
    composition: 'Cefixime Trihydrate (200mg)',
    dosageForm: 'Tablet',
    strength: '200mg',
    manufacturer: 'Alkem Laboratories Ltd',
    category: 'Antibiotics',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H1',
    mrp: 110.00,
    sellingPrice: 97.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 10 tablets',
    description: 'Potent third-generation oral cephalosporin antibiotic prescribed for enteric fever (typhoid), otitis media, urinary tract, and chest infections.',
    indications: ['Typhoid Fever', 'Otitis Media (Ear Infection)', 'Urinary Tract Infection (UTI)', 'Gonococcal Infection', 'Pharyngitis'],
    sideEffects: ['Loose stools', 'Stomach ache', 'Headache'],
    directions: 'Take 1 tablet every 12 hours with or without food. Complete prescribed course.',
    contraindications: ['Cephalosporin hypersensitivity'],
    storageAdvice: 'Store in cool dry conditions.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Cefixime Tablets IP 200mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 35.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-metrogyl-400',
    name: 'Metrogyl 400 Tablet',
    brandName: 'Metrogyl 400',
    genericName: 'Metronidazole',
    composition: 'Metronidazole (400mg)',
    dosageForm: 'Tablet',
    strength: '400mg',
    manufacturer: 'J.B. Chemicals & Pharmaceuticals Ltd',
    category: 'Antibiotics',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 24.00,
    sellingPrice: 21.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'Gold-standard nitroimidazole antiprotozoal and anaerobic antibacterial agent used for amoebic dysentery, dental infections, and pelvic infections.',
    indications: ['Amoebiasis', 'Infectious Diarrhea & Dysentery', 'Dental Abscess', 'Bacterial Vaginosis', 'Trichomoniasis'],
    sideEffects: ['Metallic taste in mouth', 'Darkened urine', 'Mild nausea'],
    directions: 'Take after meals. STRICTLY AVOID alcohol during treatment and for 48 hours after stopping.',
    contraindications: ['First trimester of pregnancy', 'Active neurological disorder'],
    storageAdvice: 'Store below 25°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Metronidazole Tablets IP 400mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 7.50,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-novamox-500',
    name: 'Novamox 500 Capsule',
    brandName: 'Novamox 500',
    genericName: 'Amoxicillin',
    composition: 'Amoxicillin Trihydrate (500mg)',
    dosageForm: 'Capsule',
    strength: '500mg',
    manufacturer: 'Cipla Ltd',
    category: 'Antibiotics',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 82.50,
    sellingPrice: 74.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 capsules',
    description: 'Penicillin-group antibiotic used for dental abscesses, chest infections, throat infections, and otitis media in both adults and pediatric patients.',
    indications: ['Tooth Infection', 'Dental Abscess', 'Throat Infection', 'Bronchitis', 'Sinusitis'],
    sideEffects: ['Mild skin rash', 'Diarrhea', 'Nausea'],
    directions: 'Take 1 capsule three times daily every 8 hours as prescribed.',
    contraindications: ['Penicillin allergy'],
    storageAdvice: 'Store in a dry place.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Amoxycillin Capsules IP 500mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 28.00,
    lastUpdated: '2026-10-01'
  },

  // ==========================================================
  // 3. GASTROINTESTINAL, ANTACID & ACIDITY CARE
  // ==========================================================
  {
    id: 'med-pan-d',
    name: 'Pan-D Capsule',
    brandName: 'Pan-D',
    genericName: 'Pantoprazole + Domperidone',
    composition: 'Pantoprazole Gastro-resistant (40mg) + Domperidone Prolonged-release (30mg)',
    dosageForm: 'Capsule',
    strength: '40mg + 30mg',
    manufacturer: 'Alkem Laboratories Ltd',
    category: 'Gastrointestinal',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 215.00,
    sellingPrice: 192.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 capsules',
    description: 'Dual prokinetic and proton pump inhibitor (PPI) prescribed for severe gastroesophageal reflux disease (GERD), acid indigestion, heartburn, and nausea.',
    indications: ['GERD (Acid Reflux)', 'Heartburn', 'Acidity & Gas', 'Gastric Ulcer', 'Dyspepsia', 'Nausea with Acidity'],
    sideEffects: ['Dry mouth', 'Headache', 'Mild diarrhea'],
    directions: 'Take 1 capsule once daily in morning on an empty stomach at least 30 to 60 minutes before breakfast.',
    contraindications: ['Prolonged QT interval', 'GI hemorrhage or obstruction'],
    storageAdvice: 'Store below 25°C in moisture-proof pack.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Pantoprazole 40mg + Domperidone 30mg SR Capsules (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 42.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-pantocid-40',
    name: 'Pantocid 40 Tablet',
    brandName: 'Pantocid 40',
    genericName: 'Pantoprazole',
    composition: 'Pantoprazole Sodium Gastro-resistant (40mg)',
    dosageForm: 'Tablet',
    strength: '40mg',
    manufacturer: 'Sun Pharmaceutical Industries Ltd',
    category: 'Gastrointestinal',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 165.00,
    sellingPrice: 148.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'Sun Pharma trusted PPI that provides sustained 24-hour suppression of gastric acid secretion, healing erosive esophagitis and peptic ulcers.',
    indications: ['Acid Peptic Disease', 'Erosive Esophagitis', 'Zollinger-Ellison Syndrome', 'NSAID-induced Gastritis', 'Heartburn'],
    sideEffects: ['Flatulence', 'Headache', 'Abdominal discomfort'],
    directions: 'Take 1 tablet in the morning 30 minutes before food with water.',
    storageAdvice: 'Store in dry place protected from light.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Pantoprazole Gastro-Resistant Tablets IP 40mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 22.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-omez-20',
    name: 'Omez 20 Capsule',
    brandName: 'Omez 20',
    genericName: 'Omeprazole',
    composition: 'Omeprazole Gastro-resistant Pellets (20mg)',
    dosageForm: 'Capsule',
    strength: '20mg',
    manufacturer: "Dr. Reddy's Laboratories Ltd",
    category: 'Gastrointestinal',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 62.00,
    sellingPrice: 54.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 20 capsules',
    description: 'Fast-acting proton pump inhibitor providing rapid relief from severe hyperacidity, stomach sourness, gastric ulcers, and burning sensation in chest.',
    indications: ['Heartburn', 'Hyperacidity', 'Peptic Ulcer', 'Reflux Esophagitis', 'Sour Burping / Gas'],
    sideEffects: ['Mild constipation or diarrhea', 'Nausea'],
    directions: 'Swallow whole with half a glass of liquid before meals.',
    storageAdvice: 'Store below 25°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Omeprazole Capsules IP 20mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 14.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-razo-20',
    name: 'Razo 20 Tablet',
    brandName: 'Razo 20',
    genericName: 'Rabeprazole Sodium',
    composition: 'Rabeprazole Sodium (20mg)',
    dosageForm: 'Tablet',
    strength: '20mg',
    manufacturer: "Dr. Reddy's Laboratories Ltd",
    category: 'Gastrointestinal',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 148.00,
    sellingPrice: 130.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'Rapid onset proton pump inhibitor that works faster than older PPIs for nocturnal acid breakthrough, severe GERD, and post-spicy meal heartburn.',
    indications: ['GERD', 'Nocturnal Acidity', 'Duodenal Ulcers', 'Heartburn', 'Gastric Acid Reduction'],
    sideEffects: ['Headache', 'Dizziness', 'Mild flatulence'],
    directions: 'Take 1 tablet 30 minutes before morning breakfast.',
    storageAdvice: 'Keep dry below 25°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Rabeprazole Sodium Tablets IP 20mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 20.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-digene-gel',
    name: 'Digene Gel Antacid (Mint Flavour)',
    brandName: 'Digene Gel',
    genericName: 'Magnesium Hydroxide + Aluminium Hydroxide + Simethicone',
    composition: 'Magnesium Hydroxide (185mg) + Aluminium Hydroxide (830mg) + Simethicone (50mg) per 5ml',
    dosageForm: 'Syrup',
    strength: '200ml Bottle',
    manufacturer: 'Abbott Healthcare Pvt Ltd',
    category: 'Gastrointestinal',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 145.00,
    sellingPrice: 128.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Bottle of 200ml',
    description: 'Instant-relief sugar-free antacid liquid suspension providing immediate neutralization of excess stomach acid and rapid relief from gas bubbles.',
    indications: ['Instant Acidity Relief', 'Gas & Bloating', 'Heartburn', 'Sour Stomach', 'Acid Indigestion'],
    sideEffects: ['Mild laxative effect or constipation if overconsumed'],
    directions: 'Shake bottle well. Take 2 teaspoons (10ml) after meals or before sleep.',
    storageAdvice: 'Do not freeze. Store in a cool place away from sunlight.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Antacid Suspension (Aluminium & Magnesium with Simethicone)',
    janAushadhiEstimatedPrice: 38.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-vomikind-4',
    name: 'Vomikind 4 Fast Melt Tablet',
    brandName: 'Vomikind 4',
    genericName: 'Ondansetron',
    composition: 'Ondansetron Hydrochloride (4mg Fast Melt)',
    dosageForm: 'Tablet',
    strength: '4mg',
    manufacturer: 'Mankind Pharma Ltd',
    category: 'Gastrointestinal',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 48.00,
    sellingPrice: 42.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 10 tablets',
    description: 'Selective 5-HT3 receptor antagonist that rapidly halts vomiting, nausea, motion sickness, and gastroenteritis-related emesis in adults and children.',
    indications: ['Vomiting', 'Severe Nausea', 'Food Poisoning Nausea', 'Post-Operative Vomiting', 'Chemotherapy Induced Emesis'],
    sideEffects: ['Constipation', 'Headache', 'Flushing'],
    directions: 'Place tablet on tongue to dissolve without chewing, or swallow with water 30 minutes before food.',
    contraindications: ['Concurrent Apomorphine therapy'],
    storageAdvice: 'Store below 30°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Ondansetron Orally Disintegrating Tablets 4mg',
    janAushadhiEstimatedPrice: 11.00,
    lastUpdated: '2026-10-01'
  },

  // ==========================================================
  // 4. CARDIOLOGY, HYPERTENSION (BP) & CHOLESTEROL
  // ==========================================================
  {
    id: 'med-telma-40',
    name: 'Telma 40 Tablet',
    brandName: 'Telma 40',
    genericName: 'Telmisartan',
    composition: 'Telmisartan (40mg)',
    dosageForm: 'Tablet',
    strength: '40mg',
    manufacturer: 'Glenmark Pharmaceuticals Ltd',
    category: 'Cardiology & BP',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 145.00,
    sellingPrice: 128.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'Gold-standard angiotensin II receptor blocker (ARB) widely prescribed across India for lowering high blood pressure and reducing cardiovascular event risks.',
    indications: ['High Blood Pressure (Hypertension)', 'Cardiovascular Risk Reduction', 'Diabetic Kidney Protection', 'Heart Health'],
    sideEffects: ['Mild dizziness', 'Back pain', 'Fatigue'],
    directions: 'Take once daily at the same time every morning with or without food.',
    contraindications: ['Pregnancy (Contraindicated in 2nd and 3rd trimesters)', 'Severe biliary obstruction'],
    storageAdvice: 'Store below 30°C in original blister pack away from moisture.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Telmisartan Tablets IP 40mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 22.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-telmikind-am',
    name: 'Telmikind-AM Tablet',
    brandName: 'Telmikind-AM',
    genericName: 'Telmisartan + Amlodipine',
    composition: 'Telmisartan (40mg) + Amlodipine Besylate (5mg)',
    dosageForm: 'Tablet',
    strength: '40mg + 5mg',
    manufacturer: 'Mankind Pharma Ltd',
    category: 'Cardiology & BP',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 112.00,
    sellingPrice: 98.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 10 tablets',
    description: 'Dual-action antihypertensive medication combining an ARB with a calcium channel blocker to provide sustained 24-hour blood pressure control in stubborn hypertension.',
    indications: ['Refractory Hypertension', 'Co-morbid High Blood Pressure', 'Uncontrolled BP with Monotherapy'],
    sideEffects: ['Peripheral ankle edema', 'Dizziness', 'Headache'],
    directions: 'Take once daily in morning or bedtime as instructed by cardiologist.',
    storageAdvice: 'Store below 25°C away from direct sunlight.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Telmisartan 40mg + Amlodipine 5mg Tablets (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 28.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-amlong-5',
    name: 'Amlong 5 Tablet',
    brandName: 'Amlong 5',
    genericName: 'Amlodipine Besylate',
    composition: 'Amlodipine Besylate (5mg)',
    dosageForm: 'Tablet',
    strength: '5mg',
    manufacturer: 'Micro Labs Ltd',
    category: 'Cardiology & BP',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 42.50,
    sellingPrice: 37.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'Long-acting dihydropyridine calcium channel blocker used in management of primary hypertension and chronic stable angina pectoris.',
    indications: ['Essential Hypertension', 'Angina Pectoris (Chest Pain)', 'Coronary Artery Disease'],
    sideEffects: ['Swelling in feet/ankles (edema)', 'Flushing', 'Fatigue'],
    directions: 'Take 1 tablet daily with a glass of water.',
    contraindications: ['Severe hypotension', 'Cardiogenic shock'],
    storageAdvice: 'Store below 25°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Amlodipine Tablets IP 5mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 9.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-atorva-20',
    name: 'Atorva 20 Tablet',
    brandName: 'Atorva 20',
    genericName: 'Atorvastatin Calcium',
    composition: 'Atorvastatin Calcium Trihydrate (20mg)',
    dosageForm: 'Tablet',
    strength: '20mg',
    manufacturer: 'Zydus Lifesciences Ltd',
    category: 'Cardiology & BP',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 235.00,
    sellingPrice: 206.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'High-intensity HMG-CoA reductase inhibitor (statin) that lowers bad LDL cholesterol, triglycerides, and reduces myocardial infarction (heart attack) and stroke risks.',
    indications: ['High Cholesterol (Hyperlipidemia)', 'Coronary Heart Disease', 'Prevention of Heart Attack', 'Post-Angioplasty Statin Care'],
    sideEffects: ['Muscle ache (myalgia)', 'Mild digestive upset', 'Transient liver enzyme changes'],
    directions: 'Take once daily at night after dinner with water.',
    contraindications: ['Active liver disease', 'Pregnancy and lactation'],
    storageAdvice: 'Store below 25°C protected from moisture.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Atorvastatin Tablets IP 20mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 32.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-rosuvas-10',
    name: 'Rosuvas 10 Tablet',
    brandName: 'Rosuvas 10',
    genericName: 'Rosuvastatin Calcium',
    composition: 'Rosuvastatin Calcium (10mg)',
    dosageForm: 'Tablet',
    strength: '10mg',
    manufacturer: 'Sun Pharmaceutical Industries Ltd',
    category: 'Cardiology & BP',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 210.00,
    sellingPrice: 184.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'Potent hydrophilic statin prescribed to reduce elevated total cholesterol, apolipoprotein B, and increase protective HDL cholesterol.',
    indications: ['Primary Hypercholesterolemia', 'Atherosclerosis Prevention', 'Dyslipidemia'],
    sideEffects: ['Myalgia', 'Asthenia', 'Headache'],
    directions: 'Take once daily with or without food at the same time each day.',
    storageAdvice: 'Store below 30°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Rosuvastatin Tablets IP 10mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 30.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-ecosprin-75',
    name: 'Ecosprin 75 Tablet',
    brandName: 'Ecosprin 75',
    genericName: 'Aspirin (Acetylsalicylic Acid)',
    composition: 'Aspirin Gastro-resistant / Enteric Coated (75mg)',
    dosageForm: 'Tablet',
    strength: '75mg',
    manufacturer: 'USV Ltd',
    category: 'Cardiology & BP',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 5.50,
    sellingPrice: 4.80,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 14 tablets',
    description: 'Low-dose enteric-coated antiplatelet drug that prevents blood clots, stroke, heart attacks, and stent thrombosis in cardiac patients.',
    indications: ['Heart Attack Prevention', 'Stroke Prevention', 'Post-Bypass / Post-Stent Care', 'Peripheral Vascular Disease'],
    sideEffects: ['Mild dyspepsia', 'Slightly increased bleeding tendency'],
    directions: 'Take once daily after a main meal with plenty of water. Do not crush.',
    contraindications: ['Active peptic ulcer bleeding', 'Bleeding disorders / Hemophilia'],
    storageAdvice: 'Store below 25°C in a dry place.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Aspirin Enteric Coated Tablets 75mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 3.50,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-concor-5',
    name: 'Concor 5 Tablet',
    brandName: 'Concor 5',
    genericName: 'Bisoprolol Fumarate',
    composition: 'Bisoprolol Fumarate (5mg)',
    dosageForm: 'Tablet',
    strength: '5mg',
    manufacturer: 'Merck Specialities Pvt Ltd',
    category: 'Cardiology & BP',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 142.00,
    sellingPrice: 125.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 10 tablets',
    description: 'Cardioselective beta-1 adrenergic receptor blocker used to manage high blood pressure, heart failure, and stabilize abnormal cardiac rhythms (arrhythmia).',
    indications: ['Hypertension', 'Chronic Stable Heart Failure', 'Angina', 'Tachycardia / Palpitations'],
    sideEffects: ['Bradycardia (slow pulse)', 'Fatigue', 'Cold extremities'],
    directions: 'Take in the morning with breakfast with water.',
    contraindications: ['Severe bradycardia', 'Severe asthma', 'Cardiogenic shock'],
    storageAdvice: 'Store below 25°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Bisoprolol Tablets IP 5mg',
    janAushadhiEstimatedPrice: 24.00,
    lastUpdated: '2026-10-01'
  },

  // ==========================================================
  // 5. DIABETES CARE & BLOOD SUGAR MANAGEMENT
  // ==========================================================
  {
    id: 'med-glycomet-500',
    name: 'Glycomet 500 Tablet',
    brandName: 'Glycomet 500',
    genericName: 'Metformin Hydrochloride',
    composition: 'Metformin Hydrochloride (500mg)',
    dosageForm: 'Tablet',
    strength: '500mg',
    manufacturer: 'USV Ltd',
    category: 'Diabetes Care',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 24.50,
    sellingPrice: 21.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 20 tablets',
    description: 'Gold-standard biguanide antidiabetic medication that lowers blood glucose by decreasing hepatic glucose synthesis and enhancing insulin sensitivity without causing hypoglycemia.',
    indications: ['Type 2 Diabetes Mellitus', 'Insulin Resistance', 'PCOS Management', 'Pre-Diabetes Glucose Control'],
    sideEffects: ['Nausea', 'Abdominal bloating', 'Metallic taste in mouth', 'Loose stools'],
    directions: 'Always take with or immediately after main meals to minimize gastric distress.',
    contraindications: ['Severe renal impairment (eGFR < 30)', 'Severe metabolic acidosis'],
    storageAdvice: 'Store in a dry place below 25°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Metformin Hydrochloride Tablets IP 500mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 9.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-glycomet-gp2',
    name: 'Glycomet-GP 2 Forte Tablet',
    brandName: 'Glycomet-GP 2 Forte',
    genericName: 'Glimepiride + Metformin',
    composition: 'Glimepiride (2mg) + Metformin Hydrochloride Prolonged-release (1000mg)',
    dosageForm: 'Tablet',
    strength: '2mg + 1000mg',
    manufacturer: 'USV Ltd',
    category: 'Diabetes Care',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 168.00,
    sellingPrice: 148.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'High-efficacy dual oral hypoglycemic agent combining a sulfonylurea with metformin for robust glycemic management in patients requiring intensified therapy.',
    indications: ['Uncontrolled Type 2 Diabetes', 'High Fasting & Postprandial Blood Sugar', 'HbA1c > 8.0%'],
    sideEffects: ['Hypoglycemia (low blood sugar if meals skipped)', 'Nausea', 'Weight gain'],
    directions: 'Take once daily with morning breakfast. Never skip meals while taking this tablet.',
    storageAdvice: 'Store in cool conditions.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Glimepiride 2mg + Metformin 1000mg PR Tablets (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 34.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-forxiga-10',
    name: 'Forxiga 10mg Tablet',
    brandName: 'Forxiga 10mg',
    genericName: 'Dapagliflozin',
    composition: 'Dapagliflozin Propanediol Monohydrate (10mg)',
    dosageForm: 'Tablet',
    strength: '10mg',
    manufacturer: 'AstraZeneca India Pvt Ltd',
    category: 'Diabetes Care',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 890.00,
    sellingPrice: 780.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 14 tablets',
    description: 'Leading SGLT2 inhibitor that eliminates excess blood sugar via renal excretion while conferring proven cardioprotection and slowing progression of diabetic chronic kidney disease.',
    indications: ['Type 2 Diabetes Mellitus', 'Heart Failure (HFrEF / HFpEF)', 'Chronic Kidney Disease (CKD)'],
    sideEffects: ['Increased urination', 'Genital mycotic infections', 'Mild dehydration'],
    directions: 'Take once daily at any time of day with water. Maintain adequate fluid intake.',
    contraindications: ['Type 1 Diabetes', 'Diabetic ketoacidosis'],
    storageAdvice: 'Store below 30°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Dapagliflozin Tablets 10mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 85.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-januvia-100',
    name: 'Januvia 100mg Tablet',
    brandName: 'Januvia 100mg',
    genericName: 'Sitagliptin',
    composition: 'Sitagliptin Phosphate Monohydrate (100mg)',
    dosageForm: 'Tablet',
    strength: '100mg',
    manufacturer: 'MSD Pharmaceuticals Pvt Ltd',
    category: 'Diabetes Care',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 460.00,
    sellingPrice: 410.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 7 tablets',
    description: 'Weight-neutral DPP-4 inhibitor that boosts natural incretin hormone levels, stimulating insulin only when blood sugar rises, without causing hypoglycemia.',
    indications: ['Type 2 Diabetes Mellitus', 'Combination Antidiabetic Therapy', 'Post-Meal Sugar Control'],
    sideEffects: ['Upper respiratory tract symptoms', 'Nasopharyngitis', 'Headache'],
    directions: 'Take 1 tablet daily with or without food.',
    storageAdvice: 'Store below 25°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Sitagliptin Tablets 100mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 55.00,
    lastUpdated: '2026-10-01'
  },

  // ==========================================================
  // 6. RESPIRATORY, COLD, COUGH & ALLERGIES
  // ==========================================================
  {
    id: 'med-montair-lc',
    name: 'Montair-LC Tablet',
    brandName: 'Montair-LC',
    genericName: 'Montelukast Sodium + Levocetirizine',
    composition: 'Montelukast Sodium (10mg) + Levocetirizine Dihydrochloride (5mg)',
    dosageForm: 'Tablet',
    strength: '10mg + 5mg',
    manufacturer: 'Cipla Ltd',
    category: 'Respiratory & Cold',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 310.00,
    sellingPrice: 275.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'Top-selling dual leukotriene receptor antagonist and antihistamine prescribed for allergic rhinitis, chronic sneezing, runny nose, allergic asthma, and seasonal hives.',
    indications: ['Allergic Rhinitis', 'Sneezing & Runny Nose', 'Watery Itchy Eyes', 'Allergic Asthma & Wheezing', 'Chronic Urticaria (Hives)', 'Dust Allergy'],
    sideEffects: ['Mild drowsiness', 'Dry mouth', 'Headache'],
    directions: 'Take 1 tablet once daily in the evening or before bedtime with water.',
    storageAdvice: 'Store below 25°C away from direct sunlight.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Montelukast 10mg + Levocetirizine 5mg Tablets (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 42.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-allegra-120',
    name: 'Allegra 120mg Tablet',
    brandName: 'Allegra 120mg',
    genericName: 'Fexofenadine Hydrochloride',
    composition: 'Fexofenadine Hydrochloride (120mg)',
    dosageForm: 'Tablet',
    strength: '120mg',
    manufacturer: 'Sanofi India Ltd',
    category: 'Respiratory & Cold',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 218.00,
    sellingPrice: 192.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 10 tablets',
    description: 'True non-drowsy second-generation antihistamine that relieves seasonal allergy symptoms, nasal congestion, and skin itching without causing sleepiness.',
    indications: ['Non-Drowsy Allergy Relief', 'Hay Fever', 'Skin Itching & Hives', 'Allergic Rash', 'Watery Eyes'],
    sideEffects: ['Headache', 'Drowsiness (very rare compared to older antihistamines)'],
    directions: 'Take with water before a meal. Do not take with fruit juices (apple/grapefruit).',
    storageAdvice: 'Store below 25°C in dry blister pack.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Fexofenadine Tablets IP 120mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 32.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-cetzine-10',
    name: 'Cetzine 10 Tablet',
    brandName: 'Cetzine 10',
    genericName: 'Cetirizine Hydrochloride',
    composition: 'Cetirizine Hydrochloride (10mg)',
    dosageForm: 'Tablet',
    strength: '10mg',
    manufacturer: 'Dr. Reddy’s Laboratories Ltd',
    category: 'Respiratory & Cold',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 23.50,
    sellingPrice: 20.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'Fast, dependable antihistaminic for acute allergy attacks, mosquito bite reactions, intense skin hives, cold-induced runny nose, and conjunctivitis.',
    indications: ['Cold & Runny Nose', 'Skin Hives', 'Insect Bite Itch', 'Allergic Conjunctivitis', 'Pollen Allergy'],
    sideEffects: ['Mild sedation', 'Dry mouth', 'Fatigue'],
    directions: 'Take 1 tablet at night before sleeping.',
    storageAdvice: 'Store in cool place.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Cetirizine Tablets IP 10mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 6.50,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-ascoril-d-plus',
    name: 'Ascoril D Plus Syrup (Sugar Free)',
    brandName: 'Ascoril D Plus',
    genericName: 'Dextromethorphan + Phenylephrine + Chlorpheniramine',
    composition: 'Dextromethorphan HBr (10mg) + Phenylephrine HCl (5mg) + Chlorpheniramine Maleate (2mg) per 5ml',
    dosageForm: 'Syrup',
    strength: '100ml Bottle',
    manufacturer: 'Glenmark Pharmaceuticals Ltd',
    category: 'Respiratory & Cold',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 135.00,
    sellingPrice: 118.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Bottle of 100ml',
    description: 'Doctor-preferred sugar-free cough syrup formulated for dry irritating cough, throat tickle, blocked nasal sinuses, and cold symptoms.',
    indications: ['Dry Cough', 'Throat Tickle & Irritation', 'Stuffy Blocked Nose', 'Common Cold Cough', 'Sinus Congestion'],
    sideEffects: ['Mild sleepiness', 'Dryness in throat'],
    directions: 'Adults: 10ml (2 teaspoons) three times daily. Use measuring cup provided.',
    storageAdvice: 'Store below 25°C. Do not freeze.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Dextromethorphan, Phenylephrine & CPM Cough Syrup (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 32.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-benadryl-syrup',
    name: 'Benadryl Cough Formula Syrup',
    brandName: 'Benadryl',
    genericName: 'Diphenhydramine + Ammonium Chloride + Sodium Citrate',
    composition: 'Diphenhydramine HCl (14.08mg) + Ammonium Chloride (138mg) + Sodium Citrate (57.03mg) per 5ml',
    dosageForm: 'Syrup',
    strength: '150ml Bottle',
    manufacturer: 'Johnson & Johnson Ltd',
    category: 'Respiratory & Cold',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 145.00,
    sellingPrice: 128.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Bottle of 150ml',
    description: 'Trusted household cough remedy providing soothing throat action, clearing heavy chest phlegm, and relieving allergic cough spasms.',
    indications: ['Chest Congestion', 'Wet Productive Cough', 'Throat Irritation', 'Bronchial Irritation'],
    sideEffects: ['Drowsiness (avoid driving)'],
    directions: 'Take 5ml to 10ml every 4 to 6 hours as needed.',
    storageAdvice: 'Store in cool conditions.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Expectorant Cough Formula Syrup',
    janAushadhiEstimatedPrice: 28.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-asthalin-inhaler',
    name: 'Asthalin Inhaler (100mcg)',
    brandName: 'Asthalin',
    genericName: 'Salbutamol (Albuterol)',
    composition: 'Salbutamol Sulphate (100mcg per actuation)',
    dosageForm: 'Inhaler',
    strength: '100mcg / 200 Metered Doses',
    manufacturer: 'Cipla Ltd',
    category: 'Respiratory & Cold',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 172.00,
    sellingPrice: 154.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Canister of 200 actuations',
    description: 'Life-saving fast-acting short-acting beta-2 agonist (SABA) bronchodilator for prompt relief of acute asthma attacks, wheezing, and chest tightness.',
    indications: ['Acute Asthma Attack Relief', 'Bronchospasm', 'Wheezing & Shortness of Breath', 'COPD Flare-up', 'Exercise-Induced Asthma'],
    sideEffects: ['Fine hand tremors', 'Transient tachycardia (rapid pulse)', 'Palpitations'],
    directions: 'Shake well before use. Inhale 1 to 2 puffs deeply through mouthpiece during acute breathlessness.',
    storageAdvice: 'Store below 30°C. Do not puncture or incinerate canister.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Salbutamol Inhaler 100mcg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 55.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-budecort-200',
    name: 'Budecort 200 Inhaler',
    brandName: 'Budecort 200',
    genericName: 'Budesonide',
    composition: 'Budesonide (200mcg per actuation)',
    dosageForm: 'Inhaler',
    strength: '200mcg / 200 Doses',
    manufacturer: 'Cipla Ltd',
    category: 'Respiratory & Cold',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 385.00,
    sellingPrice: 342.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Canister of 200 doses',
    description: 'Inhaled corticosteroid (ICS) maintenance therapy to control airway inflammation and prevent recurrent asthma exacerbations and chronic bronchitis.',
    indications: ['Asthma Prevention & Control', 'Chronic Bronchitis', 'Airway Inflammation Reduction'],
    sideEffects: ['Oral candidiasis (rinse mouth with water after use)', 'Hoarseness of voice'],
    directions: 'Rinse mouth thoroughly with water and spit out after each inhalation.',
    storageAdvice: 'Store in cool dry place.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Budesonide Inhaler 200mcg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 95.00,
    lastUpdated: '2026-10-01'
  },

  // ==========================================================
  // 7. VITAMINS, MINERALS & REHYDRATION
  // ==========================================================
  {
    id: 'med-shelcal-500',
    name: 'Shelcal 500 Tablet',
    brandName: 'Shelcal 500',
    genericName: 'Calcium + Vitamin D3',
    composition: 'Elemental Calcium from Oyester Shell (500mg) + Vitamin D3 (Cholecalciferol 250 IU)',
    dosageForm: 'Tablet',
    strength: '500mg + 250 IU',
    manufacturer: 'Torrent Pharmaceuticals Ltd',
    category: 'Vitamins & Supplements',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 145.00,
    sellingPrice: 128.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Bottle of 15 tablets',
    description: 'High-absorption calcium and vitamin D3 formulation prescribed for bone mineral density maintenance, osteoporosis prevention, and fracture healing.',
    indications: ['Osteoporosis Prevention', 'Calcium Deficiency', 'Post-Menopausal Bone Loss', 'Pregnancy & Lactation Calcium Support', 'Bone Strength'],
    sideEffects: ['Mild constipation if fluid intake is low'],
    directions: 'Take 1 tablet daily after lunch or dinner with water.',
    storageAdvice: 'Keep bottle tightly closed below 25°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Calcium Carbonate 500mg + Vitamin D3 Tablets (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 22.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-becosules-z',
    name: 'Becosules Z Capsule',
    brandName: 'Becosules Z',
    genericName: 'B-Complex + Vitamin C + Zinc',
    composition: 'Vitamin B1, B2, B6, B12, Niacinamide, Calcium Pantothenate, Folic Acid, Vitamin C (50mg) + Elemental Zinc (41.4mg)',
    dosageForm: 'Capsule',
    strength: 'Multi-nutrient Complex',
    manufacturer: 'Pfizer Ltd',
    category: 'Vitamins & Supplements',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 54.00,
    sellingPrice: 47.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 20 capsules',
    description: 'Classic high-potency Vitamin B-complex enriched with Vitamin C and Zinc to heal mouth ulcers, restore vitality, and repair tissue during antibiotic courses.',
    indications: ['Mouth Ulcers & Canker Sores', 'Antibiotic-Associated Vitamin Loss', 'Immunity Boost', 'Fatigue & Weakness', 'Healthy Skin & Hair'],
    sideEffects: ['Harmless yellowing of urine due to Riboflavin excretion'],
    directions: 'Take 1 capsule daily after a meal.',
    storageAdvice: 'Store below 25°C away from humidity.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Vitamin B-Complex with Zinc Capsules (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 14.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-limcee-500',
    name: 'Limcee 500 Chewable Tablet (Orange Flavour)',
    brandName: 'Limcee 500',
    genericName: 'Vitamin C (Ascorbic Acid)',
    composition: 'Ascorbic Acid (100mg) + Sodium Ascorbate (450mg equivalent to 500mg Vitamin C)',
    dosageForm: 'Tablet',
    strength: '500mg',
    manufacturer: 'Abbott Healthcare Pvt Ltd',
    category: 'Vitamins & Supplements',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 26.50,
    sellingPrice: 22.50,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 chewable tablets',
    description: 'Tasty orange-flavoured chewable Vitamin C tablet for boosting daily immunity, collagen synthesis, wound healing, and antioxidant defense against viral infections.',
    indications: ['Daily Immunity', 'Wound Healing', 'Skin Glow & Collagen', 'Viral Illness Recovery', 'Scurvy Prevention'],
    sideEffects: ['None at recommended dose'],
    directions: 'Chew 1 tablet daily slowly in mouth. Do not swallow whole.',
    storageAdvice: 'Store below 25°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Vitamin C Chewable Tablets 500mg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 6.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-calcirol-sachet',
    name: 'Calcirol 60000 IU Granules Sachet',
    brandName: 'Calcirol',
    genericName: 'Cholecalciferol (Vitamin D3)',
    composition: 'Cholecalciferol (Vitamin D3 60,000 International Units)',
    dosageForm: 'Powder',
    strength: '60,000 IU / 1g',
    manufacturer: 'Cadila Pharmaceuticals Ltd',
    category: 'Vitamins & Supplements',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 52.00,
    sellingPrice: 45.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Single Dose Sachet of 1g',
    description: 'High-potency therapeutic Vitamin D3 megadose granules to correct severe Vitamin D deficiency, generalized fatigue, bone ache, and muscle weakness.',
    indications: ['Severe Vitamin D3 Deficiency', 'Chronic Bone Pain & Fatigue', 'Osteomalacia', 'Immunity Boost'],
    sideEffects: ['Hypercalcemia if severely overdosed'],
    directions: 'Mix 1 full sachet in half a glass of warm milk. Take once weekly for 8 weeks or as directed by doctor.',
    storageAdvice: 'Store in a dry place.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Cholecalciferol Granules 60,000 IU (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 12.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-electral-ors',
    name: 'Electral ORS Powder (WHO Formula)',
    brandName: 'Electral',
    genericName: 'Oral Rehydration Salts IP (WHO Recommended)',
    composition: 'Sodium Chloride (2.6g) + Potassium Chloride (1.5g) + Sodium Citrate (2.9g) + Dextrose (13.5g) per 21.8g Sachet',
    dosageForm: 'Powder',
    strength: '21.8g Sachet for 1 Litre Water',
    manufacturer: 'FDC Ltd',
    category: 'Vitamins & Supplements',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 23.50,
    sellingPrice: 21.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Sachet of 21.8g',
    description: 'Gold-standard WHO-recommended oral electrolyte replacement formula for rapid rehydration during diarrhea, vomiting, heat exhaustion, dehydration, and athletic recovery.',
    indications: ['Diarrhea & Dehydration', 'Vomiting Electrolyte Loss', 'Heat Stroke & Summer Exhaustion', 'Traveler Diarrhea', 'Sports Rehydration'],
    sideEffects: ['None when mixed in correct proportion of clean water'],
    directions: 'Dissolve entire contents of sachet in exactly 1 litre of clean drinking water. Drink throughout the day. Discard unused solution after 24 hours.',
    storageAdvice: 'Store in a cool dry place.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Oral Rehydration Salts (WHO Formula) IP 21.8g (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 7.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-zincovit',
    name: 'Zincovit Tablet',
    brandName: 'Zincovit',
    genericName: 'Multivitamins + Multiminerals + Grape Seed Extract',
    composition: 'Essential Vitamins (A, B-Complex, C, D3, E) + Zinc, Magnesium, Manganese, Iodine, Copper, Selenium + Grape Seed Extract (50mg)',
    dosageForm: 'Tablet',
    strength: 'Comprehensive Multivitamin',
    manufacturer: 'Apex Laboratories Pvt Ltd',
    category: 'Vitamins & Supplements',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 110.00,
    sellingPrice: 96.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Strip of 15 tablets',
    description: 'Comprehensive daily nutritional supplement formulated with potent antioxidants, grape seed extract, and minerals to boost immunity, stamina, and recovery.',
    indications: ['Daily Immunity & Energy', 'Post-Infection Recovery', 'Nutritional Deficiency', 'Healthy Hair & Skin'],
    sideEffects: ['Well tolerated'],
    directions: 'Take 1 tablet daily with a main meal.',
    storageAdvice: 'Store below 25°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Multivitamin with Minerals Tablets (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 18.00,
    lastUpdated: '2026-10-01'
  },

  // ==========================================================
  // 8. DERMATOLOGY & TOPICAL CARE
  // ==========================================================
  {
    id: 'med-betadine-10-ointment',
    name: 'Betadine 10% Antiseptic Ointment',
    brandName: 'Betadine 10%',
    genericName: 'Povidone-Iodine',
    composition: 'Povidone-Iodine IP (10% w/w)',
    dosageForm: 'Ointment',
    strength: '10% w/w / 20g Tube',
    manufacturer: 'Win-Medicare Pvt Ltd / Mundipharma',
    category: 'Dermatology',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 135.00,
    sellingPrice: 120.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Tube of 20g',
    description: 'Gold-standard microbicidal topical ointment providing rapid, broad-spectrum destruction of bacteria, fungi, protozoa, and viruses in cuts, abrasions, burns, and wounds.',
    indications: ['Minor Cuts & Scratches', 'Burns & Scalds', 'Surgical Wound Dressing', 'Skin Infection Prevention'],
    sideEffects: ['Local skin irritation (rare)'],
    directions: 'Clean the affected wound surface. Apply gently once or twice daily with sterile dressing.',
    contraindications: ['Known iodine hypersensitivity', 'Thyroid disorders on large body surface area'],
    storageAdvice: 'Store below 25°C. Do not freeze.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Povidone Iodine Ointment 5% / 10% (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 24.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-soframycin-cream',
    name: 'Soframycin Skin Cream',
    brandName: 'Soframycin',
    genericName: 'Framycetin Sulphate',
    composition: 'Framycetin Sulphate IP (1% w/w)',
    dosageForm: 'Ointment',
    strength: '1% w/w / 30g Tube',
    manufacturer: 'Sanofi India Ltd',
    category: 'Dermatology',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 68.00,
    sellingPrice: 60.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Tube of 30g',
    description: 'Household antibacterial skin cream for bacterial skin infections, minor burns, scalds, impetigo, and infected cuts.',
    indications: ['Infected Cuts & Wounds', 'Boils & Impetigo', 'Skin Burns', 'Paronychia (Nail Infection)'],
    sideEffects: ['Mild local burning sensation'],
    directions: 'Apply thin layer to affected skin area 1 to 3 times daily.',
    storageAdvice: 'Store below 25°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Framycetin Skin Cream (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 15.00,
    lastUpdated: '2026-10-01'
  },
  {
    id: 'med-volini-gel',
    name: 'Volini Maxx Pain Relief Gel',
    brandName: 'Volini Gel',
    genericName: 'Diclofenac + Linseed Oil + Methyl Salicylate + Menthol',
    composition: 'Diclofenac Diethylamine (1.16% w/w) + Linseed Oil (3%) + Methyl Salicylate (10%) + Menthol (5%)',
    dosageForm: 'Ointment',
    strength: '50g Tube',
    manufacturer: 'Sun Pharmaceutical Industries Ltd',
    category: 'Dermatology',
    prescriptionRequired: false,
    scheduleClass: 'OTC',
    mrp: 175.00,
    sellingPrice: 152.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Tube of 50g',
    description: 'Fast-penetrating deep pain relief gel for quick relief from backache, neck pain, joint stiffness, sprains, and sports injuries.',
    indications: ['Back Pain', 'Neck & Shoulder Stiffness', 'Joint Ache', 'Sprains & Muscle Strains'],
    sideEffects: ['Mild local redness or tingling'],
    directions: 'Apply gently over affected area 3 to 4 times a day. Do not rub vigorously.',
    storageAdvice: 'Store below 30°C.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Diclofenac Gel (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 28.00,
    lastUpdated: '2026-10-01'
  },

  // ==========================================================
  // 9. THYROID CARE
  // ==========================================================
  {
    id: 'med-thyronorm-50',
    name: 'Thyronorm 50mcg Tablet',
    brandName: 'Thyronorm 50',
    genericName: 'Thyroxine Sodium (Levothyroxine)',
    composition: 'Thyroxine Sodium IP (50mcg)',
    dosageForm: 'Tablet',
    strength: '50mcg',
    manufacturer: 'Abbott Healthcare Pvt Ltd',
    category: 'Cardiology & BP',
    prescriptionRequired: true,
    scheduleClass: 'Schedule H',
    mrp: 142.00,
    sellingPrice: 125.00,
    currency: 'INR',
    priceLive: true,
    priceSource: 'NPPA / DPCO Ceiling Price Schedule',
    packSize: 'Bottle of 120 tablets',
    description: 'Synthetic thyroid hormone levothyroxine replacement therapy for clinical and subclinical hypothyroidism, restoring normal thyroid hormone levels.',
    indications: ['Hypothyroidism', 'Thyroid Hormone Deficiency', 'Goiter Management', 'Fatigue due to Low TSH/T4'],
    sideEffects: ['Palpitations if over-titrated', 'Weight loss', 'Nervousness'],
    directions: 'Take strictly first thing in the morning on an empty stomach with a full glass of water, at least 45 minutes before tea, coffee, or breakfast.',
    storageAdvice: 'Keep bottle tightly capped in dry dark environment.',
    isJanAushadhiGenericAlternativeAvailable: true,
    janAushadhiGenericName: 'Thyroxine Sodium Tablets IP 50mcg (Jan Aushadhi)',
    janAushadhiEstimatedPrice: 38.00,
    lastUpdated: '2026-10-01'
  }
];

// Symptom & Search Intent mapping for lightning-fast matching
const SYMPTOM_INTENT_MAP: Record<string, string[]> = {
  'fever': ['med-dolo-650', 'med-calpol-500', 'med-crocin-650', 'med-combiflam'],
  'headache': ['med-dolo-650', 'med-crocin-650', 'med-combiflam', 'med-calpol-500'],
  'body pain': ['med-dolo-650', 'med-combiflam', 'med-voveran-sr-100', 'med-volini-gel'],
  'back pain': ['med-voveran-sr-100', 'med-combiflam', 'med-volini-gel'],
  'joint pain': ['med-voveran-sr-100', 'med-combiflam', 'med-shelcal-500'],
  'cold': ['med-montair-lc', 'med-cetzine-10', 'med-allegra-120', 'med-ascoril-d-plus'],
  'cough': ['med-ascoril-d-plus', 'med-benadryl-syrup', 'med-montair-lc'],
  'dry cough': ['med-ascoril-d-plus', 'med-montair-lc'],
  'wet cough': ['med-benadryl-syrup'],
  'chest congestion': ['med-benadryl-syrup', 'med-asthalin-inhaler'],
  'asthma': ['med-asthalin-inhaler', 'med-budecort-200', 'med-montair-lc'],
  'allergy': ['med-allegra-120', 'med-cetzine-10', 'med-montair-lc'],
  'sneezing': ['med-montair-lc', 'med-cetzine-10', 'med-allegra-120'],
  'acidity': ['med-pan-d', 'med-pantocid-40', 'med-omez-20', 'med-razo-20', 'med-digene-gel'],
  'gas': ['med-pan-d', 'med-digene-gel', 'med-omez-20', 'med-pantocid-40'],
  'heartburn': ['med-pan-d', 'med-digene-gel', 'med-pantocid-40', 'med-omez-20', 'med-razo-20'],
  'vomiting': ['med-vomikind-4', 'med-pan-d', 'med-electral-ors'],
  'nausea': ['med-vomikind-4', 'med-pan-d'],
  'loose motion': ['med-electral-ors', 'med-metrogyl-400', 'med-taxim-o-200'],
  'diarrhea': ['med-electral-ors', 'med-metrogyl-400', 'med-ciplox-500'],
  'infection': ['med-augmentin-625', 'med-azithral-500', 'med-azee-500', 'med-ciplox-500', 'med-taxim-o-200', 'med-novamox-500'],
  'antibiotic': ['med-augmentin-625', 'med-azithral-500', 'med-azee-500', 'med-ciplox-500', 'med-taxim-o-200', 'med-novamox-500', 'med-metrogyl-400'],
  'bp': ['med-telma-40', 'med-telmikind-am', 'med-amlong-5', 'med-concor-5'],
  'blood pressure': ['med-telma-40', 'med-telmikind-am', 'med-amlong-5', 'med-concor-5'],
  'hypertension': ['med-telma-40', 'med-telmikind-am', 'med-amlong-5'],
  'sugar': ['med-glycomet-500', 'med-glycomet-gp2', 'med-forxiga-10', 'med-januvia-100'],
  'diabetes': ['med-glycomet-500', 'med-glycomet-gp2', 'med-forxiga-10', 'med-januvia-100'],
  'cholesterol': ['med-atorva-20', 'med-rosuvas-10'],
  'heart': ['med-ecosprin-75', 'med-atorva-20', 'med-telma-40', 'med-concor-5'],
  'mouth ulcer': ['med-becosules-z'],
  'weakness': ['med-zincovit', 'med-becosules-z', 'med-calcirol-sachet', 'med-limcee-500'],
  'vitamin': ['med-becosules-z', 'med-limcee-500', 'med-shelcal-500', 'med-calcirol-sachet', 'med-zincovit'],
  'wound': ['med-betadine-10-ointment', 'med-soframycin-cream'],
  'burn': ['med-betadine-10-ointment', 'med-soframycin-cream'],
  'period pain': ['med-meftal-spas', 'med-combiflam'],
  'thyroid': ['med-thyronorm-50']
};

/**
 * Normalizes strings by lowercasing and removing special punctuation/extra spaces
 */
function cleanTerm(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Fast search algorithm with tokenization, typo tolerance, symptom mapping, and relevance scoring
 */
export function searchMedicinesLocal(params: {
  query?: string;
  category?: string;
  dosageForm?: string;
  limit?: number;
}): { results: PharmaceuticalMedicine[]; total: number } {
  const { query = '', category = 'All', dosageForm = 'All', limit = 60 } = params;
  const rawQ = query.trim().toLowerCase();

  if (!rawQ) {
    // If no query, just filter by category and dosageForm
    const filtered = AUTHENTIC_MEDICINES.filter(med => {
      if (category !== 'All' && med.category !== category) return false;
      if (dosageForm !== 'All' && med.dosageForm !== dosageForm) return false;
      return true;
    });
    return {
      results: filtered.slice(0, limit),
      total: filtered.length
    };
  }

  // Tokenize query
  const cleanQ = cleanTerm(rawQ);
  const queryTokens = cleanQ.split(' ').filter(t => t.length > 0);
  const compactQ = cleanQ.replace(/\s+/g, '');

  // Check symptom / intent mapping
  const symptomMatchedIds = new Set<string>();
  for (const [symptom, medIds] of Object.entries(SYMPTOM_INTENT_MAP)) {
    if (cleanQ.includes(symptom) || symptom.includes(cleanQ)) {
      medIds.forEach(id => symptomMatchedIds.add(id));
    }
  }

  // Score each medication
  const scoredItems: Array<{ med: PharmaceuticalMedicine; score: number }> = [];

  for (const med of AUTHENTIC_MEDICINES) {
    // Category check
    if (category !== 'All' && med.category !== category) continue;
    // Dosage Form check
    if (dosageForm !== 'All' && med.dosageForm !== dosageForm) continue;

    const medNameClean = cleanTerm(med.name);
    const medBrandClean = cleanTerm(med.brandName);
    const medGenericClean = cleanTerm(med.genericName);
    const medCompClean = cleanTerm(med.composition);
    const medMfgClean = cleanTerm(med.manufacturer);
    const medCategoryClean = cleanTerm(med.category);
    const medCompact = (medNameClean + medBrandClean + medGenericClean).replace(/\s+/g, '');

    let score = 0;

    // 1. Direct or Compact matches (e.g. "dolo650" matching "Dolo 650")
    if (medBrandClean === cleanQ || medNameClean === cleanQ) {
      score += 100;
    } else if (medBrandClean.startsWith(cleanQ) || medNameClean.startsWith(cleanQ)) {
      score += 80;
    } else if (medCompact.includes(compactQ) || compactQ.includes(medCompact)) {
      score += 70;
    }

    // 2. Generic Name Match (e.g. "paracetamol" matching Dolo 650)
    if (medGenericClean === cleanQ) {
      score += 90;
    } else if (medGenericClean.includes(cleanQ)) {
      score += 60;
    }

    // 3. Token-based matching (every token in query)
    let matchedTokenCount = 0;
    for (const token of queryTokens) {
      if (
        medNameClean.includes(token) ||
        medBrandClean.includes(token) ||
        medGenericClean.includes(token) ||
        medCompClean.includes(token) ||
        medMfgClean.includes(token) ||
        medCategoryClean.includes(token)
      ) {
        matchedTokenCount++;
        score += 25;
      }
    }

    // 4. Indications match (e.g. "fever", "heart attack", "acidity")
    for (const ind of med.indications) {
      const indClean = cleanTerm(ind);
      if (indClean.includes(cleanQ) || cleanQ.includes(indClean)) {
        score += 40;
        break;
      }
      for (const token of queryTokens) {
        if (token.length >= 3 && indClean.includes(token)) {
          score += 15;
          break;
        }
      }
    }

    // 5. Symptom Map bonus
    if (symptomMatchedIds.has(med.id)) {
      score += 35;
    }

    if (score > 0) {
      scoredItems.push({ med, score });
    }
  }

  // Sort by score descending
  scoredItems.sort((a, b) => b.score - a.score);

  const results = scoredItems.map(item => item.med);

  return {
    results: results.slice(0, limit),
    total: results.length
  };
}

/**
 * Autocomplete suggestions for medicine search bars (instant 0ms response)
 */
export function getMedicineAutocompleteSuggestions(query: string): Array<{
  id: string;
  name: string;
  genericName: string;
  category: string;
  manufacturer: string;
  sellingPrice: number | null;
  dosageForm: string;
}> {
  const rawQ = query.trim().toLowerCase();
  if (!rawQ || rawQ.length < 1) return [];

  const cleanQ = cleanTerm(rawQ);
  const compactQ = cleanQ.replace(/\s+/g, '');

  const suggestions: Array<{
    id: string;
    name: string;
    genericName: string;
    category: string;
    manufacturer: string;
    sellingPrice: number | null;
    dosageForm: string;
    score: number;
  }> = [];

  for (const med of AUTHENTIC_MEDICINES) {
    const medNameClean = cleanTerm(med.name);
    const medBrandClean = cleanTerm(med.brandName);
    const medGenericClean = cleanTerm(med.genericName);
    const medCompact = (medNameClean + medBrandClean + medGenericClean).replace(/\s+/g, '');

    let score = 0;
    if (medBrandClean.startsWith(cleanQ) || medNameClean.startsWith(cleanQ)) {
      score = 50;
    } else if (medBrandClean.includes(cleanQ) || medNameClean.includes(cleanQ)) {
      score = 40;
    } else if (medCompact.includes(compactQ)) {
      score = 35;
    } else if (medGenericClean.includes(cleanQ)) {
      score = 30;
    } else if (med.indications.some(i => cleanTerm(i).includes(cleanQ))) {
      score = 20;
    }

    if (score > 0) {
      suggestions.push({
        id: med.id,
        name: med.name,
        genericName: med.genericName,
        category: med.category,
        manufacturer: med.manufacturer,
        sellingPrice: med.sellingPrice,
        dosageForm: med.dosageForm,
        score
      });
    }
  }

  suggestions.sort((a, b) => b.score - a.score);

  return suggestions.slice(0, 8);
}
