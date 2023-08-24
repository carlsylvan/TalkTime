import { useEffect, useState } from "react";
import { IUser } from "../../models/IUser";
import { ActiveRooms } from "../ActiveRooms/ActiveRooms";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import { IChatGroup } from "../../models/IChatGroup";
import socket from "../../socket/socket";
import "./MainPage.scss";
import { ChatGroupContext } from "../../contexts/chatGroupContext";
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
  const addGroup = (id: string, name: string) => {
    const newGroup = {
      id,
      name,
      users: [],
      messages: [],
    };
    setChatGroups([...chatGroups, newGroup]);
  };
  return (
    <div className="main-container">
      {/* <h2>Välkommen {newUser.username}!</h2> */}
      <ChatGroupContext.Provider value={{ chatGroups, addGroup }}>
        <ActiveRooms />
        <ChatRoom />
      </ChatGroupContext.Provider>

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
    </div>
  );
  // <h2>Välkommen till {groupChat.name}! Nu kan du börja chatta</h2>;
};
