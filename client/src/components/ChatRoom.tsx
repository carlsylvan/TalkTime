import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket";
import { IChatGroup } from "../models/IChatGroup";

export const ChatRoom = () => {
  const [groupChat, setGroupChat] = useState<IChatGroup>({
    id: "",
    name: "",
    users: [],
    messages: [],
  });
  const { id } = useParams();

  useEffect(() => {
    socket.on("chat_groups_updated", (chatGroups: IChatGroup[]) => {
      const chatGroup = chatGroups.find((group) => group.id === id);
      if (chatGroup) {
        console.log(chatGroup.name);

        setGroupChat(chatGroup);
      }
    });
  }, []);

  return <h2>Välkommen till {groupChat.name}! Nu kan du börja chatta</h2>;
};
