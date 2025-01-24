import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import ResultSection from "../organisms/ResultSection";
import Layout from "./Layout";

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
      <Button onClick={handleClickStart}>Go!</Button>
    </Layout>
  );
};

export default ResultTemp;
