import axios from 'axios';

import {MMKV} from 'react-native-mmkv';
import URLS from '../constants/urls';
const storage = new MMKV();
const client = axios.create({
  baseURL: URLS.baseUrl,
});

client.interceptors.request.use(
  config => {
    const token = storage.getString('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => error,
);

export default client;
