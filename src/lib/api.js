import { axiosInstance } from "./axios";

export const signUpUser = async (signupData) => {
 const resp = await axiosInstance.post("/auth/signup", signupData);
 return resp.data;
};

export const loginUser = async (loginData) => {
 const resp = await axiosInstance.post("/auth/signin", loginData);
 return resp.data;
};

export const getAuthUser = async () => {
 try {
  const resp = await axiosInstance.get("/auth/me");
  return resp.data;
 } catch (error) {
  console.log("Error in getAuthUser", error);
  return null;
 }
};

export const completeOnboarding = async (onboardingData) => {
 const resp = await axiosInstance.post("/auth/onboarding", onboardingData);
 return resp.data;
};

export const logOutUser = async () => {
 const resp = await axiosInstance.post("/auth/signout");
 return resp.data;
};

export const getUserFriends = async () => {
 const resp = await axiosInstance.get("/users/friends");
 return resp.data;
};

export const getRecommendedUsers = async () => {
 const resp = await axiosInstance.get("/users/recommended");
 return resp.data;
};

export const sendFriendRequest = async (userId) => {
 const resp = await axiosInstance.post(`/users/add-friend/${userId}`);
 return resp.data;
};

export const getOutgoingFriendReqs = async () => {
 const resp = await axiosInstance.get("/users/outgoing-friend-requests");
 return resp.data;
};

export const acceptFriendRequest = async (userId) => {
 const resp = await axiosInstance.put(`/users/accept-friend/${userId}`);
 return resp.data;
};

export const getFriendRequests = async () => {
 const resp = await axiosInstance.get("/users/friend-requests");
 return resp.data;
};

export const getStreamToken = async () => {
 const resp = await axiosInstance.get("/chat/token");
 return resp.data;
};
