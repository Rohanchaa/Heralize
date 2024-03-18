import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../Screens/root_stack/Home/home';
import React from 'react';

const Tab = createBottomTabNavigator();

const RootStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

export default RootStack;
