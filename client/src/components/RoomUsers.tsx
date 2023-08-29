import { useState } from "react";
import { IUser } from "../models/IUser";

interface IUsersInRoomProps {
  usersInRoom: IUser[];
}

export const RoomUsers = (props: IUsersInRoomProps) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const typing: string = "...";
  const setTyping = () => {
    
  }
  return (
    <div className="chat_room_users">
      <p>I rummet</p>
      <ul>
        {props.usersInRoom.map((e, i) => <li key={i}>{e.username}{isTyping ? <span>...</span> : ""}</li>)}
        
      </ul>
    </div>
  );
};
