import { useEffect, useState } from "react";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import { IChatGroup } from "../../models/IChatGroup";
import socket from "../../socket/socket";
import "./MainPage.scss";
import { ChatInfo } from "../ChatInfo/ChatInfo";
import { ChatGroupContext } from "../../contexts/chatContext";

export const MainPage = () => {
  const [rooms, setrooms] = useState<IChatGroup[]>([]);

  const [currentRoom, setCurrentRoom] = useState<IChatGroup>({
    id: "lobby-id",
    name: "Lobby",
    users: [],
    messages: [],
  });
  useEffect(() => {
    socket.on("joined_lobby", (room:IChatGroup)=> {
      setCurrentRoom(room);
    });
    socket.on("chat_groups_update", (rooms: IChatGroup []) => {
      setrooms(rooms);
    });
    socket.on("user_disconnected", (rooms: IChatGroup []) => {
      setrooms(rooms);
    });
    socket.on("group_created", (room:IChatGroup) => {
      setCurrentRoom(room);
    });
    socket.on("new_group_created", (rooms: IChatGroup []) => {
      setrooms(rooms);
    });
    socket.on("user_left", (room:IChatGroup) => {
      setCurrentRoom(room);
    });
    socket.on("new_user_in_room", (room:IChatGroup) => {
      setCurrentRoom(room);
    });
    socket.on("message_received", (room: IChatGroup) => {

      setCurrentRoom(room);
    })
  }, []);

  return (
    <div className="main_container">
        <ChatGroupContext.Provider value = {{ rooms, currentRoom }}>
          <ChatInfo />
          <ChatRoom />
        </ChatGroupContext.Provider>
    </div>
  );
};
