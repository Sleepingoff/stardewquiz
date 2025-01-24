import { HTMLAttributes } from "react";
import Layout from "./Layout";

const AuthTemp = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <Layout {...props}>{children}</Layout>;
};

export default AuthTemp;
