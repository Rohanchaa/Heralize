import client from '../axios';
import URLS from '../constants/urls';

export const addReport = async data => {
  return await client.post(URLS.reportPost, data);
};

export const addUserReport = async data => {
  return await client.post(URLS.reportUser, data);
};

export const getReportedUser = async () => {
  return await client.get(URLS.reportUser);
};

export const deleteUserReport = async id => {
  return await client.delete(`${URLS.reportUser}/${id}`);
};

export const deleteUser = async id => {
  return await client.delete(`${URLS.user}/${id}`);
};
