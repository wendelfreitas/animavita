import {renderHook, act} from '@testing-library/react-hooks';

import {I18nProvider, useI18nController} from '../Controller';

describe('I18n Controller', () => {
  it('changes locale', async () => {
    const {result} = renderHook(() => useI18nController(), {wrapper: I18nProvider});

    await act(async () => {
      result.current.setLocale('en-US');
    });

    expect(result.current.locale).toEqual('en-US');
  });

  it('changes locale and translate', async () => {
    const {result} = renderHook(() => useI18nController(), {wrapper: I18nProvider});

    await act(async () => {
      result.current.setLocale('en-US');
    });

    const translation = result.current.i18n.t('tab_bar.options.settings', {});
    expect(translation).toEqual('Settings');
  });
});
