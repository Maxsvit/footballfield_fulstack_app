// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Імпортуємо файли перекладів
import en from "./i18n/en.json";
import pl from "./i18n/pl.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pl: { translation: pl },
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
