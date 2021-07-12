import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Feather, MaterialIcons} from '@expo/vector-icons';
import {Background, Space} from '@animavita/ui/layout';
import {useNavigation} from '@react-navigation/native';
import Button from '@animavita/ui/core/Button/Button';
import * as ImagePicker from 'expo-image-picker';
import {useTheme} from '@animavita/theme';
import {useI18n} from '@animavita/i18n';

import Header from '../Header';
import dogImage from '../../../../assets/dog.png';

import {
  ImageContainer,
  Image,
  UploadedImagesContainer,
  CameraButton,
  UploadedImage,
  LabelText,
  GoBackLabel,
} from './styles';

type ImageInfo = {
  uri?: string | any;
};

const LARGE = 'large';
const HEADLINE = 'headline';

const RegisterSecondStep: React.FC = () => {
  const theme = useTheme();
  const {t} = useI18n(['register']);
  const [images, setImages] = useState<any[]>(Array.from({length: 3}));
  const [imagesSelected, setSelectedImages] = useState<any[]>([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSelectImages(indexSelected) {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('We need access to your pictures.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const {uri} = result as ImageInfo;

    images.splice(indexSelected, 1, uri);
    imagesSelected.splice(indexSelected, 1, uri);

    setImages([...images]);
    setSelectedImages([...imagesSelected]);
  }

  function removeSelectedImage(indexSelected) {
    images.splice(indexSelected, 1, null);
    imagesSelected.splice(indexSelected, 1, null);
    setImages([...images]);
    setSelectedImages([...imagesSelected]);
  }

  function backToHomePage() {
    if (imagesSelected.length === 0) {
      Alert.alert(t('alert'));
    } else {
      setIsLoading(true);
      setTimeout(() => {
        navigation.navigate('RegisterFirstStep');
        setIsLoading(false);
      }, 3000);
    }
  }

  return (
    <Background>
      <Header />
      <Image source={dogImage} />
      <LabelText variant={HEADLINE}>{t('label-text')}</LabelText>
      <Space height={10} />
      <UploadedImagesContainer>
        {images.map((image, index) => {
          if (image) {
            return (
              <ImageContainer key={index}>
                <MaterialIcons
                  name="cancel"
                  size={24}
                  color={theme.styledTheme.red}
                  style={{left: 90, marginBottom: -10, zIndex: 1}}
                  onPress={() => {
                    removeSelectedImage(index);
                  }}
                />
                <UploadedImage key={index} source={{uri: image}} />
              </ImageContainer>
            );
          }
          return (
            <CameraButton
              key={index}
              onPress={() => {
                handleSelectImages(index);
              }}>
              <Feather name="camera" size={24} color={theme.styledTheme.greenLight} />
            </CameraButton>
          );
        })}
      </UploadedImagesContainer>
      <Space key="space" height={10} />
      <Button
        onPress={() => {
          backToHomePage();
        }}
        text={t('register-adoption')}
        size={LARGE}
        gradient={true}
        rounded={true}
        loading={isLoading}
      />
      <Space height={10} />
      <GoBackLabel
        onPress={() => {
          navigation.goBack();
        }}
        variant={HEADLINE}>
        {t('back-label')}
      </GoBackLabel>
    </Background>
  );
};

export default RegisterSecondStep;
