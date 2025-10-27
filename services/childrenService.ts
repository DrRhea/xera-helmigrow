import api from './api';
import { getErrorMessage, logError } from './errorHandler';

export interface Child {
  id: number;
  user_id: number;
  name: string;
  birth_date: string;
  gender: 'Laki-laki' | 'Perempuan';
  weight?: number;
  height?: number;
  head_circumference?: number;
  blood_type?: string;
  allergies?: string[];
  medical_history?: string[];
  parent_name?: string;
  parent_phone?: string;
  emergency_contact?: string;
  address?: string;
  notes?: string;
  profile_image?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateChildData {
  name: string;
  birth_date: string;
  gender: 'Laki-laki' | 'Perempuan';
  weight?: number;
  height?: number;
  head_circumference?: number;
  blood_type?: string;
  allergies?: string[];
  medical_history?: string[];
  parent_name?: string;
  parent_phone?: string;
  emergency_contact?: string;
  address?: string;
  notes?: string;
  profile_image?: string;
}

class ChildrenService {
  // Get all children for current user
  async getChildren(): Promise<Child[]> {
    try {
      const response = await api.get('/children');
      return response.data.data;
    } catch (error: any) {
      logError('GetChildren', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Get single child by ID
  async getChild(id: number): Promise<Child> {
    try {
      const response = await api.get(`/children/${id}`);
      return response.data.data;
    } catch (error: any) {
      logError('GetChild', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Create new child
  async createChild(childData: CreateChildData): Promise<Child> {
    try {
      const response = await api.post('/children', childData);
      return response.data.data;
    } catch (error: any) {
      logError('CreateChild', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Update child
  async updateChild(id: number, childData: Partial<CreateChildData>): Promise<Child> {
    try {
      const response = await api.put(`/children/${id}`, childData);
      return response.data.data;
    } catch (error: any) {
      logError('UpdateChild', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Delete child
  async deleteChild(id: number): Promise<void> {
    try {
      await api.delete(`/children/${id}`);
    } catch (error: any) {
      logError('DeleteChild', error);
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new ChildrenService();
