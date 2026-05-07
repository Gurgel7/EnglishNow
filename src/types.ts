export type View = 'path' | 'leaderboard' | 'tutor' | 'profile' | 'lesson';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  status: 'locked' | 'unlocked' | 'completed';
  type: 'grammar' | 'vocabulary' | 'speaking';
  icon: string;
}

export interface UserStats {
  xp: number;
  streak: number;
  hearts: number;
  gems: number;
  level: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'translation' | 'matching';
  text: string;
  options?: string[];
  correctAnswer: string | string[];
}
