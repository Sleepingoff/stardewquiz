import { useState, useCallback, useEffect } from "react";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useLanguage } from "../context/LanguageContext"; // 언어 컨텍스트 가져오기
import { db } from "../firebase.config";
import { TempQuiz } from "../types";

const useQuiz = (categoryId: string, random?: boolean, all?: boolean) => {
  const [quiz, setQuiz] = useState<TempQuiz[]>([]); // 전체 퀴즈 리스트
  const { language } = useLanguage(); // 전역 언어 설정 가져오기
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (random || !categoryId) {
      getRandomQuiz();
    } else {
      getQuizByCategoryId(categoryId);
    }
  }, [language, categoryId]);

  // 특정 카테고리 ID로 최대 10개의 퀴즈를 랜덤하게 가져오기
  const getQuizByCategoryId = async (categoryId: string) => {
    try {
      const langDocRef = doc(collection(db, "quiz"), language);
      const langDoc = await getDoc(langDocRef);

      const data = langDoc.data();
      if (!data || data.length === 0) {
        console.log(`No data found for category: ${categoryId}`);
        return [];
      }
      // 퀴즈 데이터를 배열로 변환
      const categoryData = Object.values(data[categoryId]) as TempQuiz[];
      const shuffledQuizzes = categoryData.sort(() => Math.random() - 0.5);
      const limitedQuizzes = shuffledQuizzes.slice(0, 10);
      setQuiz(all ? shuffledQuizzes : limitedQuizzes);
      return limitedQuizzes;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // 언어를 고려한 랜덤 퀴즈 가져오기
  const getRandomQuiz = async () => {
    try {
      const langDocRef = doc(collection(db, "quiz"), language);
      const langDoc = await getDoc(langDocRef);

      const data = langDoc.data();
      if (!data || data.length === 0) {
        console.log(`No data found for category: ${categoryId}`);
        return [];
      }
      // 모든 퀴즈 데이터를 메모리에 로드
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const quizzes = Object.entries(data).flatMap(([_, categoryQuizzes]) =>
        Object.values(categoryQuizzes)
      ) as TempQuiz[];

      // 랜덤하게 10개의 퀴즈 선택
      const randomQuizzes = [];
      const usedIndexes = new Set<number>();
      while (randomQuizzes.length < 10 && usedIndexes.size < quizzes.length) {
        const randomIndex = Math.floor(Math.random() * quizzes.length);
        if (!usedIndexes.has(randomIndex)) {
          randomQuizzes.push(quizzes[randomIndex]);
          usedIndexes.add(randomIndex);
        }
      }

      setQuiz(randomQuizzes);
      return randomQuizzes;
    } catch (error) {
      console.error("Failed to fetch a random quiz by language:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 특정 카테고리 이름으로 퀴즈 추가
  const setQuizWithCategoryName = useCallback(
    async (quizData: TempQuiz) => {
      try {
        const langDocRef = doc(collection(db, "quiz"), language);
        await updateDoc(langDocRef, {
          [`${quizData.categoryId}.${quizData.id}`]: {
            ...quizData,
          },
        });
        const newQuiz = { ...quizData, categoryId, language };
        return newQuiz;
      } catch (error) {
        console.error(
          "Failed to set quiz with category name and language:",
          error
        );
        throw error;
      }
    },
    [language]
  );

  return {
    quiz,
    loading,
    error,
    getQuizByCategoryId,
    getRandomQuiz,
    setQuizWithCategoryName,
  };
};

export default useQuiz;
