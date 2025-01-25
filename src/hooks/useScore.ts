import {
  arrayUnion,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { Category, Score } from "../types";

const useScore = () => {
  const initializeUserCategories = async (
    userId: string,
    categories: Category
  ) => {
    const userScoreRef = doc(collection(db, "scores"), userId);

    try {
      const userDoc = await getDoc(userScoreRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // 초기화가 필요한 카테고리를 확인
        const updates: Record<string, { latest: Score; history: Score[] }> = {};
        Object.keys(categories).forEach((category) => {
          if (!userData.categories?.[category]) {
            updates[`categories.${category}`] = {
              latest: { solved: 0, corrects: 0 },
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
          categories: Object.keys(categories).reduce(
            (acc, category) => {
              acc[category] = {
                latest: { solved: 0, corrects: 0 },
                history: [],
              };
              return acc;
            },
            {} as Record<string, { latest: Score; history: Score[] }>
          ),
          lastUpdated: Timestamp.now(),
        };

        await setDoc(userScoreRef, initialData);
      }
    } catch (error) {
      console.error("Error initializing user categories:", error);
    }
  };

  const getUserLatestScore = async (userId: string, category: string) => {
    const userScoreRef = doc(collection(db, "scores"), userId);

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
    newScore: number,
    total: number
  ) => {
    const userScoreRef = doc(collection(db, "scores"), userId);

    const newData = { corrects: newScore, solved: total };

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
