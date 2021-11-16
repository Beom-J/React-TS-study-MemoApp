import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ko from './ko.json';
import en from './en.json';

const resource = {
  en: {
    translation: en
  },
  ko: {
    translation: ko
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resource, // 리소스
    lng: 'ko' // 초기 설정 언어
  });

export default i18n;
