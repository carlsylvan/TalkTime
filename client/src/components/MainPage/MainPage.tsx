import { useEffect, useState } from "react";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import { IChatGroup } from "../../models/IChatGroup";
import socket from "../../socket/socket";
import "./MainPage.scss";
import { ActiveRooms } from "../ActiveRooms/ActiveRooms";

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
    socket.on("user_left", (room) => {
      setCurrentRoom(room);
    });
    socket.on("new_user_in_room", (room) => {
      setCurrentRoom(room);
    });
    socket.on("message_received", (room: IChatGroup) => {

      setCurrentRoom(room);
    })
  }, []);

  return (
    <div className="main_container">
        <ActiveRooms rooms = { rooms } groupId = { currentRoom.id } />
        <ChatRoom currentRoom = { currentRoom } />
    </div>
  );
};
