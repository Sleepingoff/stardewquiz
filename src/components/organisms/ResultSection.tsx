import Section from "../molecules/Section";
interface ResultSectionProps {
  result: string;
}
const ResultSection = ({ result }: ResultSectionProps) => {
  return (
    <Section>
      {result ? (
        <div>
          <h2>퀴즈 결과</h2>
          <p>{result}</p>
        </div>
      ) : (
        <p>결과를 불러오는 중...</p>
      )}
    </Section>
  );
};

export default ResultSection;
