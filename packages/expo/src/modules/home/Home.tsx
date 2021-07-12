import React, {useState, useEffect, useRef, useCallback} from 'react';
import {StyleSheet, AsyncStorage, Dimensions, ImageSourcePropType, StyleProp} from 'react-native';
import Animated from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {px2ddp, useTheme} from '@animavita/theme';
import {Background} from '@animavita/ui/layout';
import {TabBar, Card} from '@animavita/ui/core';
import styled from 'styled-components/native';
import {useI18n} from '@animavita/i18n';

import Button from '../../../../ui/core/Button/Button';
import {Profile} from '../../../../ui/@types/profile';

import {rotatedWidthCoefficient, runSpring} from './cardSwiper';

const {
  greaterThan,
  lessThan,
  and,
  Clock,
  clockRunning,
  event,
  Value,
  concat,
  interpolate,
  Extrapolate,
  set,
  cond,
  eq,
  neq,
  call,
} = Animated;

// TS types of data object to feed the Home screen
interface Iterators {
  lastPets: Profile;
  rest: Profile[];
}

//Array data to feed the animation
const Pets: Profile[] = [
  {
    id: 1,
    name: 'Thor',
    age: 2,
    image: require('../../../../ui/assets/images/examples/dog1.jpg'),
  },
  {
    id: 2,
    name: 'Bob',
    age: 2,
    image: require('../../../../ui/assets/images/examples/dog2.jpg'),
  },
  {
    id: 3,
    name: 'Tim',
    age: 2,
    image: require('../../../../ui/assets/images/examples/dog3.jpg'),
  },
  {
    id: 4,
    name: 'Robb',
    age: 2,
    image: require('../../../../ui/assets/images/examples/dog4.jpg'),
  },
];

//Mathematical equations to calculate the trigonometric coefficient of rotation
const {width, height} = Dimensions.get('window');
const rotatedWidth = rotatedWidthCoefficient({width, height});

import Button from '../../../../ui/core/Button/Button';
import {Profile} from '../../../../ui/@types/profile';

import {rotatedWidthCoefficient, runSpring} from './cardSwiper';

const {
  greaterThan,
  lessThan,
  and,
  Clock,
  clockRunning,
  event,
  Value,
  concat,
  interpolate,
  Extrapolate,
  set,
  cond,
  eq,
  neq,
  call,
} = Animated;

// TS types of data object to feed the Home screen
interface Iterators {
  lastPets: Profile;
  rest: Profile[];
}

//Array data to feed the animation
const Pets: Profile[] = [
  {
    id: 1,
    name: 'Thor',
    age: 2,
    image: require('../../../../ui/assets/images/examples/dog1.jpg'),
  },
  {
    id: 2,
    name: 'Bob',
    age: 2,
    image: require('../../../../ui/assets/images/examples/dog2.jpg'),
  },
  {
    id: 3,
    name: 'Tim',
    age: 2,
    image: require('../../../../ui/assets/images/examples/dog3.jpg'),
  },
  {
    id: 4,
    name: 'Robb',
    age: 2,
    image: require('../../../../ui/assets/images/examples/dog4.jpg'),
  },
];

//Mathematical equations to calculate the trigonometric coefficient of rotation
const {width, height} = Dimensions.get('window');
const rotatedWidth = rotatedWidthCoefficient({width, height});

const Wrapper = styled.View`
  margin: 0 ${px2ddp(10)}px;
`;
const ButtonsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;
const Cards = styled.View`
  flex: 1;
  margin-top: 20px;
  margin-bottom: 20px;
  z-index: 100;
`;

