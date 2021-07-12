import * as styled from 'styled-components';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    // color
    greenLight: string;
    greenDark: string;
    black: string;
    white: string;
    grey: string;
    greyLight: string;
    greyLighter: string;
    greyDark: string;
    red: string;

    // typography
    sizeLargeTitle: string;
    sizeTitle1: string;
    sizeTitle2: string;
    sizeTitle3: string;
    sizeHeadline: string;
    sizeBody: string;
    sizeCallout: string;
    sizeSubheadline: string;
    sizeFootnote: string;
    sizeCaption1: string;
    sizeCaption2: string;
  }

  export default {...styled};
}
