import React from 'react';
import {ViewProps} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import styled from 'styled-components/native';
import {FlattenSimpleInterpolation} from 'styled-components';
import {PossibleThemes, px2ddp, useTheme} from '@animavita/theme';

const ThemedBackground = styled.SafeAreaView<BackgroundProps & {themeName: PossibleThemes}>`
  background-color: ${({themeName, theme}) => (themeName === 'light' ? theme.white : theme.black)};
  flex: 1;
  ${({css}) => css}
`;

const Wrapper = styled.View`
  margin: ${px2ddp(5)}px ${px2ddp(10)}px;
  flex: 1;
`;

interface BackgroundProps {
  css?: FlattenSimpleInterpolation;
}

const Background: React.FC<ViewProps & BackgroundProps> = ({children, css, ...viewProps}) => {
  const {themeName} = useTheme();

  return (
    <>
      <StatusBar style={themeName === 'light' ? 'dark' : 'light'} />
      <ThemedBackground themeName={themeName} css={css} {...viewProps}>
        <Wrapper>{children}</Wrapper>
      </ThemedBackground>
    </>
  );
};

export default Background;
