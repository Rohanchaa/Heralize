import client from '../axios';
import URLS from '../constants/urls';

export const getCommunities = async () => {
  return await client.get(URLS.community);
};

export const getCommunityRequested = async () => {
  return await client.get(URLS.communityRequest);
};
export const getMyCommunities = async () => {
  return await client.get(`${URLS.community}/joined-communities`);
};

export const getCommunityDetails = async id => {
  return await client.get(`${URLS.community}/find/${id}`);
};

export const joinCommunity = async id => {
  return await client.post(`${URLS.jointRequest}`, {community_id: id});
};

export const leaveCommunity = async id => {
  return await client.post(`${URLS.community}/leave/${id}`);
};

export const addCommunity = async data => {
  return await client.post(URLS.community, data);
};

export const addCommunityRequest = async data => {
  return await client.post(URLS.communityRequest, data);
};
export const getJointRequests = async () => {
  return await client.get(URLS.jointRequest);
};

export const acceptRequest = async id => {
  return await client.post(`${URLS.jointRequest}/accept/${id}`);
};

export const rejectRequest = async id => {
  return await client.post(`${URLS.jointRequest}/reject/${id}`);
};
