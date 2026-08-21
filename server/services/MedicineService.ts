export interface DetailedMedicine {
  id: string;
  name: string; // Generic name
  brandNames: string[]; // Country specific brands
  drugClass: string;
  uses: string;
  howItWorks: string;
  dosageRanges: string;
  commonSideEffects: string[];
  seriousSideEffects: string[];
  drugInteractions: string[];
  foodInteractions: string[];
  precautions: {
    pregnancy: string;
    breastfeeding: string;
    kidney: string;
    liver: string;
  };
  storage: string;
  missedDose: string;
  overdoseWarning: string;
  prescriptionStatus: 'Schedule H (Prescription Required)' | 'Schedule X' | 'Over-The-Counter (OTC)';
}

export const VERIFIED_MEDICINE_DATABASE: DetailedMedicine[] = [
  {
    id: 'med-1',
    name: 'Telmisartan',
    brandNames: ['Telma 40', 'Telmikind', 'Telvas', 'Tazloc', 'Cresar', 'Micardis'],
    drugClass: 'Angiotensin II Receptor Blocker (ARB) / Antihypertensive',
    uses: 'Management of essential hypertension (high blood pressure) and reduction of cardiovascular risk in adults.',
    howItWorks: 'Blocks the action of angiotensin II, a chemical in the body that causes blood vessels to tighten, thereby relaxing blood vessels and lowering blood pressure.',
    dosageRanges: 'Adults: 20mg to 80mg once daily orally. Commonly prescribed as 40mg daily.',
    commonSideEffects: ['Mild dizziness', 'Back pain', 'Sinusitis', 'Diarrhea'],
    seriousSideEffects: ['Hyperkalemia (high blood potassium)', 'Sudden hypotension (low BP)', 'Impaired kidney function', 'Angioedema (swelling of face/throat)'],
    drugInteractions: ['Potassium supplements or potassium-sparing diuretics (e.g. Spironolactone)', 'NSAIDs (e.g. Ibuprofen, Naproxen)', 'Lithium', 'Other blood pressure medications'],
    foodInteractions: ['Avoid potassium-rich salt substitutes without consulting your doctor.'],
    precautions: {
      pregnancy: 'STRICTLY CONTRAINDICATED in 2nd and 3rd trimesters (can cause fetal injury or death).',
      breastfeeding: 'Not recommended; consult a doctor for alternative antihypertensives.',
      kidney: 'Use with caution; periodic monitoring of serum creatinine and potassium required.',
      liver: 'Dose adjustment required in mild to moderate hepatic impairment; contraindicated in severe biliary obstruction.'
    },
    storage: 'Store below 30°C in a dry place protected from direct sunlight and moisture.',
    missedDose: 'Take the missed dose as soon as remembered unless it is almost time for the next scheduled dose. Never double the dose.',
    overdoseWarning: 'Signs include severe low blood pressure, rapid or slow heartbeat, and dizziness. Seek immediate emergency medical care.',
    prescriptionStatus: 'Schedule H (Prescription Required)'
  },
  {
    id: 'med-2',
    name: 'Metformin Hydrochloride',
    brandNames: ['Glycomet 500', 'Gluconorm', 'Glyciphage', 'Obimet', 'Glucophage'],
    drugClass: 'Biguanide / Antidiabetic Agent',
    uses: 'First-line oral medication for Type 2 Diabetes Mellitus management and Insulin Resistance / PCOS.',
    howItWorks: 'Decreases hepatic glucose production, decreases intestinal absorption of glucose, and improves insulin sensitivity by increasing peripheral glucose uptake.',
    dosageRanges: 'Adults: 500mg to 2000mg daily in divided doses, usually with meals to minimize stomach upset.',
    commonSideEffects: ['Nausea', 'Abdominal bloating', 'Diarrhea', 'Metallic taste in mouth', 'Loss of appetite'],
    seriousSideEffects: ['Lactic Acidosis (rare but life-threatening)', 'Severe Vitamin B12 deficiency with long-term use'],
    drugInteractions: ['Iodinated contrast dyes (must stop Metformin before imaging scans)', 'Alcohol', 'Corticosteroids', 'Diuretics'],
    foodInteractions: ['Take with meals to reduce gastrointestinal side effects. Limit heavy alcohol consumption.'],
    precautions: {
      pregnancy: 'Category B. Widely used under strict medical supervision during gestational diabetes.',
      breastfeeding: 'Excreted in small amounts in breast milk; consult prescribing physician.',
      kidney: 'Contraindicated if eGFR is below 30 mL/min/1.73m² due to lactic acidosis risk.',
      liver: 'Avoid in severe liver disease or active alcoholism.'
    },
    storage: 'Store at room temperature (20°C to 25°C) away from moisture and heat.',
    missedDose: 'Take with the next meal. If it is close to the next dose, skip the missed dose.',
    overdoseWarning: 'May cause severe lactic acidosis (hypothermia, severe stomach discomfort, muscle pain). Immediate emergency hospitalization required.',
    prescriptionStatus: 'Schedule H (Prescription Required)'
  },
  {
    id: 'med-3',
    name: 'Paracetamol / Acetaminophen',
    brandNames: ['Dolo 650', 'Calpol 500', 'Crocin 650', 'Pacimol', 'Tylenol', 'Panadol'],
    drugClass: 'Analgesic (Pain Reliever) & Antipyretic (Fever Reducer)',
    uses: 'Relief of mild-to-moderate pain (headache, toothache, muscle aches, post-vaccination fever) and fever reduction.',
    howItWorks: 'Inhibits prostaglandin synthesis primarily in the central nervous system to reduce pain signals and reset the hypothalamic heat-regulating center.',
    dosageRanges: 'Adults: 500mg to 650mg every 4-6 hours as needed. Maximum daily limit is 4000mg (4 grams) from all sources combined.',
    commonSideEffects: ['Generally well tolerated at therapeutic doses', 'Mild nausea or indigestion'],
    seriousSideEffects: ['Acute Liver Failure / Hepatotoxicity (with overdose)', 'Severe allergic skin reactions (Stevens-Johnson Syndrome - extremely rare)'],
    drugInteractions: ['Other paracetamol-containing cold/cough formulations (risk of accidental overdose)', 'Warfarin (long-term heavy use increases bleeding risk)', 'Alcohol'],
    foodInteractions: ['Avoid heavy alcohol consumption while taking paracetamol.'],
    precautions: {
      pregnancy: 'Generally considered safe during all trimesters when used at the lowest effective dose for the shortest duration.',
      breastfeeding: 'Safe at recommended doses; passes into breast milk in tiny non-harmful amounts.',
      kidney: 'Dose adjustment required in severe renal failure.',
      liver: 'Use extreme caution; lower maximum daily dose (2000mg) for patients with liver impairment or chronic alcoholism.'
    },
    storage: 'Store in a cool dry place below 25°C.',
    missedDose: 'Take when needed for pain or fever. Maintain at least 4 hours between doses.',
    overdoseWarning: 'Liver damage can occur silently over 24-48 hours. Symptoms include nausea, vomiting, right upper abdominal pain. Seek ER emergency antidote (N-acetylcysteine) immediately.',
    prescriptionStatus: 'Over-The-Counter (OTC)'
  },
  {
    id: 'med-4',
    name: 'Pantoprazole',
    brandNames: ['Pantocid 40', 'Pan 40', 'Pantodac', 'Protonix'],
    drugClass: 'Proton Pump Inhibitor (PPI) / Antacid',
    uses: 'Treatment of Gastroesophageal Reflux Disease (GERD), acid peptic disease, gastric ulcers, and prevention of NSAID-induced gastritis.',
    howItWorks: 'Suppresses gastric acid secretion by inhibiting the H+/K+-ATPase enzyme system (proton pump) at the gastric parietal cell.',
    dosageRanges: 'Adults: 40mg once daily in the morning, 30-60 minutes before breakfast.',
    commonSideEffects: ['Headache', 'Diarrhea', 'Flatulence', 'Abdominal discomfort', 'Constipation'],
    seriousSideEffects: ['Magnesium deficiency (long-term use >3 months)', 'Increased risk of bone fractures (long-term high dose)', 'Clostridium difficile intestinal infection'],
    drugInteractions: ['Atazanavir', 'Ketoconazole/Itraconazole', 'Methotrexate', 'Clopidogrel'],
    foodInteractions: ['Take on an empty stomach 30-60 minutes before the morning meal.'],
    precautions: {
      pregnancy: 'Category B. Use only if clearly needed and recommended by doctor.',
      breastfeeding: 'Excreted in human milk; evaluate benefit vs risk with physician.',
      kidney: 'No major dose adjustment needed, but monitor in chronic kidney disease.',
      liver: 'Maximum 20mg daily recommended in severe liver cirrhosis.'
    },
    storage: 'Store at room temperature below 30°C.',
    missedDose: 'Take before the next meal if remembered, or skip if near next day dose.',
    overdoseWarning: 'Unlikely to cause severe toxicity, but contact medical advice if large quantity consumed.',
    prescriptionStatus: 'Schedule H (Prescription Required)'
  },
  {
    id: 'med-5',
    name: 'Amoxicillin and Potassium Clavulanate',
    brandNames: ['Augmentin 625', 'Moxikind-CV 625', 'Clavam 625', 'Advent 625'],
    drugClass: 'Penicillin Antibiotic + Beta-Lactamase Inhibitor',
    uses: 'Bacterial infections of the respiratory tract, sinuses, ears, skin, urinary tract, and dental infections.',
    howItWorks: 'Amoxicillin inhibits bacterial cell wall synthesis while Clavulanic acid inactivates beta-lactamase enzymes produced by resistant bacteria.',
    dosageRanges: 'Adults: 625mg (500mg/125mg) twice daily for 5-7 days or as prescribed by a physician.',
    commonSideEffects: ['Nausea', 'Loose stools / Diarrhea', 'Vomiting', 'Skin rash', 'Fungal vaginal thrush'],
    seriousSideEffects: ['Severe allergic reaction (Anaphylaxis)', 'Severe Clostridium difficile diarrhea', 'Cholestatic jaundice / Hepatitis'],
    drugInteractions: ['Allopurinol (increases rash risk)', 'Oral Contraceptives (may slightly reduce effectiveness)', 'Warfarin / Blood thinners', 'Probenecid'],
    foodInteractions: ['Take at the start of a meal to enhance absorption and minimize stomach distress.'],
    precautions: {
      pregnancy: 'Category B. Generally considered safe when clearly needed.',
      breastfeeding: 'Small amounts pass into breast milk; monitor infant for diarrhea or rash.',
      kidney: 'Dose adjustment mandatory if eGFR < 30 mL/min.',
      liver: 'Use with caution; history of clavulanate-induced jaundice requires avoiding this med.'
    },
    storage: 'Store tablets below 25°C in original foil pack away from moisture.',
    missedDose: 'Take as soon as remembered. If close to next dose, skip missed dose. Complete full prescribed antibiotic course.',
    overdoseWarning: 'May cause gastrointestinal distress, fluid balance disturbance, or kidney crystallization. Seek prompt medical care.',
    prescriptionStatus: 'Schedule H (Prescription Required)'
  }
];

export class MedicineService {
  public static search(query: string): DetailedMedicine | null {
    const q = query.toLowerCase().trim();
    if (!q) return null;

    for (const med of VERIFIED_MEDICINE_DATABASE) {
      if (med.name.toLowerCase().includes(q)) return med;
      for (const b of med.brandNames) {
        if (b.toLowerCase().includes(q)) return med;
      }
    }
    return null;
  }

  public static getAllMedicines(): DetailedMedicine[] {
    return VERIFIED_MEDICINE_DATABASE;
  }
}
