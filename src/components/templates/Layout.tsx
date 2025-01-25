import { HTMLAttributes } from "react";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import styled from "styled-components";

const Layout = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <>
      <Header />
      <StyledMain {...props}>{children}</StyledMain>
      <Footer />
    </>
  );
};

export default Layout;

const StyledMain = styled.main`
  height: 80vh;
  overflow: auto;
  overflow-x: hidden;
`;
