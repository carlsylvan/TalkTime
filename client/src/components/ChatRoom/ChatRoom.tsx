import { useState, useEffect } from "react";
import { IChatGroup, IMessage } from "../../models/IChatGroup";
import { IUser } from "../../models/IUser";
import socket from "../../socket/socket";
import { MessageInput } from "../MessageInput";
import { Messages } from "../Messages";
import { useParams } from "react-router-dom";
import { RoomUsers } from "../RoomUsers";
import "./ChatRoom.scss";
import { ActiveRooms } from "../ActiveRooms/ActiveRooms";

interface IChatRoomProps {
  chatGroups: IChatGroup []
}
export const ChatRoom = (props: IChatRoomProps) => {

  const [groupChat, setGroupChat] = useState<IChatGroup>({
    id: "",
    name: "",
    users: [],
    messages: [],
  });
  // const { id, room } = useParams();
  
  useEffect(() => {
      socket.on("joined", (data)=>{
        setGroupChat(data.lobby);
      })
      socket.on("joined_group", (group:IChatGroup) => {
      setGroupChat(group);
      socket.on("new_group_created", (group)=>{
        setGroupChat(group);
      })
    })
    // socket.on("joined_lobby", (chatGroup)=>{
    //   setGroupChat(chatGroup);
    // })
    // socket.on("new_group_created", (chatGroup)=>{
    //   setGroupChat(chatGroup);
    // })
    socket.on("chat_group_updated", (chatGroup)=>{
      setGroupChat(chatGroup);
    })
  }, []);

  
  return (
    <div className="chat-room">
      <h1>{groupChat.name}</h1>
      <ActiveRooms chatGroups={ props.chatGroups } groupId = { groupChat.id }/>
      <Messages messageList = { groupChat.messages } groupId = { groupChat.id }/>
      <RoomUsers  usersInRoom={ groupChat.users }/>
    </div>
  );
};
