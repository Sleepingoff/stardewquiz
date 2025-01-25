import { useState, useRef, useEffect } from "react";
import Button from "../atoms/Button";
import styled from "styled-components";

interface Option {
  defaultValue?: boolean;
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  onChange?: (value: string) => void;
  placeholder?: string;
  localKey?: string;
  direction?: "top" | "bottom";
}

const CustomSelect = ({
  options,
  onChange,
  placeholder = "Select an option",
  localKey,
  direction = "bottom",
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(
    options.find((option) => option.defaultValue)?.value ?? ""
  );

  useEffect(() => {
    const defaultValue = options.find((option) => option.defaultValue)?.value;
    if (defaultValue && localKey) {
      localStorage.setItem(localKey, defaultValue);
    }
  }, []);

  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    if (onChange) onChange(value);
    if (localKey) localStorage.setItem(localKey, value); // Save selected option to localStorage
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div ref={selectRef} style={{ width: "100px", position: "relative" }}>
      {/* Selected Option */}
      <label>
        {placeholder}
        <Button onClick={toggleDropdown} style={{ width: "100%" }}>
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : placeholder}
        </Button>
      </label>

      {/* Dropdown Options */}
      {isOpen && (
        <StyledUlist style={{ [direction]: "-100%" }}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </StyledUlist>
      )}
    </div>
  );
};

export default CustomSelect;

const StyledUlist = styled.ul`
  width: 100%;
  border-radius: 2px;
  border: 2px solid var(--out-br, #853605);
  background: linear-gradient(
    230deg,
    #fa9305 19.82%,
    #d97405 66.9%,
    #b14e05 80.18%
  );
  position: absolute;
  & > li {
    position: relative;
    display: flex;
    padding: 4px 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 1px;
    border: 2px solid #b14e05;
    background: #ffd284;
  }

  & > li::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: 0;
    margin-bottom: 0;
    width: 100%;
    height: 2px;
    background: #edbb64;
  }
`;
