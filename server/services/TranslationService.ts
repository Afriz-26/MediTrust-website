export type SupportedLanguage = 
  | 'English'
  | 'Hindi (हिंदी)'
  | 'Telugu (తెలుగు)'
  | 'Tamil (தமிழ்)'
  | 'Kannada (ಕನ್ನಡ)'
  | 'Malayalam (മലയാളം)'
  | 'Marathi (मराठी)'
  | 'Bengali (বাংলা)'
  | 'Gujarati (ગુજરાતી)'
  | 'Punjabi (ਪੰਜਾਬੀ)'
  | 'Urdu (اردو)';

export class TranslationService {
  public static getLanguagePromptInstruction(language: string): string {
    if (!language || language === 'English') {
      return 'Respond fluently in clear, compassionate English. Maintain standard medical terminology translated into easy-to-understand explanations.';
    }

    return `CRITICAL LANGUAGE REQUIREMENT: The user's preferred language is ${language}. You MUST formulate your entire response in native, fluent, grammatically flawless ${language}. Write naturally in the native script of ${language} (e.g. Devanagari script for Hindi/Marathi, Telugu script for Telugu, Tamil script for Tamil, Kannada script for Kannada, etc.). Ensure all medical advice, disclaimers, symptom breakdowns, and next steps are clearly expressed in ${language}.`;
  }

  public static detectLanguageFromText(text: string): string {
    if (/[\u0C00-\u0C7F]/.test(text)) return 'Telugu (తెలుగు)';
    if (/[\u0900-\u097F]/.test(text)) {
      if (text.includes('आहे') || text.includes('आणि') || text.includes('नाही')) return 'Marathi (मराठी)';
      return 'Hindi (हिंदी)';
    }
    if (/[\u0B80-\u0BFF]/.test(text)) return 'Tamil (தமிழ்)';
    if (/[\u0C80-\u0CFF]/.test(text)) return 'Kannada (ಕನ್ನಡ)';
    if (/[\u0D00-\u0D7F]/.test(text)) return 'Malayalam (മലയാളം)';
    if (/[\u0980-\u09FF]/.test(text)) return 'Bengali (বাংলা)';
    if (/[\u0A80-\u0AFF]/.test(text)) return 'Gujarati (ગુજરાતી)';
    if (/[\u0A00-\u0A7F]/.test(text)) return 'Punjabi (ਪੰਜਾਬੀ)';
    if (/[\u0600-\u06FF]/.test(text)) return 'Urdu (اردو)';
    return 'English';
  }
}
