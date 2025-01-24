import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import QuizPage from "../pages/Quiz";
import ResultPage from "../pages/Result";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quiz/:categoryId/:id",
    element: <QuizPage />,
  },
  {
    path: "/result/:categoryId/",
    element: <ResultPage />,
  },
];

const Router = createBrowserRouter(routes);

export default Router;
