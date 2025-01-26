import {
  arrayUnion,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  collection,
  Timestamp,
  runTransaction,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { Category, Score, TempQuiz } from "../types";

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
    quiz: TempQuiz,
    incrementScore: number,
    incrementTotal: number,
    isFinalUpdate: boolean = false // 최종 업데이트 여부
  ) => {
    const userScoreRef = doc(collection(db, "scores"), userId);

    try {
      await runTransaction(db, async (transaction) => {
        const docSnapshot = await transaction.get(userScoreRef);

        if (!docSnapshot.exists()) {
          // 유저 데이터가 없으면 초기화
          transaction.set(userScoreRef, {
            categories: {
              [quiz.categoryId]: {
                latest: { corrects: 0, solved: 0 },
                history: [],
              },
            },
            lastUpdated: new Date().toISOString(),
          });
        }

        const userData = docSnapshot.data();
        const currentCategory = userData?.categories?.[quiz.categoryId] || {
          latest: { corrects: 0, solved: 0 },
          history: [],
        };

        const updatedLatest = {
          corrects: currentCategory.latest.corrects + incrementScore,
          solved: currentCategory.latest.solved + 1,
        };

        // 항상 최신 데이터를 업데이트
        transaction.update(userScoreRef, {
          [`categories.${quiz.categoryId}.latest`]: updatedLatest,
          lastUpdated: new Date().toISOString(),
        });

        // `isFinalUpdate`가 true인 경우에만 히스토리를 추가
        if (isFinalUpdate) {
          transaction.update(userScoreRef, {
            [`categories.${quiz.categoryId}.history`]:
              arrayUnion(updatedLatest),
          });
        }
      });
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  return { initializeUserCategories, getUserLatestScore, updateUserScore };
};

export default useScore;
