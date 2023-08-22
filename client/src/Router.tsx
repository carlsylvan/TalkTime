import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./components/LoginPage";
import { MainPage } from "./components/MainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <LoginPage></LoginPage>,
        index: true,
      },
      {
        path: ":room",
        element: <MainPage></MainPage>,
        // element: <Lobby></Lobby>,
      },
      // {
      //   path: ":room/:id",
      //   element: <ChatRoom></ChatRoom>,
      // },
    ],
  },
]);
