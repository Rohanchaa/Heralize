import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import SplashScreen from '../Screens/SplashScreen';
import AuthStack from './authstack';
import RootStack from './rootstack';
const {Navigator, Screen} = createNativeStackNavigator();

const AppNavigation = () => {
  const [loading, setLoading] = useState(true);

  const {token} = useSelector(state => state.auth);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [token]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Navigator screenOptions={{headerShown: false}}>
      {token ? (
        <Screen name="RootStack" component={RootStack} />
      ) : (
        <Screen name="AuthStack" component={AuthStack} />
      )}
    </Navigator>
  );
};

export default AppNavigation;
