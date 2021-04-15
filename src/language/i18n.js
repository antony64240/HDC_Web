import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { Language } from "./enum-language";
import translateEN from './en/translate.json';
import translateFR from './fr/translate.json';
 
let defaultLanguage = Language.FR;
 
// the translations
const resources = {
  en: {
    translation: translateEN 
  },
  fr: {
    translation: translateFR 
  }
};
 
i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: defaultLanguage,
 
    keySeparator: ".",  // to support nested translations
 
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
 
  export default i18n;