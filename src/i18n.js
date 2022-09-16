import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import es from './i18n/es.json';
import en from './i18n/en.json';
import ca from './i18n/ca.json';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['querystring', 'navigator'],
      lookupQuerystring: 'lang',
      checkWhitelist: true
    },
    resources: {
      en: {
        translation: en
      },
      es: {
        translation: es
      },
      ca: {
        translation: ca
      },
    },
    load: 'languageOnly',
    whitelist: ['es', 'en', 'ca'],
    fallbackLng: 'es',
    debug: false,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    useSuspense: true,
  });
