import axios from 'axios';
import { Doctor, Hospital, Pharmacy, Laboratory, Appointment, DigitalPrescription, QueueToken, JobPosition, InternshipProgram, NewsArticle } from '../types';

const API_BASE_URL = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_API_BASE_URL || '/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add Auth Token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('medynex_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock Fallback Data for Frontend Development & Preview
export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Ananya Sharma',
    specialty: 'Cardiology',
    qualification: 'MD, DM (Cardiology), AIIMS New Delhi',
    experienceYears: 14,
    hospitalName: 'MediTrust Heart Institute, Hyderabad',
    location: 'Banjara Hills, Hyderabad',
    rating: 4.9,
    reviewCount: 382,
    consultationFee: 800,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Today, 02:30 PM',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    bio: 'Pioneer in interventional cardiology and non-invasive preventive cardiac care. Over 14 years of clinical excellence.',
    languages: ['English', 'Hindi', 'Telugu']
  },
  {
    id: 'doc-2',
    name: 'Dr. Rajesh Nair',
    specialty: 'Neurology',
    qualification: 'MBBS, DNB (Neurology), FRCP London',
    experienceYears: 18,
    hospitalName: 'Medynex Neuro Care, Bengaluru',
    location: 'Indiranagar, Bengaluru',
    rating: 4.8,
    reviewCount: 294,
    consultationFee: 1000,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Tomorrow, 10:00 AM',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    bio: 'Specialist in stroke management, epilepsy, and neuro-degenerative disorders with extensive research background.',
    languages: ['English', 'Hindi', 'Kannada', 'Malayalam']
  },
  {
    id: 'doc-3',
    name: 'Dr. Priya Venkatesh',
    specialty: 'Pediatrics',
    qualification: 'MD (Pediatrics), DCH',
    experienceYears: 10,
    hospitalName: 'MediTrust Mother & Child Centre, Chennai',
    location: 'Adyar, Chennai',
    rating: 4.95,
    reviewCount: 512,
    consultationFee: 600,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Today, 04:00 PM',
    image: 'https://images.unsplash.com/photo-1594824813566-888242a45d62?auto=format&fit=crop&q=80&w=400',
    bio: 'Compassionate pediatric specialist focusing on childhood nutrition, developmental milestones, and immunization.',
    languages: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'doc-4',
    name: 'Dr. Vikramaditya Sen',
    specialty: 'Orthopedics',
    qualification: 'MS (Ortho), Fellowship in Joint Replacement (UK)',
    experienceYears: 16,
    hospitalName: 'MediTrust OrthoCare, Mumbai',
    location: 'Bandra West, Mumbai',
    rating: 4.85,
    reviewCount: 420,
    consultationFee: 900,
    availableOnline: true,
    availableOffline: true,
    nextAvailable: 'Tomorrow, 11:30 AM',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    bio: 'Expert in robotic joint replacement, sports injury rehabilitation, and arthroscopic surgeries.',
    languages: ['English', 'Hindi', 'Marathi', 'Bengali']
  }
];

export const MOCK_HOSPITALS: Hospital[] = [];

