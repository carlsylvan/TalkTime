import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket";
import { IChatGroup } from "../models/IChatGroup";
import { IUser } from "../models/IUser";
import { MessageInput } from "./MessageInput";

export const ChatRoom = () => {
  const [ newUser, setNewUser ] = useState<IUser>(
    {
      id: "",
      username: ""
    }
  );
  const [usersInRoom, setUsersInRoom] = useState<IUser[]>([]);
  const [groupChat, setGroupChat] = useState<IChatGroup>({
    id: "",
    name: "",
    users: usersInRoom,
    messages: [],
  });
  const { id, room } = useParams();

  useEffect(() => {
    socket.on("chat_groups_updated", (chatGroups: IChatGroup[]) => {
      const chatGroup = chatGroups.find((group) => group.id === id);
      if (chatGroup) {
        console.log(chatGroup.name);

        setGroupChat(chatGroup);
      }
    });
    socket.on("message_received", (data) => {
      const temp = {...groupChat};
      temp.messages.push(data);
      setGroupChat(temp);
    })
  }, []);
  const sendMessage = (msg:string) => {
    socket.emit("send_message", {
      groupId: groupChat.id,
      content: msg
    })
  }
  console.log(groupChat)
  console.log(socket.connected);
  
  return (
    <>
      <h2>Välkommen {newUser.username}!</h2>
      <MessageInput sendMessage = { sendMessage }/>
      {/* <div>
        <h3>Användare i lobbyn</h3>
        {showUsersInLobbyList}
      </div>
      <div>
    
        <h3>Skapa en gruppchatt</h3>
        <input
          value={groupChatName}
          onChange={handleCreateGroupChatInput}
          type="text"
        />
        <button onClick={handleCreateGroupChatButton}>Skapa</button> */}
      {/* </div> */}
    </>
  )
  // <h2>Välkommen till {groupChat.name}! Nu kan du börja chatta</h2>;
};
