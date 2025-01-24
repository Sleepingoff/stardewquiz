import { useState, useCallback, useEffect } from "react";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { useLanguage } from "../context/LanguageContext"; // 언어 컨텍스트 가져오기
import { db } from "../firebase.config";
import { Quiz } from "../types";

const useQuiz = (categoryId: string, random?: boolean) => {
  const [quiz, setQuiz] = useState<Quiz[]>([]); // 전체 퀴즈 리스트
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null); // 선택된 랜덤 퀴즈
  const { language } = useLanguage(); // 전역 언어 설정 가져오기
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (random) {
      getRandomQuiz();
    } else {
      getQuizByCategoryId(categoryId);
    }
  }, [language, categoryId]);

  // 특정 카테고리 ID로 최대 10개의 퀴즈를 랜덤하게 가져오기
  const getQuizByCategoryId = async (categoryId: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, "quiz"));
      const fetchedQuizzes = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return data[language];
      });

      // 가져온 퀴즈 중에서 최대 10개를 랜덤하게 선택
      const shuffledQuizzes = fetchedQuizzes.sort(() => Math.random() - 0.5);
      const limitedQuizzes = shuffledQuizzes.slice(0, 10);
      setQuiz(limitedQuizzes[0][categoryId]);
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
      const q = query(
        collection(db, "quizzes"),
        where("language", "==", language)
      );
      const querySnapshot = await getDocs(q);
      const allQuizzes = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Quiz),
      }));
      const randomQuiz =
        allQuizzes[Math.floor(Math.random() * allQuizzes.length)];
      setSelectedQuiz(randomQuiz);
      return randomQuiz;
    } catch (error) {
      console.error("Failed to fetch a random quiz by language:", error);
      throw error;
    }
  };

  // 특정 카테고리 이름으로 퀴즈 추가
  const setQuizWithCategoryName = useCallback(
    async (quizData: Quiz, categoryId: string) => {
      try {
        const docRef = await addDoc(collection(db, "quiz"), {
          ...quizData,
          categoryId,
          language,
        });
        const newQuiz = { id: docRef.id, ...quizData, categoryId, language };
        setQuiz((prevQuizzes) => prevQuizzes);
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
    selectedQuiz,
    getQuizByCategoryId,
    getRandomQuiz,
    setQuizWithCategoryName,
  };
};

export default useQuiz;
