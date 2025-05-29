import i18n from 'i18next';
import { initReactI18next, useTranslation as useI18nTranslation } from 'react-i18next';
import enTranslation from './en/translation.json';
import trTranslation from './tr/translation.json';

export const resources = {
  en: {
    translation: enTranslation,
  },
  tr: {
    translation: trTranslation,
  },
} as const;

// i18n instance'ını başlat
const initI18n = () => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'tr',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // React zaten XSS korumalı
      },
    });
  
  return i18n;
};

// Uygulama başlatma sırasında i18n'i başlat
initI18n();

// useTranslation hook'unu dışa aktar
export const useTranslation = () => {
  const { t, i18n: i18nInstance } = useI18nTranslation();
  
  // Eksik çeviriler için fallback
  const tWithFallback = (key: string, defaultValue?: string) => {
    const result = t(key);
    return result === key ? (defaultValue || key) : result;
  };
  
  return {
    t: tWithFallback,
    i18n: i18nInstance,
  };
};

export default i18n;
