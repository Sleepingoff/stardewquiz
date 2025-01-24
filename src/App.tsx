import { RouterProvider } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Router from "./configs/router.config";

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
