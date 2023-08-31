import { useContext } from "react";
import { IUser } from "../models/IUser";
import { UserContext } from "../contexts/userContext";
import socket from "../socket/socket";
import { IChatContext, ChatGroupContext } from "../contexts/chatContext";

export const RoomUsers = () => {
  const user = useContext<IUser>(UserContext);
  const chat = useContext<IChatContext>(ChatGroupContext);
  const handleClick = () => {
    socket.emit("join_group", "lobby-id");
  };
  return (
    <div className="chat_room_users">
      <div className="user_info">
        <p>User info</p>
        <span>Nickname:{user.username}</span>
        <span>Room: {chat.currentRoom.name}</span>
        
        {chat.currentRoom.id !=="lobby-id" ?
          <button onClick={handleClick}>Till lobby</button> :
        <></>}

      </div>
      <div className="room_users">
        <p>Users in {chat.currentRoom.name}</p>
        <ul>
          {chat.currentRoom.users.map((e, i) => <li key={i}>{e.username}</li>)}
        </ul>
      </div>
    </div>
  );
};
