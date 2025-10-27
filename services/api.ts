import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL untuk API Laravel
// Untuk development, gunakan localhost
const API_BASE_URL = 'http://localhost:8000/api';

// Buat instance axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 detik timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk handle response errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired atau invalid, hapus token dan redirect ke login
      await AsyncStorage.removeItem('authToken');
      // Bisa tambahkan logic untuk redirect ke login screen
    }
    return Promise.reject(error);
  }
);

export default api;
