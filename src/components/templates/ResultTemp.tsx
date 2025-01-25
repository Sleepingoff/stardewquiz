import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import ResultSection from "../organisms/ResultSection";
import Layout from "./Layout";
import QuizList from "../organisms/QuizList";

interface ResultTempProps {
  currentCategory: string;
  result: string;
}
const ResultTemp = ({ currentCategory, result }: ResultTempProps) => {
  const navigate = useNavigate();
  const handleClickStart = () => {
    navigate(`/quiz/${currentCategory}/1`);
  };
  return (
    <Layout>
      <h3>{currentCategory}</h3>
      <ResultSection result={result} />
      <Button style={{ margin: "auto" }} onClick={handleClickStart}>
        Go!
      </Button>
      <QuizList />
    </Layout>
  );
};

export default ResultTemp;
