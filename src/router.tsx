import {
  createBrowserRouter,
  createMemoryRouter,
  Navigate,
} from "react-router-dom";
import MyPage from "./pages/MyPage";
import Detail from "./pages/Detail";
import Favor from "./pages/Favor";
import MainPage from "./pages/MainPage";
import Suggest from "./pages/Suggest";
import Search from "./pages/Search";
import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { loader as tokenLoader } from "./utils/loader";
import { outLoader as goHome } from "./utils/loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "favor",
        element: <Favor />,
      },
      {
        path: "suggest",
        element: <Suggest />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "detail/:id",
        element: <Detail />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: goHome,
  },
  {
    path: "/signUp",
    element: <SignUp />,
    loader: goHome,
  },
]);

export default router;
