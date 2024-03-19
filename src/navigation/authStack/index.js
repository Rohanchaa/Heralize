import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../Screens/auth_stack/login/loginScreen';
import Splashone from '../../Screens/auth_stack/SplashScreens/splashone';
import SignUpScreen from '../../Screens/auth_stack/SignUp/SignUpScree';
const SignStack = createStackNavigator();

const AuthStack = () => {
  return (
    <SignStack.Navigator screenOptions={{headerShown: false}}>
      <SignStack.Screen name="Splashone" component={Splashone} />
      <SignStack.Screen name="Login" component={LoginScreen} />
      <SignStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </SignStack.Navigator>
  );
};

export default AuthStack;
