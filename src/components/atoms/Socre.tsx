import styled from "styled-components";

interface ScoreProps {
  score: string;
}

const Score = ({ score }: ScoreProps) => {
  const length = Array(score.length >= 6 ? score.length : 6).fill(0);

  return (
    <StyledDiv>
      <div>
        {length.map((_, idx) => {
          return (
            <StyledSpan key={"letter" + idx}>
              {score.padStart(6, "0")[idx]}
            </StyledSpan>
          );
        })}
      </div>
    </StyledDiv>
  );
};

export default Score;

const StyledDiv = styled.div`
  display: inline-flex;
  /* min-width: 160px; */
  padding: 3px 6px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 15px;
  border: 2px solid var(--out-br, #853605);
  background: var(--out-bg, #fa9305);

  &::before {
    content: "G";
    color: var(--text, #5b2b2a);
    text-shadow: 0px -1px 1px var(--highlight, #fffe80);
    font-family: SUIT;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  &::after {
    content: "";
    width: 2px;
    height: 8px;
    display: block;
    background: #fffe80;
  }

  & > div {
    display: flex;
  }
`;

const StyledSpan = styled.span`
  display: flex;
  min-width: 14px;
  height: 100%;
  padding: 0.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 1px;
  border-top: 2px solid #c4a16b;
  border-right: 2px solid #c4a16b;
  background: var(--in-bg, #ffd284);
`;
