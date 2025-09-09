// src/api/authAPI.js
import axiosInstance from "./axiosConfig";

export const signup = (data) => axiosInstance.post("/api/users/register/", data);
export const loginAPI = (data) => axiosInstance.post("/api/users/login/", data);