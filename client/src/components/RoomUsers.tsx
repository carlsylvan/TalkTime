import { useContext } from "react";
import { IUser } from "../models/IUser";
import { IChatGroup } from "../models/IChatGroup";
import { UserContext } from "../contexts/userContext";
import socket from "../socket/socket";

interface IUsersInRoomProps {
  currentRoom: IChatGroup;
}

export const RoomUsers = (props: IUsersInRoomProps) => {
  const user = useContext<IUser>(UserContext);

  const handleClick = () => {
    socket.emit("join_group", "lobby-id");
  };
  return (
    <div className="chat_room_users">
      <div className="user_info">
        <p>User info</p>
        <span>Nickname:{user.username}</span>
        <span>Room: {props.currentRoom.name}</span>
        
        {props.currentRoom.id !=="lobby-id" ?
          <button onClick={handleClick}>Till lobby</button> :
        <></>}

      </div>
      <div className="room_users">
        <p>Users in {props.currentRoom.name}</p>
        <ul>
          {props.currentRoom.users.map((e, i) => <li key={i}>{e.username}</li>)}
        </ul>
      </div>
    </div>
  );
};
