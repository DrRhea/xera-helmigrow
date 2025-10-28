import api from './api';
import { getErrorMessage, logError } from './errorHandler';

export interface UserStats {
  childrenCount: number;
  articlesRead: number;
  recipesTried: number;
}

class StatsService {
  // Get user statistics
  async getUserStats(): Promise<UserStats> {
    try {
      console.log('📊 Fetching user statistics...');
      const response = await api.get('/user/stats');
      console.log('📊 User stats response:', response.data);
      
      return response.data.data;
    } catch (error: any) {
      logError('GetUserStats', error);
      
      // Return default stats if API fails
      return {
        childrenCount: 0,
        articlesRead: 0,
        recipesTried: 0,
      };
    }
  }

  // Get articles read count
  async getArticlesReadCount(): Promise<number> {
    try {
      const response = await api.get('/user/articles-read-count');
      return response.data.data.count;
    } catch (error: any) {
      logError('GetArticlesReadCount', error);
      return 0;
    }
  }

  // Get recipes tried count
  async getRecipesTriedCount(): Promise<number> {
    try {
      const response = await api.get('/user/recipes-tried-count');
      return response.data.data.count;
    } catch (error: any) {
      logError('GetRecipesTriedCount', error);
      return 0;
    }
  }

  // Simulate some activity for demo purposes
  getSimulatedStats(): UserStats {
    // This is for demo purposes when API is not available
    return {
      childrenCount: 0, // Will be updated by childrenService
      articlesRead: Math.floor(Math.random() * 20) + 5, // Random between 5-24
      recipesTried: Math.floor(Math.random() * 15) + 3, // Random between 3-17
    };
  }
}

export default new StatsService();
