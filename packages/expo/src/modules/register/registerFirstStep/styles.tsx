import styled from 'styled-components/native';
import {Typography} from '@animavita/ui/core';

export const StyledTypography = styled(Typography)`
  color: ${({theme}) => theme.grey};
`;

export const HeaderView = styled.View`
  background-color: ${({theme}) => theme.white};
  padding-top: 34px;
`;

export const TitleImageView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
`;

export const ScrollViewContainer = styled.ScrollView`
  margin-bottom: 15px;
`;

export const ButtonsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const PortButtonsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;
