import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getErrorMessage, logError } from './errorHandler';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    token_type: string;
  };
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  phone: string;
  password: string;
}

class AuthService {
  // Register user
  async register(userData: RegisterData): Promise<LoginResponse> {
    try {
      const response = await api.post('/register', userData);
      
      const { data } = response.data;
      
      // Simpan token ke AsyncStorage
      await AsyncStorage.setItem('authToken', data.token);
      
      return response.data;
    } catch (error: any) {
      logError('Register', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Login user
  async login(loginData: LoginData): Promise<LoginResponse> {
    try {
      const response = await api.post('/login', loginData);
      
      const { data } = response.data;
      
      // Simpan token ke AsyncStorage
      try {
        await AsyncStorage.setItem('authToken', data.token);
      } catch (storageError) {
        console.error('❌ Failed to save token to AsyncStorage:', storageError);
        throw new Error('Failed to save authentication token');
      }
      
      return response.data;
    } catch (error: any) {
      logError('Login', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      const response = await api.post('/logout');
      await AsyncStorage.removeItem('authToken');
    } catch (error: any) {
      // Even if API call fails, remove token locally
      await AsyncStorage.removeItem('authToken');
      logError('Logout', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get('/user');
      return response.data.data;
    } catch (error: any) {
      logError('GetCurrentUser', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Check if user is logged in
  async isLoggedIn(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        return false;
      }

      // Validate token dengan server
      try {
        await this.getCurrentUser();
        return true;
      } catch (error) {
        // Token tidak valid, hapus dari storage
        await AsyncStorage.removeItem('authToken');
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  // Get stored token
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      return null;
    }
  }
}

export default new AuthService();
