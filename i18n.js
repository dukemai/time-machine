import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        Today: 'Today',
        Week: 'Week',
        Weeks: 'Weeks',
        Now: 'Now',
        'Weather in': 'Weather in',
        'Good morning': 'Good morning',
        'Good afternoon': 'Good afternoon',
        'Good weekend': 'Good weekend',
        welcome: 'Hello <br/> <strong>World</strong>',
      },
    },
    se: {
      translations: {
        Today: 'I dag',
        Now: 'Nu',
        Week: 'Vecka nr',
        Weeks: 'Veckor',
        'Weather in': 'Vädret i',
        'Good morning': 'God morgon',
        'Good afternoon': 'God eftermiddag',
        'Good weekend': 'Trevlig helg',
      },
    },
  },
  fallbackLng: 'en',
  debug: true,
  lng: 'se',

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
