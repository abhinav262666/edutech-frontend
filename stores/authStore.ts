import { create } from 'zustand';
import { Student } from '@/types';

interface AuthState {
  student: Student | null;
  isAuthenticated: boolean;
  token: string | null;
  setAuth: (student: Student, token: string) => void;
  clearAuth: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  student: null,
  isAuthenticated: false,
  token: null,

  setAuth: (student, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      localStorage.setItem('student', JSON.stringify(student));
    }
    set({ student, token, isAuthenticated: true });
  },

  clearAuth: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('student');
    }
    set({ student: null, token: null, isAuthenticated: false });
  },

  initAuth: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      const studentData = localStorage.getItem('student');

      if (token && studentData) {
        try {
          const student = JSON.parse(studentData);
          set({ student, token, isAuthenticated: true });
        } catch (error) {
          console.error('Failed to parse student data:', error);
        }
      }
    }
  },
}));
