import axios from "./axiosConfig";

export const fetchAppointments = (userId) =>
  axios.get(`/appointments/${userId}`);
export const bookAppointment = (appointmentData) =>
  axios.post("/appointments", appointmentData);
export const cancelAppointment = (appointmentId) =>
  axios.delete(`/appointments/${appointmentId}`);
