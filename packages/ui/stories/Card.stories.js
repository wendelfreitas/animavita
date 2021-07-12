import React from 'react';
import {StyleSheet, View} from 'react-native';
import {px2ddp} from '@animavita/theme';
import styled from 'styled-components/native';

import Card from '../core/Card/index';

const petExample = {
  id: 1,
  name: 'Thor',
  age: 2,
  image: {
    uri:
      'https://www.hypeness.com.br/1/2020/07/Cachorros-podem-reconhecer-pessoas-n%C3%A3o-confi%C3%A1veis-foto-unsplash-3.jpg',
  },
};

export default {
  title: 'Card',
  component: Card,
};

const Wrapper = styled.View`
  margin: 0 ${px2ddp(10)}px;
`;
const Cards = styled.View`
  height: 600;
  width: 400;
  margin-top: 20px;
  margin-bottom: 20px;
  z-index: 100;
`;

export const CardComponent = args => (
  <Wrapper style={StyleSheet.absoluteFill}>
    <Cards>
      <View style={StyleSheet.absoluteFillObject}>
        <Card profileProp={petExample} likeOpacity={100} nopeOpacity={100} />
      </View>
    </Cards>
  </Wrapper>
);
