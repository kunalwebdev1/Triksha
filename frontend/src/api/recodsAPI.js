import axios from "./axiosConfig";

export const fetchRecords = (userId) => axios.get(`/records/${userId}`);
export const uploadRecord = (userId, fileData) =>
  axios.post(`/records/${userId}`, fileData);
