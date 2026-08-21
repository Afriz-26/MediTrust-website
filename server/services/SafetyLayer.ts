export interface EmergencyAnalysis {
  isEmergency: boolean;
  triggerKeywords: string[];
  severityLevel: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  immediateGuidance: string;
}

export class SafetyLayer {
  private static EMERGENCY_PATTERNS = [
    { pattern: /(chest pain|chest pressure|crushing chest|heart attack|cardiac arrest)/i, label: 'Possible Cardiac Event', level: 'CRITICAL' as const },
    { pattern: /(difficulty breathing|can't breathe|gasping for air|shortness of breath|choking)/i, label: 'Respiratory Distress', level: 'CRITICAL' as const },
    { pattern: /(face drooping|arm weakness|speech slurring|stroke|paralysis|sudden numbness)/i, label: 'Possible Stroke (FAST)', level: 'CRITICAL' as const },
    { pattern: /(uncontrollable bleeding|severe blood loss|coughing up blood|vomiting blood)/i, label: 'Severe Hemorrhage', level: 'CRITICAL' as const },
    { pattern: /(unconscious|fainted|unresponsive|passing out|seizure|fits|convulsions)/i, label: 'Loss of Consciousness / Seizure', level: 'CRITICAL' as const },
    { pattern: /(anaphylaxis|severe allergic reaction|throat swelling|swollen tongue)/i, label: 'Anaphylactic Reaction', level: 'CRITICAL' as const },
    { pattern: /(severe head injury|skull fracture|uncontrolled trauma)/i, label: 'Severe Trauma', level: 'HIGH' as const },
    { pattern: /(thoughts of self harm|suicide|suicidal|end my life)/i, label: 'Mental Health Crisis', level: 'CRITICAL' as const }
  ];

  public static analyzeEmergency(query: string): EmergencyAnalysis {
    const text = query.trim();
    const matches: string[] = [];
    let maxLevel: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW' = 'LOW';

    for (const item of this.EMERGENCY_PATTERNS) {
      if (item.pattern.test(text)) {
        matches.push(item.label);
        if (item.level === 'CRITICAL') maxLevel = 'CRITICAL';
        else if (item.level === 'HIGH' && maxLevel !== 'CRITICAL') maxLevel = 'HIGH';
      }
    }

    if (matches.length > 0) {
      return {
        isEmergency: true,
        triggerKeywords: matches,
        severityLevel: maxLevel,
        immediateGuidance: `🚨 **MEDICAL EMERGENCY ALERT:** If you or someone around you is experiencing ${matches.join(', ')}, please seek **IMMEDIATE EMERGENCY CARE** or call local emergency services immediately (**108** in India, or your local emergency hotline). Do NOT delay emergency care for an online response.`
      };
    }

    return {
      isEmergency: false,
      triggerKeywords: [],
      severityLevel: 'LOW',
      immediateGuidance: ''
    };
  }

  public static getDisclaimerBanner(language: string = 'English'): string {
    if (language.includes('Telugu')) {
      return `\n\n--- \n*గమనిక: MediTrust AI సమాచారం మరియు విద్యా ప్రయోజనాల కోసం మాత్రమే మార్గదర్శకత్వం అందిస్తుంది. ఇది వైద్య నిర్ధారణకు ప్రత్యమ్నాయం కాదు. అత్యవసర పరిస్థితిలో సమీపంలోని ఆసుపత్రిని సంప్రదించండి.*`;
    }
    if (language.includes('Hindi')) {
      return `\n\n--- \n*अस्वीकरण: MediTrust AI केवल सूचना और शैक्षणिक उद्देश्यों के लिए मार्गदर्शन प्रदान करता है। यह डॉक्टरी सलाह या इलाज का विकल्प नहीं है। किसी भी आपात स्थिति में निकटतम अस्पताल संपर्क करें।*`;
    }
    return `\n\n--- \n*Medical Disclaimer: MediTrust AI provides educational information and triage guidance. It is not a substitute for professional clinical advice, diagnosis, or treatment. Always consult a licensed physician for personal medical concerns.*`;
  }
}
