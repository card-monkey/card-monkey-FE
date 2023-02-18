import { createBrowserRouter } from "react-router-dom";
import MyPage from "./pages/MyPage";
import Detail from "./pages/Detail";
import Favor from "./pages/Favor";
import MainPage from "./pages/MainPage";
import Suggest from "./pages/Suggest";
import Search from "./pages/Search";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);

export default router;
