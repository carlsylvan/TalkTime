import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket";
import { IChatGroup, IMessage } from "../models/IChatGroup";
import { IUser } from "../models/IUser";
import { MessageInput } from "./MessageInput";
import { ActiveRooms } from "./ActiveRooms";
import { ChatRoom } from "./ChatRoom";

export const MainPage = () => {
  const [ newUser, setNewUser ] = useState<IUser>(
    {
      id: "",
      username: ""
    }
  );


  return (
    <>
      <h2>Välkommen {newUser.username}!</h2>
      <ActiveRooms />
      <ChatRoom />
      
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
