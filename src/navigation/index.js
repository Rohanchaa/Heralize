import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './authStack/index';
import RootStack from './rootstack';

const {Navigator, Screen} = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="AuthStack" component={AuthStack} />
      <Screen name="rootstack" component={RootStack} />
    </Navigator>
  );
};

export default AppNavigation;
