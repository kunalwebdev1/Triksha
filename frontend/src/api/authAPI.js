import axios from "./axiosConfig";

export const loginUser = (credentials) => axios.post("/auth/login", credentials);
export const signupUser = (data) => axios.post("/auth/signup", data);
export const logoutUser = () => axios.post("/auth/logout");
