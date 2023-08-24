import { useState, useEffect } from "react";
import { IChatGroup, IMessage } from "../../models/IChatGroup";
import { IUser } from "../../models/IUser";
import socket from "../../socket/socket";
import { MessageInput } from "../MessageInput";
import { Messages } from "../Messages";
import { useParams } from "react-router-dom";
import { RoomUsers } from "../RoomUsers";
import "./ChatRoom.scss";

export const ChatRoom = () => {

  const [groupChat, setGroupChat] = useState<IChatGroup>({
    id: "",
    name: "",
    users: [],
    messages: [],
  });
  // const { id, room } = useParams();
  
  useEffect(() => {
    socket.on("joined_lobby", (chatGroup)=>{
      setGroupChat(chatGroup);
    })
    socket.on("new_group_created", (chatGroup)=>{
      setGroupChat(chatGroup);
    })
    socket.on("chat_group_updated", (chatGroup)=>{
      setGroupChat(chatGroup);
    })
  }, []);

  
  return (
    <div className="chat-room">
      <h1>{groupChat.name}</h1>
      <div className="chat-room-messages">
        <Messages groupChat = { groupChat }  />
        <MessageInput groupChat = { groupChat }  />
      </div>
      <div className="chat-room-users">
        <RoomUsers usersInRoom={groupChat.users} />
      </div>
    </div>
  );
};
