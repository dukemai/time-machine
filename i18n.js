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
        'Good evening': 'Good evening',
        'Good night': 'Good night',
        'Good weekend': 'Good weekend',
        'Time to rest': 'Time to rest',
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
        'Good evening': 'God kväll',
        'Good night': 'God natt',
        'Good weekend': 'Trevlig helg',
        'Fight hard at work': 'Kämpa hårt på jobbet',
        'Time to rest': 'Dags att vila',
        'Time for sleep': 'Dags att sova',
        'to go home': 'att åka hem',
        'Time for breakfast': 'Frukost stund',
        'Time for lunch': 'Dags för lunch',
        'Time for dinner': 'Dags för eftermiddag',
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
