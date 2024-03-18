import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import loginScreen from '../../Screens/auth_stack/login/loginScreen';
import Splashone from '../../Screens/auth_stack/SplashScreens/splashone';
import SignUpScreen from '../../Screens/auth_stack/SignUp/SignUpScree';

const SignStack = createStackNavigator();

const AuthStack = () => {
  return (
    <SignStack.Navigator screenOptions={{headerShown: false}}>
      <SignStack.Screen name="Splashone" component={Splashone} />
      <SignStack.Screen name="Login" component={loginScreen} />
      <SignStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </SignStack.Navigator>
  );
};

export default AuthStack;
