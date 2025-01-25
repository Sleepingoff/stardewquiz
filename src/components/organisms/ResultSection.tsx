import styled from "styled-components";

interface ResultSectionProps {
  result: string;
  total?: string;
}
const ResultSection = ({ result, total = "10" }: ResultSectionProps) => {
  return (
    <section>
      <ResultDiv>
        <h2>Latest Result</h2>
        <p>
          {result}/{total}
        </p>
      </ResultDiv>
    </section>
  );
};

export default ResultSection;

const ResultDiv = styled.div`
  text-align: center;
  & > p {
    font-size: 2rem;
  }
`;
