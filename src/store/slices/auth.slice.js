import {createSlice} from '@reduxjs/toolkit';
import {MMKV} from 'react-native-mmkv';

const initialState = {
  token: null,
  type: null,
  user: null,
  isSplashShown: false,
};

const storage = new MMKV();

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeToken: (state, {payload}) => {
      storage.set('token', payload);
      state.token = payload;
    },
    storeType: (state, {payload}) => {
      storage.set('type', payload);
      state.type = payload;
    },
    storeUser: (state, {payload}) => {
      storage.set('user', JSON.stringify(payload));

      state.user = payload;
    },
    toggleSplash: state => {
      storage.set('splashsoneShown', true);
      state.isSplashShown = true;
    },
    logout: state => {
      storage.clearAll();
      state.token = null;
      state.type = null;
      state.user = null;
    },
  },
});

export const {storeToken, storeType, logout, toggleSplash, storeUser} =
  slice.actions;

const authReducer = slice.reducer;

export default authReducer;
