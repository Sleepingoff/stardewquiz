import { MouseEventHandler, useEffect } from "react";
import { Quiz } from "../../types";
import AnswerCard from "../molecules/AnswerCard";
import QuizCard from "../molecules/QuizCard";
interface QuizSectionProps {
  quizInfo: Quiz;
  onClick: MouseEventHandler;
  onAnswer: (value: string) => void;
}

const QuizSection = ({ quizInfo, onClick, onAnswer }: QuizSectionProps) => {
  useEffect(() => {}, []);

  return (
    <section>
      <QuizCard
        question={quizInfo.quiz}
        description={quizInfo.description}
        img={{
          src: quizInfo.img?.src ?? "",
          alt: quizInfo.img?.alt ?? "",
        }}
      />
      <AnswerCard onClick={onClick} onAnswer={onAnswer} />
    </section>
  );
};

export default QuizSection;
