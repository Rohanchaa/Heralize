import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {MMKV} from 'react-native-mmkv';
import {useDispatch} from 'react-redux';
import {
  storeToken,
  storeType,
  storeUser,
  toggleSplash,
} from '../store/slices/auth.slice';

const storage = new MMKV();

const SplashScreen = () => {
  const dispatch = useDispatch();

  const fetchData = () => {
    const token = storage.getString('token');
    const type = storage.getString('type');
    const user = storage.getString('user');

    const shown = storage.getString('splashsoneShown');

    if (token) {
      dispatch(storeToken(token));
      dispatch(storeType(type));
      dispatch(storeUser(JSON.parse(user)));
    }

    if (shown) {
      dispatch(toggleSplash());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
