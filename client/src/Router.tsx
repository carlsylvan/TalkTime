import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { StartPage } from "./components/StartPage";
import { Lobby } from "./components/Lobby";
import { ChatRoom } from "./components/ChatRoom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <StartPage></StartPage>,
        index: true,
      },
      {
        path: "lobby",
        element: <Lobby></Lobby>,
      },
      {
        path: "chat-room/:id",
        element: <ChatRoom></ChatRoom>,
      },
    ],
  },
]);
