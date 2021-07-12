import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AntDesign} from '@expo/vector-icons';
import {Typography} from '@animavita/ui/core';
import {useI18n} from '@animavita/i18n';

import {HeaderView, TitleImageView, BackIcon} from './styles';

const TITLE_2 = 'title-2';

const Header: React.FC = () => {
  const {t} = useI18n(['register']);
  const navigation = useNavigation();

  return (
    <HeaderView>
      <TouchableOpacity onPress={navigation.goBack}>
        <BackIcon name="arrowleft" size={24} />
      </TouchableOpacity>
      <TitleImageView>
        <Typography variant={TITLE_2} type={'bold'}>
          {t('header')}
        </Typography>
      </TitleImageView>
    </HeaderView>
  );
};

export default Header;
