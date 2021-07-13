import React, {useState, useEffect, useContext, createContext} from 'react';
import i18n from 'i18n-js';

import locales from '../locales';

interface I18nContextProps {
  i18n: typeof i18n;
  setLocale: (locale: string) => void;
  locale: string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

const I18nProvider: React.FC = ({children}) => {
  const [locale, setLocale] = useState<string>('pt-BR');

  i18n.fallbacks = true;
  i18n.defaultLocale = 'pt-BR';

  useEffect(() => {
    i18n.locale = locale;
  }, [locale]);

  useEffect(() => {
    i18n.translations = locales;
  }, []);

  return <I18nContext.Provider value={{i18n, setLocale, locale}}>{children}</I18nContext.Provider>;
};

const useI18nController = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18nController must be used within an I18nProvider.');
  }

  return context;
};

export {I18nProvider, useI18nController};
