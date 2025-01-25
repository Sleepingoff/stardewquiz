import { HTMLAttributes } from "react";
import styled from "styled-components";
import CustomSelect from "../molecules/Select";
import { useLanguage } from "../../context/LanguageContext";

const Footer = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { language, setLanguage } = useLanguage();

  return (
    <StyledFooter {...props}>
      <CustomSelect
        direction="top"
        options={[
          { value: "ko", label: "한국어", defaultValue: language === "ko" },
          { value: "en", label: "English", defaultValue: language === "en" },
        ]}
        onChange={(value) => setLanguage(value as "ko" | "en")}
        placeholder="Language"
      />
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer``;
