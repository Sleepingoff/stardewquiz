import styled from "styled-components";
import { Stat } from "../../types";
import Score from "../atoms/Socre";
import Box from "../atoms/Box";

const StatCard = ({ stats }: { stats: Stat }) => {
  return (
    <StyledSection>
      <section>
        <h2>Your Quiz Stats</h2>
        <StyledDiv>
          <Box>
            Total Quiz: <span> {stats.totalQuiz || "000"}</span>
          </Box>
          <Box>
            Average Score:
            <span> {Math.round(stats.averageScore) || "000"}</span>
          </Box>
        </StyledDiv>
      </section>
      <section>
        <h3>Solved Quiz</h3>
        <ul>
          {Object.entries(stats.categoryScores).map(([category, score]) => (
            <StyledLi key={category}>
              <h4>{category}</h4>
              <Score score={score.toString()} />
            </StyledLi>
          ))}
        </ul>
      </section>
    </StyledSection>
  );
};

export default StatCard;

const StyledSection = styled.section`
  & > section {
    margin-bottom: 1rem;
  }

  & > section > * {
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.1rem;
  }
`;

const StyledDiv = styled.div`
  display: flex;

  & > *:last-child {
    flex-grow: 1;
  }
`;

const StyledLi = styled.li`
  display: flex;
  text-align: center;
  h4 {
    font-size: 1rem;
  }
  & > * {
    margin: auto;
  }

  & > *:first-child {
    flex-basis: 5rem;
    flex-grow: 0;
  }
`;
