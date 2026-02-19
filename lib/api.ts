import axios, { AxiosInstance, AxiosError } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach JWT token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('student');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// API functions
export const authAPI = {
  login: async (schoolId: string, password: string) => {
    const response = await api.post('/auth/login', { school_id: schoolId, password });
    // Backend returns: { success, message, data: { access_token, user } }
    // Transform to frontend expected format
    const { access_token, user } = response.data.data;
    return {
      token: access_token,
      student: {
        id: user.id,
        school_id: user.school_id,
        profile: { name: user.name },
        organization_id: user.organization_id || '',
        organization: { name: user.organization_name || 'Demo School' }
      }
    };
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

export const sessionsAPI = {
  getApproved: async () => {
    const response = await api.get('/sessions?approved=true');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/sessions/${id}`);
    return response.data;
  },
};

export const chatAPI = {
  ask: async (sessionId: string, question: string, chatHistory: any[]) => {
    const response = await api.post('/chat/ask', {
      session_id: sessionId,
      question,
      chat_history: chatHistory,
    });
    return response.data;
  },
};

export const notesAPI = {
  generate: async (sessionId: string, chatHistory: any[]) => {
    const response = await api.post('/notes/generate', {
      session_id: sessionId,
      chat_history: chatHistory,
    });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },
  update: async (id: string, content: string) => {
    const response = await api.put(`/notes/${id}`, { content });
    return response.data;
  },
  export: async (id: string, format: 'pdf' | 'markdown') => {
    const response = await api.get(`/notes/${id}/export?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
