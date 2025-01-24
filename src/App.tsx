import { RouterProvider } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Router from "./configs/router.config";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <GlobalStyle />
      <RouterProvider router={Router} />
    </LanguageProvider>
  );
}

export default App;
