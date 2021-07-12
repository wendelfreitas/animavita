import {DefaultTheme} from 'styled-components/native';

import {heightPercentageToDP} from './PixelRatio';

export const initialTheme = 'light';

/**
 * Styled components theme
 */

const StyledTheme: DefaultTheme = {
  // color
  greenLight: '#2ED68F',
  greenDark: '#1BC0B5',
  white: '#FFFFFF',
  black: '#353434',
  grey: '#BABABA',
  greyDark: '#717171',
  greyLight: '#D8D8D8',
  greyLighter: '#EBEBEB',
  red: '#FF0000',

  // typography
  sizeLargeTitle: `${heightPercentageToDP('8%')}px`,
  sizeTitle1: `${heightPercentageToDP('5%')}px`,
  sizeTitle2: `${heightPercentageToDP('4%')}px`,
  sizeTitle3: `${heightPercentageToDP('3%')}px`,
  sizeHeadline: `${heightPercentageToDP('2%')}px`,
  sizeBody: `${heightPercentageToDP('2%')}px`,
  sizeCallout: `${heightPercentageToDP('1.8%')}px`,
  sizeSubheadline: `${heightPercentageToDP('1.6%')}px`,
  sizeFootnote: `${heightPercentageToDP('1.4%')}px`,
  sizeCaption1: `${heightPercentageToDP('1.2%')}px`,
  sizeCaption2: `${heightPercentageToDP('1%')}px`,
};

export default StyledTheme;
