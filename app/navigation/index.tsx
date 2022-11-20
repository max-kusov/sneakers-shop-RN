import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import * as React from 'react';

import Cart from '../screens/Cart';
import Home from '../screens/Home';
// import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import { RootStackParamList } from '../../types';

import LinkingConfiguration from './LinkingConfiguration';
import Status from '../components/layout/stories/Status';
import ProductInfo from '../screens/ProductInfo';


export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      transitionSpec: {
        open: config,
        close: config,
      },
    }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name='ProductInfo' component={ProductInfo} options={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }} />

      <Stack.Screen name='Status' component={Status} />
      <Stack.Screen name="Cart" component={Cart} options={{
        gestureDirection: 'horizontal',
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      }} />
    </Stack.Navigator>
  );
}
