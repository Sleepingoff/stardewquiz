import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import Img from "../atoms/Img";

interface IconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
}

const Icon = ({ src, ...props }: IconProps) => {
  return (
    <StyledIcon {...props}>
      <StyledLine color="#FFD284" />
      <Img src={src} alt="icon" />
      <StyledLine color="#B14E05" />
    </StyledIcon>
  );
};
export default Icon;

const StyledIcon = styled.button`
  display: flex;
  width: 24px;
  height: 24px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  border-radius: 2px;
  border: 2px solid #3f0f08;
  background: #e27a3e;

  & img {
    max-width: calc(100% - 4px);
  }
`;
const StyledLine = styled.div<{ color: string }>`
  width: 100%;
  height: 2px;
  flex-shrink: 0;
  background-color: ${(props) => props.color};
`;
