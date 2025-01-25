import { useParams } from "react-router-dom";
import useQuiz from "../../hooks/useQuiz";
import Box from "../atoms/Box";

const QuizList = () => {
  const { categoryId } = useParams();
  const { quiz } = useQuiz(categoryId!, categoryId == "random", true);
  return (
    <section>
      <h3 style={{ textAlign: "center" }}>Quiz List</h3>
      <ul>
        {quiz.map((q) => (
          <li key={q.id}>
            <Box>{q.quiz}</Box>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default QuizList;
