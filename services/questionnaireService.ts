import api from './api';

export interface QuestionnaireAnswer {
  question_id: number;
  answer: boolean;
}

export interface QuestionnaireSubmission {
  child_id: number;
  questionnaire_type: string;
  age_in_months: number;
  answers: QuestionnaireAnswer[];
  completed_at: string;
}

export interface QuestionnaireResult {
  id: number;
  child_id: number;
  questionnaire_type: string;
  age_in_months: number;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  development_status: 'Normal' | 'Perlu Perhatian' | 'Perlu Evaluasi';
  recommendations: string[];
  completed_at: string;
  created_at: string;
  updated_at: string;
}

const questionnaireService = {
  // Submit questionnaire answers
  async submitQuestionnaire(submission: QuestionnaireSubmission): Promise<QuestionnaireResult> {
    try {
      const response = await api.post('/questionnaires', submission);
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to submit questionnaire:', error);
      throw new Error(error.response?.data?.message || 'Gagal menyimpan kuesioner');
    }
  },

  // Get questionnaire history for a child
  async getQuestionnaireHistory(childId: number): Promise<QuestionnaireResult[]> {
    try {
      const response = await api.get(`/questionnaires/child/${childId}`);
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to get questionnaire history:', error);
      throw new Error(error.response?.data?.message || 'Gagal memuat riwayat kuesioner');
    }
  },

  // Get questionnaire result by ID
  async getQuestionnaireResult(questionnaireId: number): Promise<QuestionnaireResult> {
    try {
      const response = await api.get(`/questionnaires/${questionnaireId}`);
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to get questionnaire result:', error);
      throw new Error(error.response?.data?.message || 'Gagal memuat hasil kuesioner');
    }
  },

  // Get development recommendations based on age
  async getDevelopmentRecommendations(ageInMonths: number): Promise<string[]> {
    try {
      const response = await api.get(`/questionnaires/recommendations/${ageInMonths}`);
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to get recommendations:', error);
      // Return default recommendations if API fails
      return getDefaultRecommendations(ageInMonths);
    }
  }
};

// Default recommendations based on age
const getDefaultRecommendations = (ageInMonths: number): string[] => {
  if (ageInMonths >= 0 && ageInMonths <= 3) {
    return [
      'Berikan stimulasi visual dengan mainan berwarna cerah',
      'Ajak bayi berbicara dan tersenyum sesering mungkin',
      'Lakukan tummy time 2-3 kali sehari',
      'Berikan mainan yang aman untuk digenggam'
    ];
  } else if (ageInMonths >= 4 && ageInMonths <= 6) {
    return [
      'Ajak bayi duduk dengan bantuan',
      'Berikan mainan yang bisa dipegang dan dimasukkan ke mulut',
      'Bacakan cerita dengan gambar',
      'Ajak bermain cilukba'
    ];
  } else if (ageInMonths >= 7 && ageInMonths <= 9) {
    return [
      'Ajak bayi merangkak dan bergerak',
      'Berikan finger food untuk melatih motorik halus',
      'Ajak bermain dengan balok',
      'Bacakan buku dengan gambar besar'
    ];
  } else if (ageInMonths >= 10 && ageInMonths <= 12) {
    return [
      'Ajak bayi berdiri dan berjalan dengan bantuan',
      'Berikan mainan yang bisa didorong',
      'Ajak bermain dengan puzzle sederhana',
      'Bacakan cerita dan ajak bernyanyi'
    ];
  } else {
    return [
      'Berikan stimulasi sesuai tahap perkembangan',
      'Ajak bermain dan berinteraksi',
      'Bacakan buku dan cerita',
      'Berikan mainan yang sesuai usia'
    ];
  }
};

export default questionnaireService;
