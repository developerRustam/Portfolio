import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import profile from "../profile/profile.json";
import translationEn from "./locales/en/translation.json";
import translationRu from "./locales/ru/translation.json";

const resources = {
  en: { translation: translationEn },
  ru: { translation: translationRu },
};

type Language = keyof typeof profile.seo;

function syncDocumentLanguage(language: string) {
  const supportedLanguage: Language = language.startsWith("en") ? "en" : "ru";
  const metadata = profile.seo[supportedLanguage];

  document.documentElement.lang = supportedLanguage;
  document.title = metadata.title;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", metadata.description);
}

i18n.on("languageChanged", syncDocumentLanguage);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ru",
    supportedLngs: ["ru", "en"],
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => syncDocumentLanguage(i18n.resolvedLanguage ?? i18n.language));

export default i18n;
