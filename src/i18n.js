import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import es from './i18n/es.json';
import en from './i18n/en.json';
import cat from './i18n/cat.json';

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
      cat: {
        translation: cat
      },
      es: {
        translation: es
      },
      en: {
        translation: en
      }
    },
    load: 'languageOnly',
    whitelist: ['cat', 'es', 'en'],
    fallbackLng: 'cat',
    debug: false,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    useSuspense: true,
  });
