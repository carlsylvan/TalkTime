import { useEffect, useState } from "react";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import { IChatGroup } from "../../models/IChatGroup";
import socket from "../../socket/socket";
import "./MainPage.scss";
import { ActiveRooms } from "../ActiveRooms/ActiveRooms";
export const MainPage = () => {
  const [chatGroups, setChatGroups] = useState<IChatGroup[]>([]);
  const [groupChat, setGroupChat] = useState<IChatGroup>({
    id: "",
    name: "",
    users: [],
    messages: [],
  });
  useEffect(() => {
    socket.on("joined_lobby", (group)=> {
      setGroupChat(group);
    });
    socket.on("chat_groups_update", (chatGroups) => {
      setChatGroups(chatGroups);
    });
    socket.on("user_disconnected", (data) => {
      setChatGroups(data.chatGroups);
      setGroupChat(data.chatGroup);
    });
  }, []);
  console.log(chatGroups);
  console.log(groupChat);
  
  return (
    <div className="main-container">
        <ActiveRooms chatGroups = { chatGroups } groupId = { groupChat.id } />
        <ChatRoom groupChat = { groupChat } />
    </div>
  );
};
