import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import QuizPage from "../pages/Quiz";
import ResultPage from "../pages/Result";
import ProfilePage from "../pages/Profile";
import NewQuizPage from "../pages/New";
import AdminPage from "../pages/Admin";
import AdminDetailsPage from "../pages/AdminDetails";

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
  {
    path: "/new",
    element: <NewQuizPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin/:quizId",
    element: <AdminDetailsPage />,
  },
];

const Router = createBrowserRouter(routes);

export default Router;
