import { useParams } from "react-router-dom";
import QuizTemp from "../components/templates/QuizTemp";
import useQuiz from "../hooks/useQuiz";

const QuizPage = () => {
  const { categoryId } = useParams();

  const { quiz, loading } = useQuiz(categoryId!, categoryId == "random");

  return (
    <div>
      {!loading && (
        <QuizTemp
          currentCategory={categoryId ?? ""}
          quiz={quiz}
          total={quiz.length}
        ></QuizTemp>
      )}
    </div>
  );
};

export default QuizPage;
