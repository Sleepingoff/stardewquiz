import { HTMLAttributes, MouseEventHandler } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
interface ScoreCardProps extends HTMLAttributes<HTMLDivElement> {
  score: number;
  total: number;
  answer: string;
  correctAnswer: string; // 정답
  onClick: MouseEventHandler; // 다음 버튼 핸들러
}
const ScoreCard = ({
  score,
  total,
  answer,
  correctAnswer,
  onClick,
  ...props
}: ScoreCardProps) => {
  const isCorrect = answer == correctAnswer;
  return (
    <StyledCard {...props}>
      <p>
        <span>{isCorrect && "굳!"}</span>
        <span>{!isCorrect && "땡!"}</span>
      </p>
      <p>
        Answer: <span>{correctAnswer}</span>{" "}
      </p>
      <p>
        Your Answer: <span>{answer}</span>
      </p>

      <p>
        Current Score:{" "}
        <span>
          <strong>{score} </strong>/ {total}
        </span>
      </p>
      <Button onClick={onClick}>Next</Button>
    </StyledCard>
  );
};

export default ScoreCard;

const StyledCard = styled.div`
  strong {
    font-size: 2rem;
  }

  & > p:first-child,
  & > p:last-child {
    text-align: center;
  }
  & > :first-child > span:first-child {
    color: green;
    font-size: 2rem;
  }

  & > :first-child > span:last-child {
    color: red;
    font-size: 2rem;
  }
`;
