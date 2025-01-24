import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import QuizPage from "../pages/Quiz";
import ResultPage from "../pages/Result";
import AuthPage from "../pages/Auth";
import ProfilePage from "../pages/Profile";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },

  {
    path: "/quiz/:categoryId",
    element: <ResultPage />,
    children: [
      {
        path: "/quiz/:categoryId/:id",
        element: <QuizPage />,
      },
    ],
  },
];

const Router = createBrowserRouter(routes);

export default Router;
