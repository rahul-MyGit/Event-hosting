import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your backend API URL

export const login = async (email: string, password: string) => {
  return axios.post(`${API_URL}/api/auth/login`, { email, password });
};

export const register = async (name: string, email: string, password: string) => {
  return axios.post(`${API_URL}/api/auth/signup`, { name, email, password });
};

export const fetchEvents = async () => {
  return axios.get(`${API_URL}/api/event/events`);
};

export const fetchUserProfile = async (userId: number) => {
  return axios.get(`${API_URL}/api/user/users/${userId}`);
};