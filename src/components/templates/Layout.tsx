import { HTMLAttributes } from "react";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";

const Layout = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <>
      <Header />
      <main {...props}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
