import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Score, Stat, Stats } from "../types";

const useStat = (userId: string | undefined) => {
  const [stat, setStat] = useState<Stat | null>(null);
  useEffect(() => {
    if (!userId) return;
    fetchUserStats(userId).then((res) => {
      setStat(res);
    });
  }, [userId]);

  const fetchUserStats = async (userId: string): Promise<Stat | null> => {
    const db = getFirestore();
    const statsRef = doc(collection(db, "scores"), userId); // Firestore 경로 설정
    const docSnap = await getDoc(statsRef);

    if (!docSnap.exists()) {
      console.log("No stats document found!");
      return null;
    }

    const data = docSnap.data();
    const categories = data.categories as Stats;

    let totalQuiz = 0;
    let totalScore = 0;
    const categoryScores: { [category: string]: number } = {};

    // 각 카테고리를 순회하며 데이터를 분석
    Object.entries(categories).forEach(
      ([category, details]: [string, { history: Score[]; latest: Score }]) => {
        const history = details.history;
        const categoryTotalScore = history.reduce(
          (a, { solved }) => a + solved,
          0
        );

        totalQuiz += history.length;
        totalScore += categoryTotalScore;
        categoryScores[category] = categoryTotalScore; // 누적 점수 저장
      }
    );

    const averageScore = totalQuiz > 0 ? totalScore / totalQuiz : 0;

    return {
      totalQuiz,
      averageScore,
      categoryScores,
    };
  };

  return stat;
};
export default useStat;
