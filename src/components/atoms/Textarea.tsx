import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  getValue: (value: string, name: string) => void;
}

const TextArea = ({ label, getValue, defaultValue, ...props }: InputProps) => {
  const [input, setValue] = useState<string>((defaultValue as string) ?? "");
  const divRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!divRef.current || !textRef.current) return;
    divRef.current.style.height = textRef.current.scrollHeight + "px";
  }, [input]);
  return (
    <label>
      {label}
      <StyledDiv ref={divRef}>
        <StyledTextarea
          ref={textRef}
          onChange={(e) => {
            setValue(e.target.value);
            getValue(e.target.value, props.name ?? "");
          }}
          value={input}
          {...props}
        ></StyledTextarea>
      </StyledDiv>
    </label>
  );
};

export default TextArea;
const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  min-height: 2rem;
  padding: 3px;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  flex-shrink: 0;

  border-radius: 1px;
  border: 1px solid var(--out-br, #853605);
  background: linear-gradient(
    230deg,
    #853605 19.82%,
    #a04505 39.44%,
    #b14e05 80.18%
  );
`;
const StyledTextarea = styled.textarea`
  &::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  padding: 0.5rem;
  width: 100%;
  height: auto;
  resize: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;

  border-radius: 1px;
  border-top: 2px solid #fa9305;
  border-right: 2px solid #fa9305;
  background: #ffd284;
`;
