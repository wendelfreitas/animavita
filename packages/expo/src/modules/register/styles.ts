import styled from 'styled-components/native';
import {AntDesign} from '@expo/vector-icons';

export const HeaderView = styled.View`
  background-color: ${({theme}) => theme.white};
  border-color: ${({theme}) => theme.grey};
  padding-top: 34px;
`;

export const TitleImageView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
`;

export const BackIcon = styled(AntDesign)`
  color: ${({theme}) => theme.grey};
`;
