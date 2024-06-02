import client from '../axios';
import URLS from '../constants/urls';

export const addPost = async data => {
  return await client.post(`${URLS.post}`, data);
};

export const getPosts = async () => {
  return await client.get(URLS.post);
};

export const getPostDetails = async id => {
  return await client.get(`${URLS.post}/${id}`);
};

export const likePost = async data => {
  return await client.post(`${URLS.post}/like`, data);
};

export const dislikePost = async data => {
  return await client.post(`${URLS.post}/dislike`, data);
};

export const updatePost = async (data, id) => {
  return await client.put(`${URLS.post}/${id}`, data);
};

export const deletePost = async id => {
  return await client.delete(`${URLS.post}/${id}`);
};

export const getPostsByCommunity = async id => {
  return await client.get(`${URLS.post}/community/${id}`);
};

export const addComment = async data => {
  return await client.post(`${URLS.post}/add-comment`, data);
};

export const deleteComment = async id => {
  return await client.delete(`${URLS.post}/comment/${id}`);
};

export const getReportedPosts = async () => {
  return await client.get(URLS.reportPost);
};

export const deleteReport = async id => {
  return await client.delete(`${URLS.reportPost}/${id}`);
};
