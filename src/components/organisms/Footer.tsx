import { HTMLAttributes } from "react";
import styled from "styled-components";

const Footer = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <StyledFooter {...props}>{children}</StyledFooter>;
};

export default Footer;

const StyledFooter = styled.footer``;
