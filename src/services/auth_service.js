import client from '../axios';
import URLS from '../constants/urls';

export const login = async data => {
  return await client.post(URLS.login, data);
};

export const register = async data => {
  return await client.post(URLS.register, data);
};

export const updatePassword = async data => {
  return await client.put(`${URLS.changePassword}`, data);
};
