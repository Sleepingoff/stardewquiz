import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
  border: 1px solid #44121c;
  background-color: #ffd284;
`;
