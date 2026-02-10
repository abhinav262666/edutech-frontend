export interface Student {
  id: string;
  name: string;
  schoolId: string;
  organizationId: string;
  organizationName: string;
}

export interface Subject {
  id: string;
  name: string;
  iconUrl?: string;
  chaptersCount: number;
}

export interface Chapter {
  id: string;
  subjectId: string;
  chapterNumber: number;
  title: string;
  description: string;
  sessionsCount: number;
  ncertContent?: string;
}

export interface Session {
  id: string;
  chapterId: string;
  dateUploaded: string;
  duration: number; // in minutes
  status: 'approved' | 'pending' | 'rejected';
  transcriptPreview: string;
  transcript: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  pills?: string[];
  citations?: Citation[];
}

export interface Citation {
  id: string;
  type: 'textbook' | 'transcript';
  reference: string;
  text: string;
  page?: number;
  line?: number;
  timestamp?: string;
}

export interface Note {
  id: string;
  sessionId: string;
  chapterId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatHistory {
  sessionId: string;
  messages: Message[];
}
