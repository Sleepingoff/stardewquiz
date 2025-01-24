import { MouseEventHandler, useState } from "react";
import { Quiz } from "../../types";
import Progress from "../atoms/Progress";
import QuizSection from "../organisms/QuizSection";
import Layout from "./Layout";
import ScoreCard from "../molecules/ScoreCard";
import Button from "../atoms/Button";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface QuizTempProps {
  currentCategory: string;
  quiz: Quiz[];
  total: number;
}

const QuizTemp = ({ currentCategory, quiz, total }: QuizTempProps) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0); // 점수 상태
  const [selectedAnswer, setSelectedAnswer] = useState<string>(""); // 선택된 답
  const [isScoreCardVisible, setIsScoreCardVisible] = useState(false); // ScoreCard 표시 여부
  const auth = getAuth();
  const navigate = useNavigate();
  const handleClickNext: MouseEventHandler = (e) => {
    e.preventDefault();

    if (isScoreCardVisible) {
      // ScoreCard에서 다음 퀴즈로 이동
      setCurrent((prev) => prev + 1);
      setSelectedAnswer(""); // 선택 초기화
      setIsScoreCardVisible(false); // QuizSection으로 이동
    } else {
      // QuizSection에서 ScoreCard로 이동
      const currentQuiz = quiz[current];
      if (selectedAnswer === currentQuiz.answer) {
        setScore((prev) => prev + 1); // 점수 업데이트
      }
      setIsScoreCardVisible(true); // ScoreCard 표시
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer); // 사용자가 선택한 답
  };

  if (total == 0) {
    return (
      <Layout>
        <h3>{currentCategory}</h3>
        <p>준비된 문제가 없어요ㅠㅠ</p>
        {auth.currentUser ? (
          <Button
            onClick={() => {
              navigate("/new");
            }}
          >
            문제 추가하기
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            로그인하고 문제 추가하기
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
          <ScoreCard
            score={score}
            total={total}
            answer={selectedAnswer}
            correctAnswer={quiz[current].answer} // 정답 표시
            onClick={handleClickNext} // 다음 퀴즈로 이동
          />
        ) : (
          <QuizSection
            quizInfo={quiz[current]} // 현재 퀴즈 전달
            onAnswer={handleAnswerSelect} // 답안 선택 핸들러
            onClick={handleClickNext} // ScoreCard로 이동
          />
        )
      ) : (
        <p>퀴즈가 종료되었습니다!</p>
      )}
    </Layout>
  );
};

export default QuizTemp;
