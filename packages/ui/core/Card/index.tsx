import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

import {Profile} from '../../@types/profile';

import {Overlay, Name, NopeLabel, LikeLabel, Image, Headers, Footer} from './styles';

const {Value} = Animated;

interface CardProps {
  profileProp?: Profile;
  likeOpacity?: Value | number;
  nopeOpacity?: Value | number;
}

const defaultProps: CardProps = {
  likeOpacity: 0,
  nopeOpacity: 0,
};

const Card: React.FC<CardProps> = ({profileProp, likeOpacity, nopeOpacity}) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Image style={{...StyleSheet.absoluteFillObject}} source={profileProp?.image} />
      <Overlay>
        <Headers>
          <Animated.View style={[styles.like, {opacity: likeOpacity}]}>
            <LikeLabel>FAVORITAR</LikeLabel>
          </Animated.View>
          <Animated.View style={[styles.nope, {opacity: nopeOpacity}]}>
            <NopeLabel>NA PRÓXIMA</NopeLabel>
          </Animated.View>
        </Headers>
        <Footer>
          <Name>{profileProp?.name}</Name>
        </Footer>
      </Overlay>
    </View>
  );
};

Card.defaultProps = defaultProps;

export default Card;

const styles = StyleSheet.create({
  like: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: '#6ee3b4',
  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: '#ec5288',
  },
});
