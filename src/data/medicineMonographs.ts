export interface MedicineMonograph {
  id: string;
  name: string; // Generic / Active Salt Name
  brandNames: string[]; // Common Indian and Global Brands
  therapeuticCategory: string;
  drugClass: string;
  description: string;
  whyIsItUsed: {
    primaryIndications: string[];
    summary: string;
  };
  howToUse: {
    dosageForm: string;
    standardAdultDosage: string;
    administrationTiming: string;
    duration: string;
    foodAdvice: string;
    missedDoseAdvice: string;
  };
  sideEffects: {
    common: string[];
    serious: string[];
    whenToSeekDoctor: string;
  };
  precautionsAndWarnings: {
    pregnancy: string;
    breastfeeding: string;
    kidneyFunction: string;
    liverFunction: string;
    alcoholWarning: string;
    drivingWarning: string;
  };
  drugInteractions: string[];
  storageAdvice: string;
  overdoseProtocol: string;
  regulatoryStatus: {
    schedule: 'Schedule H' | 'Schedule H1' | 'Schedule X' | 'Over-the-Counter (OTC)';
    prescriptionRequired: boolean;
    cdscoStatus: string;
    dpcoCeilingCovered: boolean;
  };
}

export const VERIFIED_MONOGRAPHS: MedicineMonograph[] = [
  {
    id: 'paracetamol',
    name: 'Paracetamol (Acetaminophen)',
    brandNames: ['Dolo 650', 'Calpol 500/650', 'Crocin 650', 'Pacimol', 'Tylenol', 'Panadol'],
    therapeuticCategory: 'Analgesics & Antipyretics',
    drugClass: 'Non-Opioid Analgesic & Central Antipyretic',
    description: 'Paracetamol is one of the most widely used fever-reducing and mild-to-moderate pain-relieving agents in the world. It acts primarily in the central nervous system to reset the hypothalamic temperature center and inhibit pain sensation.',
    whyIsItUsed: {
      primaryIndications: [
        'Fever reduction in viral fevers, seasonal infections, and post-vaccination',
        'Mild to moderate headaches and tension headaches',
        'Body aches, toothache, and postoperative dental pain',
        'Musculoskeletal aches and mild osteoarthritis discomfort'
      ],
      summary: 'Used for the rapid symptomatic relief of high body temperature (fever) and alleviation of mild-to-moderate aches and body pain.'
    },
    howToUse: {
      dosageForm: 'Tablets, Oral Suspension, Drops, Intravenous (IV) Infusion',
      standardAdultDosage: '500 mg to 650 mg orally every 4 to 6 hours as needed. Maximum daily limit: 4,000 mg (4 grams) from all sources combined.',
      administrationTiming: 'Can be taken with or without food. Swallow tablets whole with a glass of water.',
      duration: 'Do not take for more than 3 consecutive days for fever or 5 days for pain without consulting a registered medical practitioner.',
      foodAdvice: 'Food does not affect absorption significantly, though taking with food can minimize rare mild stomach upset.',
      missedDoseAdvice: 'Take when needed. Do not double the dose to make up for a missed one. Maintain at least 4 hours between consecutive doses.'
    },
    sideEffects: {
      common: [
        'Generally extremely well tolerated at therapeutic doses',
        'Mild nausea or indigestion (rare)',
        'Mild dizziness or drowsiness'
      ],
      serious: [
        'Acute Liver Injury / Hepatotoxicity (chiefly associated with overdose exceeding 4g/day)',
        'Allergic skin reactions (Stevens-Johnson syndrome, toxic epidermal necrolysis - exceedingly rare)',
        'Thrombocytopenia or leucopenia with prolonged unmonitored use'
      ],
      whenToSeekDoctor: 'Seek emergency medical attention if you notice yellowing of the eyes/skin (jaundice), dark urine, persistent vomiting, or unexplained upper right abdominal pain.'
    },
    precautionsAndWarnings: {
      pregnancy: 'Considered the first-line antipyretic/analgesic during pregnancy when taken at the lowest effective dose for the shortest duration.',
      breastfeeding: 'Safe at recommended clinical doses. Small amounts excreted in breast milk are not known to cause harm to nursing infants.',
      kidneyFunction: 'Dose intervals should be increased to 6-8 hours in moderate-to-severe renal impairment (GFR < 30 mL/min).',
      liverFunction: 'Exercise extreme caution. Maximum daily dose should not exceed 2,000 mg in patients with hepatic disease or chronic alcohol use.',
      alcoholWarning: 'Avoid regular alcohol intake while taking paracetamol due to elevated risk of liver toxicity.',
      drivingWarning: 'Does not affect driving ability or machine operation.'
    },
    drugInteractions: [
      'Other paracetamol-containing cough/cold medicines (risk of accidental cumulative overdose)',
      'Warfarin / Acenocoumarol (regular high-dose paracetamol may potentiate anticoagulant effect)',
      'Isoniazid (antitubercular agent - increases hepatotoxic potential)',
      'Cholestyramine (delays paracetamol absorption)'
    ],
    storageAdvice: 'Store below 25°C in a dry place protected from direct heat and moisture. Keep out of reach of children.',
    overdoseProtocol: 'Paracetamol overdose is an acute medical emergency. Toxic liver damage may be silent for 24 hours. Intravenous N-acetylcysteine (NAC) is the specific antidote and should be administered as soon as possible in a hospital emergency room.',
    regulatoryStatus: {
      schedule: 'Over-the-Counter (OTC)',
      prescriptionRequired: false,
      cdscoStatus: 'Approved on National Essential Medicines List (NLEML / WHO EML)',
      dpcoCeilingCovered: true
    }
  },
  {
    id: 'telmisartan',
    name: 'Telmisartan',
    brandNames: ['Telma 40/80', 'Telmikind', 'Telvas', 'Tazloc', 'Cresar', 'Micardis'],
    therapeuticCategory: 'Cardiovascular & Antihypertensive',
    drugClass: 'Angiotensin II Receptor Blocker (ARB)',
    description: 'Telmisartan is a long-acting oral antihypertensive medication that specifically blocks the angiotensin II type 1 (AT1) receptor, promoting vasodilation, lowering systemic peripheral vascular resistance, and safeguarding cardiovascular and renal health.',
    whyIsItUsed: {
      primaryIndications: [
        'Essential hypertension (high blood pressure) in adults',
        'Cardiovascular risk reduction in patients aged 55+ with established coronary or peripheral vascular disease',
        'Renal protection in diabetic hypertensive patients'
      ],
      summary: 'Prescribed for consistent 24-hour blood pressure control and reduction of myocardial infarction, stroke, and cardiovascular death risks.'
    },
    howToUse: {
      dosageForm: 'Oral Tablets (20 mg, 40 mg, 80 mg)',
      standardAdultDosage: 'Usually started at 40 mg once daily. Can be titrated to 80 mg once daily based on blood pressure response.',
      administrationTiming: 'Take once daily at the same time each morning or evening, with or without food.',
      duration: 'Hypertension is generally a lifelong condition; medication should be continued as prescribed by your cardiologist.',
      foodAdvice: 'May be taken with or without food. Avoid potassium-enriched dietary salt substitutes unless approved by your physician.',
      missedDoseAdvice: 'Take the missed tablet as soon as you remember that day. If it is close to the next scheduled dose, skip the missed dose. Never take two tablets at once.'
    },
    sideEffects: {
      common: [
        'Mild lightheadedness or dizziness upon standing',
        'Sinus congestion, back pain, or fatigue',
        'Mild diarrhea or stomach discomfort'
      ],
      serious: [
        'Hyperkalemia (elevated blood potassium levels causing cardiac rhythm issues)',
        'Acute renal impairment in patients with bilateral renal artery stenosis or severe dehydration',
        'Hypotension (excessively low blood pressure causing syncope/fainting)',
        'Angioedema (swelling of face, lips, tongue, or airway - rare)'
      ],
      whenToSeekDoctor: 'Contact your physician immediately if you experience irregular heartbeats, severe lightheadedness, facial swelling, or marked reduction in urine output.'
    },
    precautionsAndWarnings: {
      pregnancy: 'STRICTLY CONTRAINDICATED in the 2nd and 3rd trimesters of pregnancy. Can cause severe fetal renal failure, skeletal malformations, and death.',
      breastfeeding: 'Not recommended during nursing due to absence of definitive safety data. Alternative antihypertensives are preferred.',
      kidneyFunction: 'Monitor serum creatinine and potassium levels regularly, especially when initiating therapy.',
      liverFunction: 'Contraindicated in severe hepatic impairment or biliary obstructive disorders; start with 20 mg once daily in mild impairment.',
      alcoholWarning: 'Alcohol increases the hypotensive effect, leading to pronounced dizziness and fall risk.',
      drivingWarning: 'Exercise caution until you know how the medication affects you, as occasional dizziness may occur during initial weeks.'
    },
    drugInteractions: [
      'Potassium supplements or potassium-sparing diuretics like Spironolactone (high risk of hyperkalemia)',
      'NSAIDs (e.g., Ibuprofen, Diclofenac) - may reduce antihypertensive effect and worsen kidney function',
      'Lithium (may increase serum lithium concentrations and toxicity)',
      'Aliskiren (concurrent use contraindicated in diabetic patients)'
    ],
    storageAdvice: 'Store below 30°C in the original moisture-barrier blister strip until immediately prior to administration.',
    overdoseProtocol: 'Primary symptoms of overdose are severe hypotension and tachycardia (or bradycardia). Medical management consists of supportive fluids, electrolyte monitoring, and recumbent positioning.',
    regulatoryStatus: {
      schedule: 'Schedule H',
      prescriptionRequired: true,
      cdscoStatus: 'CDSCO Approved Prescription Monograph (Schedule H)',
      dpcoCeilingCovered: true
    }
  },
  {
    id: 'metformin',
    name: 'Metformin Hydrochloride',
    brandNames: ['Glycomet 500/850/1000', 'Gluconorm', 'Glyciphage', 'Obimet', 'Glucophage'],
    therapeuticCategory: 'Antidiabetic / Endocrine',
    drugClass: 'Biguanide Oral Hypoglycemic Agent',
    description: 'Metformin is the gold-standard, first-line oral antidiabetic medicine for managing Type 2 Diabetes Mellitus. It suppresses excessive liver glucose production, reduces intestinal glucose absorption, and enhances peripheral insulin sensitivity without causing hypoglycemia.',
    whyIsItUsed: {
      primaryIndications: [
        'First-line treatment of Type 2 Diabetes Mellitus, particularly in overweight individuals',
        'Polycystic Ovary Syndrome (PCOS) with insulin resistance (off-label under gynecological supervision)',
        'Prevention of Type 2 Diabetes onset in prediabetic individuals with lifestyle modification failure'
      ],
      summary: 'Used to lower fasting and postprandial blood glucose, improve glycated hemoglobin (HbA1c), and reduce cardiovascular complications of diabetes.'
    },
    howToUse: {
      dosageForm: 'Immediate Release (IR) Tablets, Extended Release (ER / SR) Tablets',
      standardAdultDosage: 'Initiated at 500 mg once or twice daily with meals. May be titrated up to 2,000 mg daily in divided doses (e.g., 1,000 mg twice daily).',
      administrationTiming: 'ALWAYS take with or immediately after meals to reduce stomach upset and nausea.',
      duration: 'Long-term maintenance therapy for glycemic stability under regular HbA1c monitoring.',
      foodAdvice: 'Taking with main meals significantly alleviates transient gastrointestinal symptoms.',
      missedDoseAdvice: 'Take with the next meal. If it is already time for the next scheduled dose, skip the missed one. Do not double doses.'
    },
    sideEffects: {
      common: [
        'Nausea, loose stools, or mild diarrhea (typically transient during first 2 weeks)',
        'Metallic taste in mouth',
        'Abdominal bloating and flatulence',
        'Reduced appetite'
      ],
      serious: [
        'Lactic Acidosis (rare: ~3 cases per 100,000 patient-years, but serious with 50% mortality if unmanaged)',
        'Vitamin B12 deficiency with prolonged multi-year therapy (periodic serum B12 testing recommended)'
      ],
      whenToSeekDoctor: 'Emergency medical care required if signs of lactic acidosis appear: severe malaise, rapid breathing, muscle cramping, extreme fatigue, hypothermia, or acute abdominal pain.'
    },
    precautionsAndWarnings: {
      pregnancy: 'Category B. Used under close endocrinological guidance for gestational diabetes when diet alone is insufficient.',
      breastfeeding: 'Excreted in low levels in human milk. Discuss benefit-risk balance with the prescribing pediatrician/physician.',
      kidneyFunction: 'Contraindicated if estimated Glomerular Filtration Rate (eGFR) is below 30 mL/min/1.73m². Dose reduction needed if eGFR is 30-44 mL/min.',
      liverFunction: 'Avoid in acute or severe liver failure due to impaired lactic acid clearance.',
      alcoholWarning: 'Excessive acute or chronic alcohol intake significantly heightens the hazard of lactic acidosis and must be avoided.',
      drivingWarning: 'Does not impair driving; however, caution is warranted if combined with sulfonylureas or insulin which cause hypoglycemia.'
    },
    drugInteractions: [
      'Iodinated Radiological Contrast Media (must be withheld 48 hours prior to contrast imaging scans to prevent acute renal shutdown)',
      'Cimetidine & Ranolazine (reduce metformin renal clearance)',
      'Corticosteroids & Thiazide Diuretics (tend to elevate blood glucose and reduce metformin efficacy)',
      'Carbonic anhydrase inhibitors (e.g., Topiramate - increases lactic acidosis risk)'
    ],
    storageAdvice: 'Store between 20°C and 25°C away from humidity and direct sunlight.',
    overdoseProtocol: 'Metformin overdose can trigger severe lactic acidosis. Hemodialysis with bicarbonate is effective for rapid metformin clearance and acid-base correction.',
    regulatoryStatus: {
      schedule: 'Schedule H',
      prescriptionRequired: true,
      cdscoStatus: 'National Essential Medicine (NLEM) Schedule H Drug',
      dpcoCeilingCovered: true
    }
  },
  {
    id: 'pantoprazole',
    name: 'Pantoprazole Sodium',
    brandNames: ['Pan 40', 'Pantocid 40', 'Pantodac', 'Protonix', 'Pantop'],
    therapeuticCategory: 'Gastrointestinal & Acid Peptic Disorders',
    drugClass: 'Proton Pump Inhibitor (PPI)',
    description: 'Pantoprazole is an irreversible inhibitor of the gastric H+/K+-ATPase pump. It profoundly suppresses both basal and stimulated gastric acid production, providing rapid healing for erosive esophagitis, stomach ulcers, and acid reflux.',
    whyIsItUsed: {
      primaryIndications: [
        'Gastroesophageal Reflux Disease (GERD) and acid regurgitation / heartburn',
        'Gastric and duodenal peptic ulcers',
        'Prevention of NSAID-induced gastric mucosal injury in high-risk patients',
        'Zollinger-Ellison syndrome and other hypersecretory pathological conditions',
        'Eradication of Helicobacter pylori infection in combination with antibiotics'
      ],
      summary: 'Used for the targeted healing and symptomatic treatment of acid-peptic disease, severe heartburn, and gastroduodenal ulceration.'
    },
    howToUse: {
      dosageForm: 'Enteric-Coated Tablets (20 mg, 40 mg), IV Injection',
      standardAdultDosage: '40 mg once daily. For Zollinger-Ellison syndrome, higher divided doses (80 mg to 160 mg daily) may be prescribed.',
      administrationTiming: 'Take in the morning 30 to 60 minutes BEFORE breakfast with a full glass of water.',
      duration: 'Typical course is 4 to 8 weeks for GERD and active ulcers. Long-term continuous use requires periodic clinical review.',
      foodAdvice: 'Must be swallowed intact before food. Do not crush, chew, or split the enteric-coated tablet.',
      missedDoseAdvice: 'Take before the next meal if remembered on the same day. Do not take an extra dose the following morning.'
    },
    sideEffects: {
      common: [
        'Headache',
        'Mild diarrhea or constipation',
        'Abdominal flatulence or stomach cramps',
        'Nausea'
      ],
      serious: [
        'Clostridium difficile-associated diarrhea (pseudomembranous colitis)',
        'Hypomagnesemia (low blood magnesium with chronic use >1 year)',
        'Increased risk of osteoporosis-related hip/wrist/spine fractures with multi-year high-dose therapy',
        'Subacute cutaneous lupus erythematosus (SCLE - rare)',
        'Vitamin B12 malabsorption with long-term continuous use'
      ],
      whenToSeekDoctor: 'Inform your doctor if you experience persistent watery diarrhea with fever, muscle spasms or tremors (signs of low magnesium), or joint pain with skin rash.'
    },
    precautionsAndWarnings: {
      pregnancy: 'Category B. Used only when clearly indicated and prescribed by an obstetrician.',
      breastfeeding: 'Low concentrations detected in breast milk. Decision should be based on clinical necessity for the mother.',
      kidneyFunction: 'No dosage adjustment required in mild to severe renal impairment.',
      liverFunction: 'Maximum dose of 20 mg daily recommended in patients with severe hepatic cirrhosis.',
      alcoholWarning: 'Alcohol promotes gastric acid secretion and irritates the stomach lining, directly reducing therapy benefits.',
      drivingWarning: 'No negative impact on driving skills reported.'
    },
    drugInteractions: [
      'Clopidogrel (pantoprazole has lower CYP2C19 interaction compared to omeprazole, but clinical review advised)',
      'Ketoconazole, Itraconazole, Atazanavir (reduced antifungal absorption due to elevated gastric pH)',
      'Methotrexate (PPIs may decrease methotrexate clearance leading to toxic accumulation)',
      'Warfarin (occasional reports of INR elevation; monitor coagulation profiles)'
    ],
    storageAdvice: 'Store below 30°C in a dry area protected from moisture.',
    overdoseProtocol: 'Systemic toxicity from acute overdose is very low. Medical supervision and symptomatic supportive care are standard.',
    regulatoryStatus: {
      schedule: 'Schedule H',
      prescriptionRequired: true,
      cdscoStatus: 'Approved Schedule H Formulation under CDSCO',
      dpcoCeilingCovered: true
    }
  },
  {
    id: 'amoxicillin-clavulanate',
    name: 'Amoxicillin and Potassium Clavulanate',
    brandNames: ['Augmentin 625/1000', 'Moxikind-CV 625', 'Clavam 625', 'Advent 625', 'Sensiclav'],
    therapeuticCategory: 'Anti-Infective / Antibacterials',
    drugClass: 'Penicillin-Class Beta-Lactam + Beta-Lactamase Inhibitor',
    description: 'This synergistic antimicrobial formulation combines amoxicillin (a bactericidal antibiotic that inhibits bacterial cell wall synthesis) with clavulanate potassium (a beta-lactamase inhibitor that blocks enzymatic bacterial resistance mechanisms).',
    whyIsItUsed: {
      primaryIndications: [
        'Acute bacterial sinusitis and otitis media (middle ear infection)',
        'Lower respiratory tract infections (community-acquired pneumonia, acute exacerbation of chronic bronchitis)',
        'Skin and soft tissue infections (cellulitis, animal bites, abscesses)',
        'Urinary tract infections (UTIs) caused by beta-lactamase producing organisms',
        'Severe dental and odontogenic abscesses'
      ],
      summary: 'Used to treat moderate-to-severe bacterial infections caused by beta-lactamase producing bacteria resistant to standard amoxicillin alone.'
    },
    howToUse: {
      dosageForm: 'Tablets (375 mg, 625 mg, 1000 mg), Dry Syrup / Oral Suspension, IV Injection',
      standardAdultDosage: '625 mg (500 mg amoxicillin + 125 mg clavulanate) orally every 8 or 12 hours depending on infection severity.',
      administrationTiming: 'Take at the immediate START of a meal to enhance absorption and reduce gastrointestinal upset.',
      duration: 'Usually prescribed for 5 to 10 days. Always complete the entire prescribed course even if symptoms resolve earlier.',
      foodAdvice: 'Take with food or a snack. Do not take on a completely empty stomach.',
      missedDoseAdvice: 'Take as soon as remembered with food. If close to the next scheduled dose, skip the missed one. Never take a double dose.'
    },
    sideEffects: {
      common: [
        'Loose stools / Diarrhea (due to clavulanate effect on gut motility)',
        'Nausea and vomiting',
        'Oral thrush or vaginal candidiasis (fungal overgrowth)',
        'Mild skin rash or itching'
      ],
      serious: [
        'Severe Anaphylaxis / Type I allergic reaction (wheezing, facial swelling, urticaria, shock)',
        'Clostridioides difficile-associated colitis (severe pseudomembranous enterocolitis)',
        'Cholestatic jaundice and drug-induced liver injury (more common in elderly males)'
      ],
      whenToSeekDoctor: 'IMMEDIATE emergency hospitalization required if experiencing facial swelling, breathing difficulty, or widespread hives. Stop medication and consult a physician if severe watery diarrhea with fever occurs.'
    },
    precautionsAndWarnings: {
      pregnancy: 'Category B. Widely studied and generally considered safe when indicated; consult an obstetrician.',
      breastfeeding: 'Both amoxicillin and clavulanate pass into breast milk in trace amounts. Infant may experience mild diarrhea or thrush.',
      kidneyFunction: 'Dose interval must be extended (every 12 to 24 hours) if eGFR is < 30 mL/min. 1000 mg dosage should not be used in severe renal impairment.',
      liverFunction: 'Contraindicated in patients with a prior history of amoxicillin-clavulanate associated jaundice or hepatic dysfunction.',
      alcoholWarning: 'Moderate to heavy alcohol consumption should be avoided during active antibiotic treatment.',
      drivingWarning: 'No direct effect on alertness, but severe allergic reactions can impair performance.'
    },
    drugInteractions: [
      'Probenecid (decreases amoxicillin renal excretion leading to higher prolonged blood levels)',
      'Allopurinol (concurrent administration substantially increases the risk of erythematous skin rashes)',
      'Warfarin / Acenocoumarol (may prolong bleeding times; monitor INR)',
      'Oral Contraceptive Pills (may reduce gut flora responsible for estrogen reabsorption)'
    ],
    storageAdvice: 'Store tablets below 25°C in original moisture-tight aluminum blister. Reconstituted oral suspension must be stored in a refrigerator (2°C-8°C) and discarded after 7 days.',
    overdoseProtocol: 'Gastrointestinal symptoms and fluid/electrolyte balance disturbances may occur. Amoxicillin crystalluria has been noted with very large overdoses. Hemodialysis removes both agents from systemic circulation.',
    regulatoryStatus: {
      schedule: 'Schedule H1',
      prescriptionRequired: true,
      cdscoStatus: 'Strict Schedule H1 Antibiotic - Warning: Misuse leads to Antimicrobial Resistance (AMR)',
      dpcoCeilingCovered: true
    }
  },
  {
    id: 'azithromycin',
    name: 'Azithromycin Dihydrate',
    brandNames: ['Azithral 250/500', 'Azee', 'Zady', 'Zithromax', 'Azifast'],
    therapeuticCategory: 'Macrolide Antibacterial',
    drugClass: 'Azalide / Macrolide Antibiotic',
    description: 'Azithromycin is a broad-spectrum macrolide antibiotic that inhibits bacterial protein synthesis by binding to the 50S ribosomal subunit. It boasts extensive tissue penetration and an exceptionally long terminal half-life (~68 hours), permitting short 3 to 5 day treatment courses.',
    whyIsItUsed: {
      primaryIndications: [
        'Acute bacterial exacerbations of chronic obstructive pulmonary disease (COPD)',
        'Community-acquired pneumonia and atypical bacterial pneumonia',
        'Streptococcal pharyngitis / tonsillitis (alternative in penicillin-allergic patients)',
        'Uncomplicated skin and soft tissue infections',
        'Genitourinary tract infections (non-gonococcal urethritis and cervicitis caused by Chlamydia trachomatis)',
        'Enteric typhoid fever (uncomplicated cases)'
      ],
      summary: 'Prescribed for respiratory, skin, ENT, and reproductive tract bacterial infections with convenient once-daily dosing.'
    },
    howToUse: {
      dosageForm: 'Tablets (250 mg, 500 mg), Oral Suspensions (100 mg/5ml, 200 mg/5ml), IV Infusion',
      standardAdultDosage: '500 mg once daily for 3 consecutive days (total 1.5 g) OR 500 mg on day 1 followed by 250 mg once daily on days 2 to 5.',
      administrationTiming: 'Take once daily at the exact same hour each day. May be taken with or without food, though food minimizes mild nausea.',
      duration: 'Strictly adhere to the 3-day or 5-day course specified by your doctor.',
      foodAdvice: 'Tablets can be taken with food. Aluminum/magnesium antacids should not be consumed simultaneously.',
      missedDoseAdvice: 'Take the missed dose as soon as remembered. Do not take two doses at the same time to catch up.'
    },
    sideEffects: {
      common: [
        'Diarrhea or loose stools',
        'Nausea and abdominal discomfort / cramps',
        'Headache',
        'Altered sense of taste'
      ],
      serious: [
        'QTc Interval Prolongation & Ventricular Arrhythmias (Torsades de pointes) in high-risk cardiac patients',
        'Drug-induced liver injury / Cholestatic hepatitis',
        'Severe allergic reactions (angioedema, DRESS syndrome, anaphylaxis)',
        'Clostridioides difficile colitis'
      ],
      whenToSeekDoctor: 'Seek urgent clinical review if experiencing heart palpitations, sudden fainting, chest flutter, dark urine, or severe watery diarrhea.'
    },
    precautionsAndWarnings: {
      pregnancy: 'Category B. Animal studies reveal no evidence of fetal harm; used when clinically indicated under medical advice.',
      breastfeeding: 'Secreted in small amounts in breast milk. Generally considered compatible with nursing under pediatrician oversight.',
      kidneyFunction: 'No dose adjustment required in mild to moderate renal disease; use with caution in severe renal impairment (GFR < 10 mL/min).',
      liverFunction: 'Use with extreme caution in patients with hepatic disease as the liver is the principal route of azithromycin elimination.',
      alcoholWarning: 'Avoid heavy alcohol consumption which can compound gastrointestinal and hepatic irritation.',
      drivingWarning: 'May cause occasional dizziness or somnolence in susceptible individuals.'
    },
    drugInteractions: [
      'Antacids containing Aluminum or Magnesium (impair peak serum absorption; separate intake by 2 hours)',
      'Digoxin & Colchicine (P-glycoprotein inhibition may increase toxicity)',
      'Amiodarone, Sotalol, Antipsychotics (compound cardiac QT prolongation risk)',
      'Warfarin (monitor prothrombin time / INR regularly)'
    ],
    storageAdvice: 'Store below 30°C in a dry place away from direct heat and light.',
    overdoseProtocol: 'Adverse effects experienced in higher than recommended doses are similar to standard side effects (nausea, diarrhea, vomiting). General symptomatic care and gastric lavage are indicated.',
    regulatoryStatus: {
      schedule: 'Schedule H1',
      prescriptionRequired: true,
      cdscoStatus: 'Schedule H1 Controlled Antibiotic under Drugs & Cosmetics Rules',
      dpcoCeilingCovered: true
    }
  },
  {
    id: 'cetirizine',
    name: 'Cetirizine Hydrochloride',
    brandNames: ['Cetzine', 'AlERID', 'Zyrtec', 'Okacet', 'Incid-L'],
    therapeuticCategory: 'Antiallergic & Antihistaminic',
    drugClass: 'Second-Generation H1-Receptor Antagonist',
    description: 'Cetirizine is a potent, selective second-generation peripheral histamine H1-receptor antagonist. It effectively suppresses allergic inflammation, itching, sneezing, and watery eyes with significantly less sedation than first-generation antihistamines.',
    whyIsItUsed: {
      primaryIndications: [
        'Seasonal allergic rhinitis (hay fever) and perennial allergic rhinitis',
        'Chronic idiopathic urticaria (hives and itchy skin welts)',
        'Allergic conjunctivitis (itchy, watery, red eyes)',
        'Insect bite reactions and contact allergen flare-ups'
      ],
      summary: 'Used for rapid, 24-hour relief of allergic symptoms such as sneezing, runny nose, itching, and allergic skin hives.'
    },
    howToUse: {
      dosageForm: 'Tablets (5 mg, 10 mg), Oral Syrup (5 mg/5ml)',
      standardAdultDosage: '10 mg once daily orally (or 5 mg twice daily). In elderly patients, 5 mg daily is recommended initially.',
      administrationTiming: 'Best taken in the evening before bedtime, with or without food.',
      duration: 'Can be taken seasonally during allergy pollen blooms or as needed for acute allergic episodes.',
      foodAdvice: 'Food has negligible influence on the extent of cetirizine absorption.',
      missedDoseAdvice: 'Take the missed dose if symptoms persist. Do not double the dose.'
    },
    sideEffects: {
      common: [
        'Mild drowsiness or fatigue (substantially lower than Chlorpheniramine, but can occur)',
        'Dry mouth',
        'Mild headache',
        'Pharyngitis / throat dryness'
      ],
      serious: [
        'Urinary retention (primarily in males with benign prostatic hyperplasia)',
        'Severe paradoxical agitation or tremors (rare in children)',
        'Hypersensitivity reactions / Bronchospasm (extremely rare)'
      ],
      whenToSeekDoctor: 'Consult a physician if you experience difficulty passing urine, severe palpitations, or extreme restlessness.'
    },
    precautionsAndWarnings: {
      pregnancy: 'Category B. Extensive clinical data indicate no heightened risk of congenital anomalies when used in pregnancy under medical direction.',
      breastfeeding: 'Excreted in human milk; use only if the potential benefit justifies potential mild infant drowsiness.',
      kidneyFunction: 'Dosage must be halved (5 mg daily or alternate days) if creatinine clearance is below 30 mL/min. Contraindicated in end-stage renal disease on hemodialysis.',
      liverFunction: '5 mg daily dose is recommended in patients with combined hepatic and renal impairment.',
      alcoholWarning: 'Concurrent alcohol consumption potentiates central nervous system depression and somnolence.',
      drivingWarning: 'Although non-sedating for most patients, some individuals experience somnolence. Assess personal response before driving.'
    },
    drugInteractions: [
      'Central Nervous System depressants (sedatives, sleeping pills, tranquilizers - additive drowsiness)',
      'Theophylline (minor decrease in cetirizine clearance observed)',
      'Alcohol (increases risk of cognitive impairment)'
    ],
    storageAdvice: 'Store below 25°C in a dry environment protected from light.',
    overdoseProtocol: 'Overdose symptoms include extreme somnolence, agitation (in pediatric cases), tachycardia, and urinary retention. Gastric lavage and supportive care are administered.',
    regulatoryStatus: {
      schedule: 'Schedule H',
      prescriptionRequired: true,
      cdscoStatus: 'Approved Antihistamine Monograph',
      dpcoCeilingCovered: true
    }
  },
  {
    id: 'atorvastatin',
    name: 'Atorvastatin Calcium',
    brandNames: ['Atorva 10/20/40', 'Lipitor', 'Storvas', 'Atocor', 'Tonact'],
    therapeuticCategory: 'Lipid-Lowering & Cardiovascular',
    drugClass: 'HMG-CoA Reductase Inhibitor (Statin)',
    description: 'Atorvastatin competitively inhibits HMG-CoA reductase, the rate-limiting enzyme in hepatic cholesterol biosynthesis. It substantially lowers circulating Low-Density Lipoprotein Cholesterol (LDL-C) and triglycerides while elevating High-Density Lipoprotein (HDL-C), stabilizing atherosclerotic arterial plaques.',
    whyIsItUsed: {
      primaryIndications: [
        'Primary hypercholesterolemia and combined mixed dyslipidemia',
        'Primary prevention of cardiovascular disease in patients at high risk of myocardial infarction or stroke',
        'Secondary prevention of recurrent cardiovascular events in established coronary heart disease',
        'Slowing progression of coronary atherosclerosis'
      ],
      summary: 'Prescribed to lower bad cholesterol (LDL-C) and triglycerides, and substantially decrease the hazard of heart attacks and strokes.'
    },
    howToUse: {
      dosageForm: 'Oral Film-Coated Tablets (10 mg, 20 mg, 40 mg, 80 mg)',
      standardAdultDosage: 'Initial dosage is typically 10 mg or 20 mg once daily. High-intensity statin therapy uses 40 mg to 80 mg once daily.',
      administrationTiming: 'Take once daily at any time of the day, with or without food. Because cholesterol synthesis peaks at night, evening administration is common.',
      duration: 'Long-term continuous therapy combined with a heart-healthy diet and active physical routine.',
      foodAdvice: 'Avoid consuming large quantities of grapefruit juice (>1 liter daily) which impairs CYP3A4 metabolism.',
      missedDoseAdvice: 'Take the missed tablet if remembered within 12 hours. If more than 12 hours have elapsed, skip and take the next dose at the standard time.'
    },
    sideEffects: {
      common: [
        'Mild muscle aches (myalgia) or joint stiffness',
        'Nasopharyngitis or sinus congestion',
        'Mild elevation of fasting blood glucose / HbA1c',
        'Indigestion or flatulence'
      ],
      serious: [
        'Rhabdomyolysis (severe skeletal muscle breakdown with myoglobinuria and acute kidney injury - rare, <0.1%)',
        'Drug-induced hepatotoxicity / clinically significant transaminase elevations (>3x upper limit of normal)',
        'Immune-mediated necrotizing myopathy (IMNM - very rare)'
      ],
      whenToSeekDoctor: 'Contact your cardiologist immediately if you experience unexplained, persistent muscle pain, tenderness, or weakness, especially accompanied by fever or brown (cola-colored) urine.'
    },
    precautionsAndWarnings: {
      pregnancy: 'STRICTLY CONTRAINDICATED in pregnancy. Cholesterol is crucial for fetal embryogenesis; statins may cause fetal harm.',
      breastfeeding: 'Contraindicated during lactation due to potential adverse effects on infant lipid metabolism.',
      kidneyFunction: 'Renal impairment does not significantly influence atorvastatin plasma levels; no dose adjustment needed.',
      liverFunction: 'Contraindicated in active liver disease or unexplained persistent elevations of serum transaminases.',
      alcoholWarning: 'Substantial alcohol consumption increases the hazard of hepatic inflammation and muscle pathology.',
      drivingWarning: 'No noticeable effect on ability to drive or use machinery.'
    },
    drugInteractions: [
      'Strong CYP3A4 Inhibitors (Ketoconazole, Clarithromycin, Itraconazole, Ritonavir - dramatically increases statin blood levels and myopathy risk)',
      'Cyclosporine and Gemfibrozil (strongly heighten rhabdomyolysis risk; avoid co-administration)',
      'Digoxin (slight increase in steady-state digoxin concentrations)',
      'Oral Contraceptives (may increase ethinyl estradiol and norethindrone plasma concentrations)'
    ],
    storageAdvice: 'Store below 25°C in a dry place protected from excessive moisture.',
    overdoseProtocol: 'No specific antidote exists. In the event of overdose, patient should be treated symptomatically and liver function along with serum creatine kinase (CK) levels monitored.',
    regulatoryStatus: {
      schedule: 'Schedule H',
      prescriptionRequired: true,
      cdscoStatus: 'Approved Schedule H Lipid Lowering Monograph',
      dpcoCeilingCovered: true
    }
  }
];

export function findMedicineMonograph(query: string): MedicineMonograph | null {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  for (const item of VERIFIED_MONOGRAPHS) {
    if (item.name.toLowerCase().includes(q)) return item;
    if (item.id.toLowerCase().includes(q)) return item;
    for (const b of item.brandNames) {
      if (b.toLowerCase().includes(q)) return item;
    }
    if (item.therapeuticCategory.toLowerCase().includes(q)) return item;
  }
  return null;
}
