import React from 'react';
import styled from 'styled-components/native';

const TextError = styled.Text`
  color: #c53030;
`;

const Error: React.FC = ({children}) => {
  return (
    <>
      <TextError>{children}</TextError>
    </>
  );
};

export default Error;
