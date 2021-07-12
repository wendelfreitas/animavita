import React from 'react';
import {Button} from 'react-native';
import {px2ddp, useTheme} from '@animavita/theme';
import {Background} from '@animavita/ui/layout';
import {TabBar} from '@animavita/ui/core';
import styled from 'styled-components/native';
import {useI18n} from '@animavita/i18n';

const ButtonsWrapper = styled.View`
  height: 100%;
  justify-content: center;
`;

const Home: React.FC = () => {
  const theme = useTheme();
  const {t} = useI18n(['home', 'tab_bar']);

  return (
    <Background>
      <TabBar
        items={[
          {displayName: t('pages.adoptions'), key: 'adocoes'},
          {displayName: t('pages.favorites'), key: 'favoritos'},
          {displayName: t('pages.solicitations'), key: 'solicitacoes'},
        ]}
        onPress={() => null}
      />
      <ButtonsWrapper>
        <Button title={t('change_theme')} onPress={() => theme.changeTheme()} />
      </ButtonsWrapper>
    </Background>
  );
};

export default Home;
