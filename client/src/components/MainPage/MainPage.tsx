import { useEffect, useState } from "react";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import { IChatGroup } from "../../models/IChatGroup";
import socket from "../../socket/socket";
import "./MainPage.scss";
import { ActiveRooms } from "../ActiveRooms/ActiveRooms";

export const MainPage = () => {
  const [rooms, setrooms] = useState<IChatGroup[]>([]);

  const [groupChat, setGroupChat] = useState<IChatGroup>({
    id: "lobby-id",
    name: "Lobby",
    users: [],
    messages: [],
  });
  useEffect(() => {
    socket.on("joined_lobby", (group:IChatGroup)=> {
      setGroupChat(group);
    });
    socket.on("chat_groups_update", (rooms: IChatGroup []) => {
      setrooms(rooms);
    });
    socket.on("user_disconnected", (data: IChatGroup []) => {
      setrooms(data);
    });
    socket.on("group_created", (group:IChatGroup) => {
      setGroupChat(group);
    });
    socket.on("room_updated", (currentRoom) => {
      setGroupChat(currentRoom);
    });
    socket.on("new_group_created", (allGroups: IChatGroup []) => {
      setrooms(allGroups);
    });
    socket.on("user_left", (room) => {
      setGroupChat(room);
    });
    socket.on("new_user_in_room", (room) => {
      setGroupChat(room);
    });
  }, []);

  console.log(groupChat);
  
  
  return (
    <div className="main-container">
        <ActiveRooms rooms = { rooms } groupId = { groupChat.id } />
        <ChatRoom groupChat = { groupChat } />
    </div>
  );
};
