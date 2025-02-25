import axios from 'axios';

const BASE_URL = 'appointment-booking-5ji3.vercel.app'; // Adjust according to your backend

export const bookAppointment = (appointmentData) => axios.post(`${BASE_URL}/api/appointments`, appointmentData);
export const fetchAppointments = () => axios.get(`${BASE_URL}/api/appointments`);
export const cancelAppointment = (appointmentId) => axios.delete(`${BASE_URL}/api/appointments/${appointmentId}`);
export const updateAppointment = (appointmentId, updatedData) => axios.put(`${BASE_URL}/api/appointments/${appointmentId}`, updatedData);
