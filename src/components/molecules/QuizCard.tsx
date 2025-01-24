import { HTMLAttributes } from "react";
import styled from "styled-components";

const QuizCard = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};

export default QuizCard;

const StyledCard = styled.div``;
