import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL untuk API Laravel
// Untuk development, gunakan localhost
const API_BASE_URL = 'http://127.0.0.1:8000/api';
const BASE_URL = 'http://127.0.0.1:8000';

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
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Interceptor untuk handle response errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error(`API Error: ${error.response?.status || 'Network Error'} ${error.config?.url}`);
    
    if (error.response?.status === 401) {
      // Token expired atau invalid, hapus token dan redirect ke login
      await AsyncStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);


// Helper function untuk mengonversi URL gambar
export const getImageUrl = (imagePath: string | null): string | null => {
  if (!imagePath) return null;
  
  // Jika sudah full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Jika dimulai dengan /storage, tambahkan base URL
  if (imagePath.startsWith('/storage')) {
    return `${BASE_URL}${imagePath}`;
  }
  
  // Jika tidak, tambahkan /storage/ dan base URL
  return `${BASE_URL}/storage/${imagePath}`;
};

export default api;
