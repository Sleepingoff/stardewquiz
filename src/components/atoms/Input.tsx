import { InputHTMLAttributes, useState } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => {
  const [value, setValue] = useState<string>("");
  return (
    <label htmlFor="">
      {label}
      <StyledInput
        onChange={(e) => setValue(e.target.value)}
        value={value}
        {...props}
      />
    </label>
  );
};

export default Input;

const StyledInput = styled.input`
  border: 1px solid #44121c;
  background-color: #ffd284;
`;
