import {
  arrayUnion,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { Category, Score } from "../types";

const useScore = () => {
  const initializeUserCategories = async (
    userId: string,
    categories: Category[]
  ) => {
    const userScoreRef = doc(db, "scores", userId);

    try {
      const userDoc = await getDoc(userScoreRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // 초기화가 필요한 카테고리를 확인
        const updates: Record<string, { latest: Timestamp; history: Score[] }> =
          {};
        categories.forEach((category) => {
          if (!userData.categories?.[category.id]) {
            updates[`categories.${category.id}`] = {
              latest: Timestamp.now(),
              history: [],
            };
          }
        });

        // Firestore 업데이트
        if (Object.keys(updates).length > 0) {
          await updateDoc(userScoreRef, updates);
          console.log("Missing categories initialized:", updates);
        } else {
          console.log("All categories are already initialized.");
        }
      } else {
        // 문서가 없으면 초기 데이터 생성
        const initialData = {
          categories: categories.reduce(
            (acc, category) => {
              acc[category.id] = { latest: Timestamp.now(), history: [] };
              return acc;
            },
            {} as Record<string, { latest: Timestamp; history: Score[] }>
          ),
          lastUpdated: null,
        };

        await setDoc(userScoreRef, initialData);
      }
    } catch (error) {
      console.error("Error initializing user categories:", error);
    }
  };

  const getUserLatestScore = async (userId: string, category: string) => {
    const userScoreRef = doc(db, "scores", userId);

    try {
      const docSnap = await getDoc(userScoreRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const latest = data.categories[category]?.latest || null;
        return latest;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user score:", error);
    }
  };

  const updateUserScore = async (
    userId: string,
    category: string,
    newScore: number
  ) => {
    const userScoreRef = doc(db, "scores", userId);

    const newData = { score: newScore, attempts: Date.now() };

    try {
      await updateDoc(userScoreRef, {
        [`categories.${category}.latest`]: newData, // 최신 데이터 업데이트
        [`categories.${category}.history`]: arrayUnion(newData), // 히스토리 추가
        lastUpdated: new Date().toISOString(), // 마지막 업데이트 시간 갱신
      });
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  return { initializeUserCategories, getUserLatestScore, updateUserScore };
};

export default useScore;
