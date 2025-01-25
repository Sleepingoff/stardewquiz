import { useEffect, useState } from "react";
import ResultTemp from "../components/templates/ResultTemp";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import useScore from "../hooks/useScore";

const ResultPage = () => {
  const { categoryId } = useParams();

  const [result, setResult] = useState<string>("0"); // 결과 데이터를 저장
  const auth = getAuth();
  const { getUserLatestScore } = useScore();

  useEffect(() => {
    if (!categoryId || categoryId == "random") return;
    const user = auth.currentUser;

    if (user) {
      // 로그인된 경우 Firebase에서 최신 결과 가져오기
      getUserLatestScore(user.uid, categoryId);
    } else {
      // 비로그인 상태에서 로컬스토리지의 결과 가져오기
      const localScore = localStorage.getItem("latestQuizResult");
      const localResult = localScore
        ? JSON.parse(localScore)
        : {
            [categoryId]: "0",
          };
      setResult(localResult[categoryId] ?? "");
    }
  }, [auth]);

  return <ResultTemp currentCategory={categoryId ?? ""} result={result} />;
};
export default ResultPage;
