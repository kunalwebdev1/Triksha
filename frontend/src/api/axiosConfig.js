// src/api/axiosConfig.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Django backend

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // if using cookies/session
});

export default axiosInstance;