'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language, TranslationKeys } from '@/lib/i18n';

interface LanguageContextType {
  lang: Language;
  t: (typeof translations)[Language];
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('pt');

  const toggleLang = () => {
    setLang((prev) => (prev === 'pt' ? 'es' : 'pt'));
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        t: translations[lang],
        setLang,
        toggleLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
