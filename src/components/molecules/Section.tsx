import { HTMLAttributes } from "react";
import styled from "styled-components";

const Section = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <StyledSection {...props}>{children}</StyledSection>;
};

export default Section;

const StyledSection = styled.section``;
