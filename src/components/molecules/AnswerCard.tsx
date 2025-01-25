import { MouseEventHandler } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Textarea";

interface AnswerCardProps {
  onClick: MouseEventHandler;
  onAnswer: (value: string) => void;
}

const AnswerCard = ({ onClick, onAnswer }: AnswerCardProps) => {
  return (
    <form>
      <Input label="" placeholder="정답을 입력하세요" getValue={onAnswer} />
      <Button style={{ marginLeft: "auto" }} onClick={onClick}>
        Next
      </Button>
    </form>
  );
};
export default AnswerCard;
