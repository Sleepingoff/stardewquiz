import { MouseEventHandler, useState } from "react";
import { TempQuiz } from "../../types";
import Progress from "../atoms/Progress";
import QuizSection from "../organisms/QuizSection";
import Layout from "./Layout";
import ScoreCard from "../molecules/ScoreCard";
import Button from "../atoms/Button";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import QuizCard from "../molecules/QuizCard";
import { collection, doc, runTransaction } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useLanguage } from "../../context/LanguageContext";
import useScore from "../../hooks/useScore";

interface QuizTempProps {
  currentCategory: string;
  quiz: TempQuiz[];
  total: number;
}

const QuizTemp = ({ currentCategory, quiz, total }: QuizTempProps) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0); // 점수 상태
  const [selectedAnswer, setSelectedAnswer] = useState<string>(""); // 선택된 답
  const [isScoreCardVisible, setIsScoreCardVisible] = useState(false); // ScoreCard 표시 여부
  const auth = getAuth();
  const navigate = useNavigate();
  const handleClickNext: MouseEventHandler = async (e) => {
    e.preventDefault();

    if (isScoreCardVisible) {
      // ScoreCard에서 다음 퀴즈로 이동
      setCurrent((prev) => prev + 1);
      setSelectedAnswer(""); // 선택 초기화
      setIsScoreCardVisible(false); // QuizSection으로 이동
    } else {
      // QuizSection에서 ScoreCard로 이동
      const currentQuiz = quiz[current];

      // 시도 횟수 증가
      await updateQuizStats(
        currentQuiz.id,
        selectedAnswer === currentQuiz.answer
      );

      if (selectedAnswer === currentQuiz.answer) {
        setScore((prev) => prev + 1); // 점수 업데이트
      }
      setIsScoreCardVisible(true); // ScoreCard 표시
    }
  };
  const { language } = useLanguage();
  const updateQuizStats = async (quizId: string, isCorrect: boolean) => {
    try {
      const quizRef = doc(collection(db, "quiz"), language); // 퀴즈 문서 참조
      await runTransaction(db, async (transaction) => {
        const quizDoc = await transaction.get(quizRef);
        console.log(quizDoc);
        if (!quizDoc.exists()) throw new Error("Quiz does not exist");

        const quizData = quizDoc.data();
        const newCorrects = isCorrect
          ? (quizData.corrects || 0) + 1
          : quizData.corrects || 0;
        const newAttempts = (quizData.attempts || 0) + 1;

        transaction.update(quizRef, {
          corrects: newCorrects,
          attempts: newAttempts,
        });
      });
    } catch (error) {
      console.error("Failed to update quiz stats or user records:", error);
    }
  };
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer); // 사용자가 선택한 답
  };
  const { updateUserScore } = useScore();

  const handleClickSave = () => {
    if (!auth.currentUser) return;
    updateUserScore(auth.currentUser.uid, currentCategory, score, quiz.length);
  };
  if (total == 0) {
    return (
      <Layout>
        <h3>{currentCategory}</h3>
        <p>No Quiz {`:(`}</p>
        {auth.currentUser ? (
          <Button
            onClick={() => {
              navigate("/new");
            }}
          >
            Go to add Quiz
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Login to add Quiz
          </Button>
        )}
      </Layout>
    );
  }
  return (
    <Layout>
      <h3>{currentCategory}</h3>
      <Progress current={current} total={total} />
      {current < quiz.length ? (
        isScoreCardVisible ? (
          <>
            <QuizCard
              question={quiz[current].quiz}
              description={quiz[current].description}
              img={{
                src: quiz[current].src ?? "",
                alt: quiz[current].alt ?? "",
              }}
            />
            <ScoreCard
              score={score}
              total={total}
              answer={selectedAnswer}
              correctAnswer={quiz[current].answer} // 정답 표시
              onClick={handleClickNext} // 다음 퀴즈로 이동
            />
          </>
        ) : (
          <QuizSection
            quizInfo={quiz[current]} // 현재 퀴즈 전달
            onAnswer={handleAnswerSelect} // 답안 선택 핸들러
            onClick={handleClickNext} // ScoreCard로 이동
          />
        )
      ) : (
        <div>
          <p>End!</p>
          <Button onClick={handleClickSave}>Save Result</Button>
        </div>
      )}
    </Layout>
  );
};

export default QuizTemp;
