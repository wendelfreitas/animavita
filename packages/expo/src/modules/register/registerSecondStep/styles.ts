import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Typography} from '@animavita/ui/core';

interface Props {
  onPress: (event: Event) => void;
}

export const Header = styled.View`
  background-color: ${({theme}) => theme.white};
  padding-top: 34px;
`;
export const TitleImageView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ImageContainer = styled.View`
  display: flex;
  margin-top: -10px;
`;
export const CameraButton = styled(TouchableOpacity)<Props>`
  background-color: ${({theme}) => theme.white};
  border-style: dashed;
  border-color: ${({theme}) => theme.greenLight};
  border-width: 1.4px;
  border-radius: 10px;
  height: 92px;
  width: 102px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;
export const UploadedImagesContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const Image = styled.Image`
  height: 300px;
  width: 300px;
  align-self: center;
`;
export const UploadedImage = styled.Image`
  border-width: 1.4px;
  border-radius: 10px;
  height: 92px;
  width: 102px;
  margin-bottom: 22px;
  /* margin-top: -10px; */
`;
export const LabelText = styled(Typography)`
  align-self: center;
`;
export const GoBackLabel = styled(Typography)`
  align-self: center;
  color: ${({theme}) => theme.grey};
`;
