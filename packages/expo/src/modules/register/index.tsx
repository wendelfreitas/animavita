import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import RegisterFirstStep from './registerFirstStep/Register';
import RegisterSecondStep from './registerSecondStep/RegisterSecondStep';

const Stack = createStackNavigator();
const {Navigator, Screen} = Stack;

export default function Navigation() {
  return (
    <Navigator headerMode="none" screenOptions={{gestureEnabled: false}}>
      <Screen name="RegisterFirstStep" component={RegisterFirstStep} />
      <Screen name="RegisterSecondStep" component={RegisterSecondStep} />
    </Navigator>
  );
}
