import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton {...props}>
      <span>{children}</span>
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  margin: auto;
  display: flex;
  padding: 3px;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;

  border-radius: 2px;
  border: 2px solid var(--out-br, #853605);
  background: linear-gradient(
    230deg,
    #fa9305 19.82%,
    #d97405 66.9%,
    #b14e05 80.18%
  );

  & > span {
    position: relative;
    display: flex;
    width: 100%;
    padding: 4px 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 1px;
    border: 2px solid #b14e05;
    background: #ffd284;
  }

  & > span::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: 0;
    margin-bottom: 0;
    width: 100%;
    height: 2px;
    background: #edbb64;
  }
`;
