import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './authstack';
import RootStack from './rootstack';
const {Navigator, Screen} = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="RootStack" component={RootStack} />
      <Screen name="AuthStack" component={AuthStack} />
    </Navigator>
  );
};

export default AppNavigation;
