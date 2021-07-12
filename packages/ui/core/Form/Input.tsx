import React from 'react';
import {TextInputProps} from 'react-native';
import {px2ddp, PossibleThemes, useTheme} from '@animavita/theme';
import styled from 'styled-components/native';

import Error from './Error';

// styles
export const StyledTextInput = styled.TextInput<{themeName: PossibleThemes}>`
  width: 100%;
  padding: ${px2ddp(2)}px 0px;
  color: ${({themeName, theme}) => (themeName === 'light' ? theme.black : theme.white)};
`;

// types
interface InputProps extends TextInputProps {
  error?: string;
  errorText?: string;
}

const Input: React.FC<InputProps> = ({error, errorText, ...props}) => {
  const {themeName} = useTheme();
  return (
    <>
      <StyledTextInput themeName={themeName} {...props} />
      {Boolean(error) && <Error>{errorText}</Error>}
    </>
  );
};

export default Input;