export const MOCK_PHARMACIES: Pharmacy[] = [
  {
    id: 'pharm-1',
    name: 'MediTrust Express Pharmacy',
    address: 'Road No. 36, Jubilee Hills',
    city: 'Hyderabad',
    rating: 4.9,
    deliveryAvailable: true,
    open24x7: true,
    phone: '+91 98765 43210',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=600',
    inStockMedicinesCount: 14500,
    onboardingStatus: 'Active'
  },
  {
    id: 'pharm-2',
    name: 'Medynex Digital Wellness Pharmacy',
    address: '100 Feet Road, Koramangala',
    city: 'Bengaluru',
    rating: 4.85,
    deliveryAvailable: true,
    open24x7: true,
    phone: '+91 98765 12345',
    image: 'https://images.unsplash.com/photo-1586015555751-63c20202e88a?auto=format&fit=crop&q=80&w=600',
    inStockMedicinesCount: 18200,
    onboardingStatus: 'Active'
  },
  {
    id: 'pharm-3',
    name: 'Sri Mallikarjuna Medical & General Stores',
    address: 'Main Road, Opp Area Hospital',
    city: 'Kanigiri',
    rating: 4.75,
    deliveryAvailable: true,
    open24x7: false,
    phone: '+91 8596 220888',
    image: 'https://images.unsplash.com/photo-1586015555751-63c20202e88a?auto=format&fit=crop&q=80&w=600',
    inStockMedicinesCount: 8400,
    onboardingStatus: 'Not Yet Onboarded'
  },
  {
    id: 'pharm-4',
    name: 'Apollo Pharmacy - Kanigiri Branch',
    address: 'RTC Bus Stand Road',
    city: 'Kanigiri',
    rating: 4.8,
    deliveryAvailable: true,
    open24x7: true,
    phone: '+91 8596 221444',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=600',
    inStockMedicinesCount: 12100,
    onboardingStatus: 'Not Yet Onboarded'
  }
];

export const MOCK_LABS: Laboratory[] = [];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    patientName: 'Siddharth Varma',
    doctorName: 'Dr. Ananya Sharma',
    specialty: 'Cardiology',
    hospitalName: 'MediTrust Heart Institute',
    date: '2026-08-02',
    time: '10:30 AM',
    type: 'In-Person OPD',
    status: 'Confirmed',
    tokenNumber: 'TK-014'
  },
  {
    id: 'apt-102',
    patientName: 'Siddharth Varma',
    doctorName: 'Dr. Rajesh Nair',
    specialty: 'Neurology',
    hospitalName: 'Medynex Neuro Care',
    date: '2026-08-05',
    time: '03:15 PM',
    type: 'Online Video',
    status: 'Confirmed',
    tokenNumber: 'TK-008'
  }
];

export const MOCK_PRESCRIPTIONS: DigitalPrescription[] = [
  {
    id: 'rx-9001',
    doctorName: 'Dr. Ananya Sharma',
    patientName: 'Siddharth Varma',
    diagnosis: 'Mild Hypertension & Seasonal Allergic Rhinitis',
    date: '2026-07-28',
    medicines: [
      { name: 'Telmisartan 40mg', dosage: '1 Tablet', frequency: 'Once Daily (Morning)', duration: '30 Days', instructions: 'Take after breakfast with water' },
      { name: 'Cetirizine 10mg', dosage: '1 Tablet', frequency: 'Once Daily (Night)', duration: '7 Days', instructions: 'Take before sleep' }
    ],
    notes: 'Reduce dietary sodium intake. Recheck blood pressure in 2 weeks.',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MEDITRUST-RX-9001-VERIFIED'
  }
];

export const MOCK_QUEUE_TOKENS: QueueToken[] = [
  {
    id: 'q-1',
    tokenNumber: 'TK-014',
    patientName: 'Siddharth Varma',
    department: 'Cardiology OPD Room 3',
    doctorName: 'Dr. Ananya Sharma',
    estimatedWaitMinutes: 12,
    status: 'Waiting',
    currentServingToken: 'TK-011'
  }
];

