import { Timestamp } from "firebase/firestore";

export interface Category {
  farming: string;
  fishing: string;
  mining: string;
}
export interface Score {
  score: number;
  corrects: number;
}

export interface Quiz {
  quiz: string;
  answer: string;
  description?: string;
  img?: {
    src: string;
    alt: string;
  };
}

export interface Stat {
  totalQuiz: number; // 총 푼 퀴즈 개수
  averageScore: number; // 평균 점수
  categoryScores: {
    [category: string]: number; // 카테고리별 최고 점수 (카테고리 이름: 점수)
  };
}

export interface Stats {
  categories: {
    [key: string]: {
      history: Score[];
      latest: Score;
      lastUpdated: Timestamp;
    };
  };
}

export interface TempQuiz {
  id: string;
  user: string;
  status: string;
  categoryId: string;
  quiz: string;
  answer: string;
  description: string;
  src: string;
  alt: string;
}
