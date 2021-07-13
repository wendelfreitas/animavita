import I18n from 'i18n-js';

import {useI18nController} from './Controller';

const useI18n = (namespaces: string[]) => {
  const {i18n, locale} = useI18nController();

  const t = (key: string, options: I18n.TranslateOptions = {}) => {
    i18n.locale = locale;

    for (const namespace of namespaces) {
      const searchFor = `${namespace}.${key}`;
      const translation = i18n.t(searchFor, options);

      const notFound = `[missing "${i18n.locale}.${searchFor}" translation]`;
      if (translation !== notFound) return translation;
    }
    return 'Translation not found';
  };

  return {
    t,
  };
};

export {useI18n};
