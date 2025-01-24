import { HTMLAttributes } from "react";
import styled from "styled-components";
import Img from "../atoms/Img";
interface QuizCardProps extends HTMLAttributes<HTMLDivElement> {
  question: string;
  description?: string;
  img?: {
    src: string;
    alt: string;
  };
}
const QuizCard = ({
  question,
  description = "",
  img,
  ...props
}: QuizCardProps) => {
  return (
    <StyledCard {...props}>
      {" "}
      <h2>{question}</h2>
      {description && <p>{description}</p>}
      {img && <Img src={img.src} alt={img.alt} />}
    </StyledCard>
  );
};

export default QuizCard;

const StyledCard = styled.div``;