export const MOCK_JOBS: JobPosition[] = [
  {
    id: 'job-1',
    title: 'Senior HealthTech Full-Stack Architect',
    department: 'Core Engineering',
    location: 'Hyderabad / Bengaluru / Remote',
    type: 'Full-Time',
    experienceRequired: '5+ Years',
    summary: 'Lead the architecture of the MediTrust core interoperable health engine, handling real-time queue tokens, FHIR/ABDM data standards, and HIPAA compliant API gateways.',
    responsibilities: [
      'Design microservices architecture for multi-tenant hospital EMR integrations.',
      'Optimize WebSockets for sub-second digital token queue notifications.',
      'Implement strict encryption at rest and in transit.'
    ],
    requirements: ['Proficiency in TypeScript, Node.js, Express, Next.js/React', 'Experience with PostgreSQL/Supabase, Redis', 'Familiarity with ABDM & FHIR standards is a plus'],
    postedDate: 'July 25, 2026'
  },
  {
    id: 'job-2',
    title: 'AI / Clinical Decision Support Engineer',
    department: 'Medynex AI Lab',
    location: 'Hyderabad / Hybrid',
    type: 'Full-Time',
    experienceRequired: '3+ Years',
    summary: 'Develop generative and conversational AI models powering the Medynex AI Assistant for symptom guidance, multilingual consultation summary, and automated prescription triaging.',
    responsibilities: [
      'Fine-tune multimodal LLMs on verified medical knowledge bases.',
      'Maintain strict guardrails and clinical accuracy verification pipelines.',
      'Integrate voice processing for regional Indian languages.'
    ],
    requirements: ['Deep understanding of LLMs, Python, PyTorch, LangChain/LlamaIndex', 'Experience deploying scalable inference servers on Cloud Run / Vercel'],
    postedDate: 'July 28, 2026'
  }
];

