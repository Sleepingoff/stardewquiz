import { MouseEventHandler, useEffect } from "react";
import { Quiz } from "../../types";
import AnswerCard from "../molecules/AnswerCard";
import QuizCard from "../molecules/QuizCard";
import Section from "../molecules/Section";
interface QuizSectionProps {
  quizInfo: Quiz;
  onClick: MouseEventHandler;
  onAnswer: (value: string) => void;
}

const QuizSection = ({ quizInfo, onClick, onAnswer }: QuizSectionProps) => {
  useEffect(() => {}, []);

  return (
    <Section>
      <QuizCard
        question={quizInfo.quiz}
        description={quizInfo.description}
        img={{
          src: quizInfo.img?.src ?? "",
          alt: quizInfo.img?.alt ?? "",
        }}
      />
      <AnswerCard onClick={onClick} onAnswer={onAnswer} />
    </Section>
  );
};

export default QuizSection;
