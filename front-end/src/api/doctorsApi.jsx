import axios from 'axios';

const BASE_URL = 'appointment-booking-5ji3.vercel.app'; // Adjust according to your backend

export const fetchDoctors = () => axios.get(`${BASE_URL}/api/doctors`);
export const fetchAvailableSlots = (doctorId, date) => axios.get(`${BASE_URL}/api/doctors/${doctorId}/slots?date=${date}`);