export const MOCK_INTERNSHIPS: InternshipProgram[] = [
  {
    id: 'intern-1',
    title: 'Healthcare AI Fellowship',
    track: 'AI & Machine Learning',
    durationMonths: 6,
    stipend: '₹25,000 / month',
    location: 'Remote / Hybrid (Hyderabad / Tirupati)',
    mode: 'Hybrid / Remote',
    eligibility: 'B.Tech / M.Tech / MCA / Data Science (3rd, Final Year & Graduates)',
    certificate: 'Verifiable Digital ISO-Compliant Fellowship Certificate',
    ppoEligibility: 'Full PPO Opportunity based on 6-month performance evaluation',
    learningOutcomes: [
      'Clinical Decision Support System (CDSS) fine-tuning with Gemini API',
      'Multilingual medical voice processing & Indian regional language models',
      'HIPAA/ABDM compliant AI pipelines & medical image analysis'
    ],
    responsibilities: [
      'Build and test medical LLM prompts and clinical decision guardrails',
      'Develop real-time symptom triage models and diagnostic assistants',
      'Optimize AI inference latency for mobile healthcare apps'
    ],
    benefits: [
      'Direct mentorship from Founder Shaik Afriz & AI engineering leads',
      'Access to GPU compute clusters and real-world clinical datasets',
      'Performance stipend + Certificate + PPO Consideration'
    ],
    requirements: ['Python, PyTorch, TypeScript, LLM Fine-tuning/Prompting', 'Basic knowledge of healthcare data standards']
  },
  {
    id: 'intern-2',
    title: 'Software Engineering Fellowship',
    track: 'Full-Stack Software Engineering',
    durationMonths: 6,
    stipend: '₹22,000 / month',
    location: 'Remote / Tirupati / Hyderabad',
    mode: 'Hybrid / Remote',
    eligibility: 'B.Tech / B.E / M.Tech / MCA (CS, IT, ECE)',
    certificate: 'Verifiable Digital Fellowship Certificate & Letter of Recommendation',
    ppoEligibility: 'High Priority PPO Eligibility for Senior Software Engineer Roles',
    learningOutcomes: [
      'Scalable WebSockets for real-time OPD token queues',
      'REST API design for doctor, pharmacy, and laboratory systems',
      'Microservices deployment on Docker & GCP Cloud Run'
    ],
    responsibilities: [
      'Write clean, modular React, TypeScript, and Express code',
      'Integrate payment gateways, e-prescriptions, and SMS/WhatsApp notifications',
      'Perform code reviews, unit testing, and API performance optimization'
    ],
    benefits: [
      'Hands-on experience on live software used by 50+ partner hospitals',
      'Individual code reviews from senior architects',
      'Competitive stipend and fast-track hiring'
    ],
    requirements: ['React, Node.js, TypeScript, PostgreSQL or Firestore', 'Git, REST APIs']
  },
  {
    id: 'intern-3',
    title: 'UI/UX Design Fellowship',
    track: 'Product Design & Ergonomics',
    durationMonths: 4,
    stipend: '₹18,000 / month',
    location: 'Remote / Tirupati',
    mode: 'Remote / Hybrid',
    eligibility: 'All Streams, B.Des, B.Tech, or self-taught UI/UX designers',
    certificate: 'Digital Design Fellowship Certificate & Project Portfolio Feature',
    ppoEligibility: 'PPO Eligibility for Product Designer Roles',
    learningOutcomes: [
      'Design systems for high-accessibility clinical interfaces',
      'Mobile-first responsive design for patients, doctors & pharmacists',
      'Usability testing with real doctors and hospital staff'
    ],
    responsibilities: [
      'Create high-fidelity Figma mockups, interactive prototypes, and component libraries',
      'Conduct user interviews with healthcare providers and patients',
      'Audit UI/UX contrast, touch targets, and accessibility'
    ],
    benefits: [
      'Build a top-tier portfolio featuring real healthcare products',
      'Design system design experience under founder guidance',
      'Stipend + Verified Certificate'
    ],
    requirements: ['Figma, Design Systems, Mobile & Web Prototyping', 'Strong design portfolio']
  },
  {
    id: 'intern-4',
    title: 'Healthcare Operations Fellowship',
    track: 'Hospital & Clinical Operations',
    durationMonths: 6,
    stipend: '₹18,000 / month',
    location: 'On-site / Tirupati / Hyderabad / Vijayawada',
    mode: 'On-site / Hybrid',
    eligibility: 'BBA, MBA, MHA, B.Pharm, Pharm.D, BSc Healthcare',
    certificate: 'Certified Healthcare Operations Specialist Certificate',
    ppoEligibility: 'PPO for Operations Manager & Onboarding Lead roles',
    learningOutcomes: [
      'Hospital OPD queue workflow analysis & bed management setup',
      'Onboarding doctor clinics, pharmacies, and diagnostic laboratories',
      'ABDM health ID integration compliance & clinic operations'
    ],
    responsibilities: [
      'Coordinate directly with hospital administrators and clinic staff',
      'Train doctors and receptionists on MediTrust token software',
      'Gather operational feedback and optimize queue token turnover'
    ],
    benefits: [
      'Direct exposure to hospital C-suite executives and medical directors',
      'Field travel allowances + Stipend + Certificate',
      'PPO for top performers'
    ],
    requirements: ['Strong communication & leadership skills', 'Interest in hospital management & HealthTech']
  },
  {
    id: 'intern-5',
    title: 'Product Management Fellowship',
    track: 'HealthTech Product Management',
    durationMonths: 6,
    stipend: '₹20,000 / month',
    location: 'Remote / Hybrid',
    mode: 'Hybrid / Remote',
    eligibility: 'B.Tech + MBA, Final Year Students or Recent Graduates',
    certificate: 'Product Management Fellowship Certificate & LOR',
    ppoEligibility: 'PPO Eligibility for Associate Product Manager (APM)',
    learningOutcomes: [
      'Product PRDs (Product Requirement Documents) writing for clinical software',
      'User journey mapping & feature prioritization frameworks (RICE, Kano)',
      'Metrics tracking (MAU, DAU, appointment completion rate, retention)'
    ],
    responsibilities: [
      'Work between engineering, design, and clinical teams to scope new features',
      'Define sprint backlogs and accept criteria for MediTrust updates',
      'Analyze user drop-offs and conduct competitive benchmarking'
    ],
    benefits: [
      'Direct mentorship from Product Leaders',
      'Shipped product features in production',
      'Stipend + LOR + PPO'
    ],
    requirements: ['Agile/Scrum knowledge, Wireframing, Data Analytics', 'Strong problem-solving mindset']
  },
  {
    id: 'intern-6',
    title: 'Digital Marketing Fellowship',
    track: 'Growth & Brand Marketing',
    durationMonths: 3,
    stipend: '₹15,000 / month',
    location: 'Remote',
    mode: 'Remote',
    eligibility: 'BBA, MBA, Mass Comm, B.Tech (All Streams)',
    certificate: 'Digital Marketing Fellowship Certificate',
    ppoEligibility: 'PPO for Growth Marketing Specialist',
    learningOutcomes: [
      'Healthcare SEO & content strategy for patient awareness',
      'Social media growth hacking & hospital B2B outreach campaigns',
      'Performance marketing on Google Ads & Meta Ads for healthcare'
    ],
    responsibilities: [
      'Create engaging medical awareness posts, videos, and infographics',
      'Optimize landing pages for patient searches (Doctors near me, Lab tests)',
      'Manage Medynex LinkedIn, YouTube, and Twitter channels'
    ],
    benefits: [
      'Live ad spend management experience',
      'Mentorship from growth strategists',
      'Stipend + Certificate'
    ],
    requirements: ['Content Writing, SEO basics, Social Media tools, Canva/Adobe']
  },
  {
    id: 'intern-7',
    title: 'Campus Ambassador Program',
    track: 'Student Leadership & Community Outreach',
    durationMonths: 3,
    stipend: 'Performance Incentives + Certificates + LOR',
    location: 'Your College Campus (Remote)',
    mode: 'Remote / On-Campus',
    eligibility: 'Open to ALL college students across India',
    certificate: 'National HealthTech Campus Leader Certificate',
    ppoEligibility: 'Priority consideration for all Medynex Fellowship & Full-time hiring',
    learningOutcomes: [
      'Community building & event management in colleges',
      'Public speaking, brand advocacy & leadership skills',
      'Direct connection with Medynex leadership network'
    ],
    responsibilities: [
      'Represent Medynex Solutions LLP in your university/college',
      'Organize health tech awareness sessions and hackathon delegations',
      'Spread awareness about digital health IDs (ABHA) and MediTrust apps'
    ],
    benefits: [
      'Exclusive Medynex Goodies, Swag & Leaderboard cash rewards',
      'Certificate of Merit & Letter of Recommendation from Shaik Afriz',
      'Direct entry to Fellowship interview rounds'
    ],
    requirements: ['Active student in any college/university', 'Enthusiastic leader with strong network']
  }
];

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Medynex Solutions LLP Unveils MediTrust 2.0 Ecosystem for Seamless ABDM Integration',
    slug: 'medynex-unveils-meditrust-2-0',
    summary: 'Connecting hospitals, pharmacies, diagnostic labs, and patients with real-time digital queue management and unified health ID records.',
    content: 'Medynex Solutions LLP has officially released MediTrust 2.0, a landmark health-tech platform bringing unprecedented interoperability to India’s healthcare ecosystem. Powered by robust cloud architecture and AI-driven clinical tools, MediTrust provides patients with instant digital tokens, verified doctor scheduling, and unified digital prescriptions.',
    category: 'Product Launch',
    author: 'Medynex Tech Bureau',
    publishedAt: 'July 20, 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'news-2',
    title: 'How Digital Tokens and OPD Queue Optimization Reduce Patient Hospital Wait Times by 65%',
    slug: 'digital-tokens-reduce-wait-times',
    summary: 'Case study across 50 partner hospitals demonstrating how MediTrust live queue tracking streamlines outpatient departments.',
    content: 'Waiting in crowded hospital corridors is fast becoming a thing of the past. MediTrust’s dynamic queue token technology notifies patients on their smartphones about exact consultation schedules, enabling staggering arrival times and improving doctor productivity.',
    category: 'Case Study',
    author: 'Dr. MediTrust Research Team',
    publishedAt: 'July 15, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600'
  }
];
