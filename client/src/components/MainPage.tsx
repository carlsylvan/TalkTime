import { useEffect, useState } from "react";
import { IUser } from "../models/IUser";
import { ActiveRooms } from "./ActiveRooms";
import { ChatRoom } from "./ChatRoom";
import { IChatGroup } from "../models/IChatGroup";
import socket from "../socket/socket";
import { CreateRoom } from "./CreateRoom";

export const MainPage = () => {
  const [newUser, setNewUser] = useState<IUser>({
    id: "",
    username: "",
  });
  const [chatGroups, setChatGroups] = useState<IChatGroup[]>([]);
  useEffect(() => {
    socket.on("chat_groups_updated", (chatGroups: IChatGroup[]) => {
      setChatGroups(chatGroups);
    });
  }, []);
  return (
    <>
      <h2>Välkommen {newUser.username}!</h2>
      <ActiveRooms chatGroups={chatGroups} />
      <ChatRoom />
      <CreateRoom></CreateRoom>

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
  );
  // <h2>Välkommen till {groupChat.name}! Nu kan du börja chatta</h2>;
};
