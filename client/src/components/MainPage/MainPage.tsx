import { useEffect, useState } from "react";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import { IChatGroup } from "../../models/IChatGroup";
import socket from "../../socket/socket";
import "./MainPage.scss";
export const MainPage = () => {

  const [chatGroups, setChatGroups] = useState<IChatGroup[]>([]);

  useEffect(() => {
    socket.on("get_all_groups", (groups:IChatGroup[]) => {
      setChatGroups(groups);
    })
    socket.on("chat_groups_updated", (chatGroups: IChatGroup[]) => {
      setChatGroups(chatGroups);
    });
    // socket.on("joined_group", (group:IChatGroup) => {
    //   setChatGroups([...chatGroups,group]);
    // })
  }, []);
  
  return (
    <div className="main-container">
        <ChatRoom chatGroups = { chatGroups } />
    </div>
  );
};
