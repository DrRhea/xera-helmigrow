import api from './api';
import { getErrorMessage, logError } from './errorHandler';

export interface GrowthRecord {
  id: number;
  child_id: number;
  weight: number;
  height: number;
  head_circumference?: number;
  record_date: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateGrowthRecordData {
  child_id: number;
  weight: number;
  height: number;
  head_circumference?: number;
  record_date: string;
  notes?: string;
}

class GrowthRecordService {
  // Get all growth records for a child
  async getGrowthRecords(childId: number): Promise<GrowthRecord[]> {
    try {
      console.log('Fetching growth records for child ID:', childId);
      const response = await api.get(`/growth-records?child_id=${childId}`);
      console.log('Growth records response:', response.data);
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching growth records:', error);
      logError('GetGrowthRecords', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Get single growth record by ID
  async getGrowthRecord(id: number): Promise<GrowthRecord> {
    try {
      const response = await api.get(`/growth-records/${id}`);
      return response.data.data;
    } catch (error: any) {
      logError('GetGrowthRecord', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Create new growth record
  async createGrowthRecord(growthRecordData: CreateGrowthRecordData): Promise<GrowthRecord> {
    try {
      console.log('Creating growth record with data:', growthRecordData);
      const response = await api.post('/growth-records', growthRecordData);
      console.log('Growth record created successfully:', response.data);
      return response.data.data;
    } catch (error: any) {
      console.error('Error creating growth record:', error);
      logError('CreateGrowthRecord', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Update growth record
  async updateGrowthRecord(id: number, growthRecordData: Partial<CreateGrowthRecordData>): Promise<GrowthRecord> {
    try {
      const response = await api.put(`/growth-records/${id}`, growthRecordData);
      return response.data.data;
    } catch (error: any) {
      logError('UpdateGrowthRecord', error);
      throw new Error(getErrorMessage(error));
    }
  }

  // Delete growth record
  async deleteGrowthRecord(id: number): Promise<void> {
    try {
      await api.delete(`/growth-records/${id}`);
    } catch (error: any) {
      logError('DeleteGrowthRecord', error);
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new GrowthRecordService();
