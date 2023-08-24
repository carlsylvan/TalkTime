import { useEffect, useState } from "react";
import { ActiveRooms } from "../ActiveRooms/ActiveRooms";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import { IChatGroup } from "../../models/IChatGroup";
import socket from "../../socket/socket";
import "./MainPage.scss";
export const MainPage = () => {

  const [chatGroups, setChatGroups] = useState<IChatGroup[]>([]);
  useEffect(() => {
    socket.on("chat_groups_updated", (chatGroups: IChatGroup[]) => {
      setChatGroups(chatGroups);
    });
    socket.on("joined_group", (group:IChatGroup) => {
      setChatGroups([...chatGroups,group]);
    })
  }, []);
  
  return (
    <div className="main-container">
        <ActiveRooms chatGroups = { chatGroups }/>
        <ChatRoom />
    </div>
  );
};
