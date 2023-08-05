import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "../pageComponents/Layout";
import Login from "../pageComponents/Login";
import SignIn from "../pageComponents/SignIn";

export const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Layout /> },
      { path: "/login", element: <Login /> },
      { path: "/signin", element: <SignIn /> },
    ],
  },
]);
