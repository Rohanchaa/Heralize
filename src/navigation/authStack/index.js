import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {MMKV} from 'react-native-mmkv';
import {useSelector} from 'react-redux';
import SignUpScreen from '../../Screens/auth_stack/SignUp/SignUpScree';
import Splashone from '../../Screens/auth_stack/SplashScreens/splashone';
import LoginScreen from '../../Screens/auth_stack/login/loginScreen';
const SignStack = createStackNavigator();

const AuthStack = () => {
  const {isSplashShown} = useSelector(state => state.auth);

  return (
    <SignStack.Navigator screenOptions={{headerShown: false}}>
      {isSplashShown ? (
        <>
          <SignStack.Screen name="Login" component={LoginScreen} />
          <SignStack.Screen name="SignUpScreen" component={SignUpScreen} />
        </>
      ) : (
        <SignStack.Screen name="Splashone" component={Splashone} />
      )}
    </SignStack.Navigator>
  );
};

export default AuthStack;
