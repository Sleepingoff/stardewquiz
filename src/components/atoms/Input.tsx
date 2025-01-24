import { InputHTMLAttributes, useEffect, useState } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  getValue: (value: string) => void;
}

const Input = ({ label, getValue, ...props }: InputProps) => {
  const [input, setValue] = useState<string>("");

  useEffect(() => {
    getValue(input);
  }, [input]);

  return (
    <label htmlFor="">
      {label}
      <StyledInput
        onChange={(e) => setValue(e.target.value)}
        value={input}
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
