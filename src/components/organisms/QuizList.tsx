import { useParams } from "react-router-dom";
import useQuiz from "../../hooks/useQuiz";
import Box from "../atoms/Box";
import styled from "styled-components";

const QuizList = () => {
  const { categoryId } = useParams();
  const { quiz } = useQuiz(categoryId!, categoryId == "random", true);
  return (
    <section>
      <h3 style={{ textAlign: "center" }}>Quiz List</h3>
      <ul>
        {quiz.map((q) => (
          <li key={q.id}>
            <Box>
              <StyledP>{q.quiz}</StyledP>
            </Box>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default QuizList;

const StyledP = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;