const Home: React.FC = () => {
  const theme = useTheme();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const {t} = useI18n(['home', 'tab_bar']);

=======
>>>>>>> feat: creation of a native swiper deck, feeded by some array using the profiles interface
=======
>>>>>>> feat: creation of a native swiper deck, feeded by some array using the profiles interface
=======
>>>>>>> 4f13281b4aa5c032db7895b107cc611bfa49b1e6
  const [profile, setProfiles] = useState<Iterators>({
    lastPets: {
      id: 0,
      name: '',
      age: 0,
      image: require('../../../../ui/assets/images/examples/dog1.jpg'),
    },
    rest: [{id: 0, name: '', age: 0, image: require('../../../../ui/assets/images/examples/dog1.jpg')}],
  });

  //Function to separate the last card of stack for interaction
  const separatePetCard = (arrayPet: Profile[]) => {
    const [lastPets, ...rest] = arrayPet;
    const obj = {
      lastPets,
      rest,
    };
    setProfiles(obj);
  };

  useEffect(() => {
    separatePetCard(Pets);
  }, []);

  //Refs to control the animation values
  const translateX = useRef<Animated.Node<number>>();
  const translateY = useRef<Animated.Node<number>>();
  const translationXRef = useRef(new Value(0));
  const translationYRef = useRef(new Value(0));
  const velocityXRef = useRef(new Value(0));
  const gestureStateRef = useRef(new Value(State.UNDETERMINED));

  const swipped = () => {
    separatePetCard(profile.rest.reverse());
  };

  //Animation event to dynamically update the position gesture in Refs
  const onGestureEvent = useCallback(
    event(
      [
        {
          nativeEvent: {
            translationX: translationXRef.current,
            translationY: translationYRef.current,
            velocityX: velocityXRef.current,
            state: gestureStateRef.current,
          },
        },
      ],
      {useNativeDriver: true},
    ),
    [],
  );

  //Function to make all conditions and callbacks to be activate when a card is swipped
  const returnMoviment = (): any => {
    const clockX = new Clock();
    const clockY = new Clock();
    translationXRef.current.setValue(0);
    translationYRef.current.setValue(0);
    velocityXRef.current.setValue(0);
    gestureStateRef.current.setValue(State.UNDETERMINED);
    const snapPoint = cond(
      and(lessThan(translationXRef.current, 0), lessThan(velocityXRef.current, -10)),
      -rotatedWidth,
      cond(and(greaterThan(translationXRef.current, 0), greaterThan(velocityXRef.current, 10)), rotatedWidth, 0),
    );
    translateX.current = cond(
      eq(gestureStateRef.current, State.END),
      [
        set(translationXRef.current, runSpring(clockX, translationXRef.current, velocityXRef.current, snapPoint)),
        cond(and(eq(clockRunning(clockX), 0), neq(translationXRef.current, 0)), [
          call([translationXRef.current], swipped),
        ]),
        translationXRef.current,
      ],

      translationXRef.current,
    );
    translateY.current = cond(
      eq(gestureStateRef.current, State.END),
      [set(translationYRef.current, runSpring(clockY, translationYRef.current, 0, 0)), translationYRef.current],
      translationYRef.current,
    );
  };

  const init = useCallback(returnMoviment(), []);

  //Constants referring pre determinate values of rotatation animation and opacity animation
  const rotateZ = concat(
    interpolate(translationXRef.current, {
      inputRange: [-width / 2, width / 2],
      outputRange: [15, -15],
      extrapolate: Extrapolate.CLAMP,
    }),
    'deg',
  );

  const likeOpacity = interpolate(translationXRef.current, {
    inputRange: [0, width / 4],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const nopeOpacity = interpolate(translationXRef.current, {
    inputRange: [-width / 4, 0],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const style: StyleProp<object> = {
    ...StyleSheet.absoluteFillObject,
    transform: [{translateX: translateX.current}, {translateY: translateY.current}, {rotateZ}],
  };

  return (
    <Background>
      <Wrapper style={StyleSheet.absoluteFill}>
        <TabBar
          items={[
            {displayName: t('pages.adoptions'), key: 'adocoes'},
            {displayName: t('pages.favorites'), key: 'favoritos'},
            {displayName: t('pages.solicitations'), key: 'solicitacoes'},
          ]}
          onPress={() => null}
        />
        <ButtonsWrapper>
          <Button size="small" rounded gradient text="Change Theme" onPress={() => theme.changeTheme()} />
          <Button size="small" rounded gradient text="Filter" onPress={() => AsyncStorage.clear()} />
        </ButtonsWrapper>

        <Cards>
          {profile.rest.reverse().map(profilee => (
            <Card key={profilee.id} profileProp={profilee} />
          ))}
          <PanGestureHandler onHandlerStateChange={onGestureEvent} onGestureEvent={onGestureEvent}>
            <Animated.View style={style}>
              <Card profileProp={profile.lastPets} likeOpacity={likeOpacity} nopeOpacity={nopeOpacity} />
            </Animated.View>
          </PanGestureHandler>
        </Cards>
      </Wrapper>
    </Background>
  );
};

export default Home;
