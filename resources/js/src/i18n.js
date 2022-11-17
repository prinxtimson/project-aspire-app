import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        supportedLngs: ["en", "fr", "ar", "es"],
        fallbackLng: "en",
        detection: {
            order: ["path", "cookie", "htmlTag", "localStorage", "subdomain"],
            caches: ["cookie"],
        },
        backend: {
            loadPath: "/assets/locales/{{lng}}/{{ns}}.json",
        },
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
