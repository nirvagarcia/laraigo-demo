import React, { createContext, useContext, ReactNode } from "react";
import i18n from "i18next";
import {
  initReactI18next,
  useTranslation as useI18nTranslation,
} from "react-i18next";
import { LANGUAGE_CONFIG } from "@app/config/lang";

import esTranslations from "@shared/langkeys/es.json";
import enTranslations from "@shared/langkeys/en.json";

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: esTranslations },
    en: { translation: enTranslations },
  },
  lng:
    localStorage.getItem(LANGUAGE_CONFIG.STORAGE_KEY) ||
    LANGUAGE_CONFIG.DEFAULT_LANGUAGE,
  fallbackLng: LANGUAGE_CONFIG.FALLBACK_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

interface I18nContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  t: (key: string, options?: any) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const { t, i18n: i18nInstance } = useI18nTranslation();

  const changeLanguage = async (language: string) => {
    await i18nInstance.changeLanguage(language);
    localStorage.setItem(LANGUAGE_CONFIG.STORAGE_KEY, language);
  };

  const contextValue: I18nContextType = {
    currentLanguage: i18nInstance.language,
    changeLanguage,
    t,
  };

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
};

export { i18n };
export default I18nProvider;
