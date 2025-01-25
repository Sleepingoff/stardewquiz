import { HTMLAttributes } from "react";
import styled from "styled-components";

const Box = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <StyledBox {...props}>
      <StyledBorderY />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "stretch",
        }}
      >
        <StyledBorderX />
        <div style={{ margin: "18px 20px" }}>{children}</div>
        <StyledBorderX />
      </div>
      <StyledBorderY />
    </StyledBox>
  );
};

export default Box;

const StyledBox = styled.div`
  display: flex;
  min-width: 20px;
  min-height: 20px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;

  background: #ffd284;
`;

const StyledBorderY = () => {
  return (
    <StyledBorderSpan aria-hidden>
      <StyledContainer>
        <StyledDashed color="#96473A" direction="x" />
        <StyledDashed color="#96473A" direction="x" />
      </StyledContainer>
    </StyledBorderSpan>
  );
};

const StyledBorderX = () => {
  return (
    <StyledBorderSpanX aria-hidden>
      <StyledShadow />
      <StyledContainerX>
        <StyledDashed color="#FFBE65" />
        <StyledDashed color="#FFBE65" />
      </StyledContainerX>
    </StyledBorderSpanX>
  );
};

const StyledShadow = styled.div`
  width: 100%;
  height: 6px;
  flex-shrink: 0;
  align-self: stretch;
  background: #96473a;
`;
const StyledDashed = styled.div<{ color: string; direction?: string }>`
  /* Default size for the dashed line */
  ${({ direction }) => (direction === "x" ? "width: 1px;" : "height: 1px;")}
  background-color: inherit;

  &:nth-child(1) {
    ${({ direction }) => (direction === "x" ? "width: 30%;" : "height: 27px;")}
  }

  &:nth-child(2) {
    ${({ direction }) => (direction === "x" ? "width: 10%;" : "height: 16px;")}
  }
  border: 1px solid ${(props) => props.color};
  border-style: dashed solid;
`;
const StyledBorderSpan = styled.span`
  display: flex;
  height: 16px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;

  border-radius: 2px;
  border: 2px solid #3f0f08;
  background: #e27a3e;
`;
const StyledBorderSpanX = styled(StyledBorderSpan)`
  /* border-top: none; */
  /* border-bottom: none; */
  height: 100%;
  width: 16px;
  flex-shrink: 0;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  flex-shrink: 0;
  align-self: stretch;

  border-top: 1px solid #ffbe65;
  border-right: 1px solid #ffbe65;
  border-left: 1px solid #ffbe65;
`;

const StyledContainerX = styled(StyledContainer)`
  flex-direction: column;
  height: 100%;

  border-top: none;
  border-right: 1px solid #ffbe65;
  border-left: none;
  border-bottom: 1px solid #ffbe65;
`;
