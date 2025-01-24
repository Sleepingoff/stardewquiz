import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import QuizPage from "../pages/Quiz";
import ResultPage from "../pages/Result";
import ProfilePage from "../pages/Profile";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/profile",
    element: <ProfilePage />,
  },

  {
    path: "/quiz/:categoryId",
    element: <ResultPage />,
  },
  {
    path: "/quiz/:categoryId/:id",
    element: <QuizPage />,
  },
];

const Router = createBrowserRouter(routes);

export default Router;
