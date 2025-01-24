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
  return (
    <StyledCard {...props}>
      <p>
        당신의 답: <strong>{answer}</strong>
      </p>
      <p>
        정답: <strong>{correctAnswer}</strong>
      </p>
      <p>
        현재 점수: {score} / {total}
      </p>
      <Button onClick={onClick}>다음</Button>
    </StyledCard>
  );
};

export default ScoreCard;

const StyledCard = styled.div``;
