import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("chat_groups_updated", (chatGroups: IChatGroup[]) => {
      console.log(chatGroups);

      const chatGroup = chatGroups.find((group) => group.id === id);
      if (chatGroup) {
        console.log(chatGroup.name);

        setGroupChat(chatGroup);
      } else {
        navigate("/lobby");
      }
    });
  }, [id, navigate]);

  const handleLeaveGroupChatButton = () => {
    socket.emit("leave_group", id);
    navigate("/lobby");
  };

  return (
    <>
      <h2>Välkommen till {groupChat.name}! Nu kan du börja chatta</h2>
      <button onClick={handleLeaveGroupChatButton}>Lämna gruppchatt</button>
    </>
  );
};
