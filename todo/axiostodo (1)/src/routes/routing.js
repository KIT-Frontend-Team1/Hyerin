import { createBrowserRouter } from "react-router-dom";
import MainPage from "pages/main";
import TodoPage from "pages/todo";
import Layout from "components/Layout";
import PrivateRoute from "./private";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      //다른 컴포넌트를 감싸는 컴포넌트를 HOC라고 한다.
      //Higher-Order Component
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/todo/:todoId",
            element: <TodoPage />,
          },
        ],
      },
    ],
  },
]);

/* 기본값 */
export default router;
