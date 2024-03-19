import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Homescreen from '../../Screens/root_stack/Home/homescreen';
const HomeStack = createStackNavigator();

const HomeScreens = () => (
  <HomeStack.Navigator
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    }}>
    <HomeStack.Screen
      name="Home"
      component={Homescreen}
      options={{headerShown: false}}
    />
  </HomeStack.Navigator>
);

export default HomeScreens;
