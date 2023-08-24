import { useState, useEffect } from "react";
import { IChatGroup, IMessage } from "../../models/IChatGroup";
import { IUser } from "../../models/IUser";
import socket from "../../socket/socket";
import { MessageInput } from "../MessageInput"
import { Messages } from "../Messages"
import { useParams } from "react-router-dom";
import { RoomUsers } from "../RoomUsers";
import "./ChatRoom.scss";
export const ChatRoom = () => {
  const [usersInRoom, setUsersInRoom] = useState<IUser[]>([]);
  const [groupChat, setGroupChat] = useState<IChatGroup>({
    id: "lobby-id",
    name: "Lobby",
    users: usersInRoom,
    messages: [],
  });
  const { id } = useParams();
  useEffect(() => {
    socket.on("chat_groups_updated", (chatGroups: IChatGroup[]) => {
      console.log(chatGroups);

      const chatGroup = chatGroups.find((group) => group.id === id);
      if (chatGroup) {
        setUsersInRoom(chatGroup.users);
        setGroupChat(chatGroup);
      }
    });
    socket.on("message_received", (data:IMessage) => {
      const temp = {...groupChat};
      temp.messages.push(data);
      setGroupChat(temp);
    })
  }, []);
  
  const sendMessage = (msg:string) => {
    
    
    socket.emit("send_message", {
      groupId: groupChat.id,
      content: msg
    });
  }
    return (
        <div className="chat-room">
            <div className="chat-room-messages">
              <Messages messageList = { groupChat.messages }/>
              <MessageInput sendMessage = { sendMessage }/>
            </div>
            <div className="chat-room-users">
              <RoomUsers usersInRoom = { usersInRoom }/>
            </div>

        </div>
    )
}
