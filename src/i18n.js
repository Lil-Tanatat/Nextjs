import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en.json";
import thTranslations from "./locales/th.json";
// import jpTranslations from "./locales/jp.json";
// import cnTranslations from "./locales/cn.json";
// import vnTranslations from "./locales/vn.json";
// import mlTranslations from "./locales/ml.json";

const resources = {
  en: {
    translation: enTranslations,
  },
  th: {
    translation: thTranslations,
  },
  // jp: {
  //   translation: jpTranslations,
  // },
  // cn: {
  //   translation: cnTranslations,
  // },
  // vn: {
  //   translation: vnTranslations,
  // },
  // ml: {
  //   translation: mlTranslations,
  // },
};

i18n.use(initReactI18next).init({
  lng: "en",
  resources,
  react: {
    useSuspense: false,
  },

  backend: {
    loadPath: "/locales/{{lng}}.json",
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  load: "languageOnly",
});

export default i18n;
