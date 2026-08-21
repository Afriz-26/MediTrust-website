export interface MedicalTopic {
  id: string;
  category: string;
  title: string;
  overview: string;
  symptoms: string[];
  causes: string[];
  riskFactors: string[];
  diagnosisMethods: string[];
  treatmentOptions: string[];
  lifestyleManagement: string[];
  complications: string[];
  prevention: string[];
  emergencySigns: string[];
}

export const VERIFIED_KNOWLEDGE_BASE: MedicalTopic[] = [
  {
    id: 'topic-hypertension',
    category: 'Cardiology / Chronic Diseases',
    title: 'Hypertension (High Blood Pressure)',
    overview: 'A long-term medical condition in which the blood pressure in the arteries is persistently elevated (systolic >= 130 mmHg or diastolic >= 80 mmHg). Known as the "silent killer" because it often has no warning symptoms.',
    symptoms: [
      'Often asymptomatic in early stages',
      'Morning headaches in severe cases',
      'Dizziness or lightheadedness',
      'Blurred vision',
      'Shortness of breath with mild exertion'
    ],
    causes: [
      'Primary (Essential) Hypertension: Genetic factors, aging, lifestyle factors',
      'Secondary Hypertension: Kidney disease, thyroid dysfunction, sleep apnea, adrenal tumors, certain medications'
    ],
    riskFactors: ['High sodium intake', 'Sedentary lifestyle', 'Obesity', 'Smoking and alcohol', 'Chronic stress', 'Family history'],
    diagnosisMethods: ['Repeated blood pressure cuff measurements', '24-hour Ambulatory Blood Pressure Monitoring (ABPM)', 'ECG / Echocardiogram', 'Kidney function & blood lipid tests'],
    treatmentOptions: [
      'Lifestyle modifications (DASH Diet, low sodium <2g/day)',
      'First-line antihypertensives: ARBs (e.g. Telmisartan), ACE inhibitors (e.g. Enalapril), Calcium Channel Blockers (e.g. Amlodipine), Thiazide diuretics'
    ],
    lifestyleManagement: [
      'Reduce salt (sodium) consumption',
      'Engage in 150 minutes of moderate aerobic exercise per week',
      'Maintain healthy Body Mass Index (BMI 18.5 - 24.9)',
      'Manage stress through mindfulness or yoga',
      'Quit smoking and limit alcohol'
    ],
    complications: ['Coronary Artery Disease & Heart Attack', 'Stroke & TIA', 'Chronic Kidney Disease / Renal Failure', 'Retinopathy (Eye damage)'],
    prevention: ['Regular BP screenings every 6 months', 'Low-salt heart-healthy diet', 'Regular physical activity'],
    emergencySigns: ['Hypertensive Crisis (BP > 180/120 mmHg)', 'Severe crushing chest pain', 'Sudden numbness or paralysis in face/arm', 'Severe sudden headache with confusion']
  },
  {
    id: 'topic-diabetes-type-2',
    category: 'Endocrinology / Metabolism',
    title: 'Type 2 Diabetes Mellitus',
    overview: 'A metabolic disorder characterized by high blood glucose levels resulting from insulin resistance and progressive pancreatic beta-cell dysfunction.',
    symptoms: [
      'Polydipsia (excessive thirst)',
      'Polyuria (frequent urination, especially at night)',
      'Polyphagia (increased hunger)',
      'Unexplained weight loss or fatigue',
      'Slow-healing cuts or frequent infections',
      'Tingling or numbness in hands/feet'
    ],
    causes: ['Insulin resistance combined with impaired insulin secretion', 'Genetic predisposition and obesity'],
    riskFactors: ['Overweight/Obesity (BMI >23 in Asian populations)', 'Physical inactivity', 'First-degree relative with diabetes', 'PCOS in women', 'History of gestational diabetes'],
    diagnosisMethods: ['Fasting Plasma Glucose (FPG >= 126 mg/dL)', 'HbA1c test (>= 6.5%)', '2-hour Oral Glucose Tolerance Test (OGTT >= 200 mg/dL)'],
    treatmentOptions: [
      'First-line oral therapy: Metformin',
      'Second-line agents: SGLT2 inhibitors (Empagliflozin), DPP-4 inhibitors (Teneligliptin/Sitagliptin), GLP-1 agonists, Sulfonylureas',
      'Insulin therapy for advanced pancreatic fatigue'
    ],
    lifestyleManagement: [
      'Low Glycemic Index (GI) high-fiber diet',
      'Daily 30-minute brisk walk after meals',
      'Monitor self-blood glucose (SMBG) log regularly',
      'Routine foot inspections for ulcers'
    ],
    complications: ['Diabetic Neuropathy (nerve damage)', 'Diabetic Nephropathy (kidney damage)', 'Diabetic Retinopathy (vision loss)', 'Diabetic Foot Ulcers & Gangrene'],
    prevention: ['Annual HbA1c screening for adults >30 years', 'Calorie-controlled balanced diet', 'Weight management'],
    emergencySigns: ['Severe Hypoglycemia (sugar < 70 mg/dL with confusion/sweating)', 'Diabetic Ketoacidosis (DKA) or Hyperosmolar Hyperglycemic State (HHS) - confusion, fruity breath, severe dehydration']
  },
  {
    id: 'topic-first-aid-cpr',
    category: 'Emergency First Aid',
    title: 'Cardiopulmonary Resuscitation (CPR) & Emergency Response',
    overview: 'Immediate life-saving technique performed when someone has stopped breathing or their heart has stopped beating (cardiac arrest).',
    symptoms: ['Unresponsive victim', 'No normal breathing or only gasping', 'No palpable pulse'],
    causes: ['Sudden Cardiac Arrest', 'Drowning', 'Severe electrocution', 'Suffocation / Choking'],
    riskFactors: ['Pre-existing heart conditions', 'Severe trauma'],
    diagnosisMethods: ['Check responsiveness (tap shoulders & shout)', 'Check breathing for 5-10 seconds'],
    treatmentOptions: [
      '1. Call Emergency Services (108 in India) immediately or send someone to call',
      '2. Place victim on back on firm flat surface',
      '3. Place hands in center of chest (lower half of sternum)',
      '4. Push hard and fast: 100 to 120 compressions per minute at depth of 2-2.4 inches (5-6 cm)',
      '5. Allow full chest recoil after each compression',
      '6. If trained, give 2 rescue breaths after every 30 compressions',
      '7. Use an Automated External Defibrillator (AED) as soon as available'
    ],
    lifestyleManagement: ['Learn CPR certification hands-on'],
    complications: ['Rib fractures (acceptable trade-off to save life)'],
    prevention: ['Preventive heart health care'],
    emergencySigns: ['Unconsciousness with absent breathing - start CPR immediately!']
  }
];

export class MedicalKnowledgeService {
  public static searchKnowledge(query: string): MedicalTopic | null {
    const q = query.toLowerCase().trim();
    if (!q) return null;

    for (const topic of VERIFIED_KNOWLEDGE_BASE) {
      if (topic.title.toLowerCase().includes(q) || topic.category.toLowerCase().includes(q)) return topic;
      for (const s of topic.symptoms) {
        if (s.toLowerCase().includes(q)) return topic;
      }
    }
    return null;
  }
}
