
import { IChatGroup, IMessage } from "../../models/IChatGroup";

import { Messages } from "../Messages";

import { RoomUsers } from "../RoomUsers";
import "./ChatRoom.scss";
import { ActiveRooms } from "../ActiveRooms/ActiveRooms";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import { IUser } from "../../models/IUser";

interface IChatRoomProps {
  groupChat: IChatGroup
}
export const ChatRoom = (props: IChatRoomProps) => {
const user = useContext<IUser>(UserContext);


  return (
    <div className="chat-room">
      <h1>{props.groupChat.name} user:{user.username}</h1>
      <Messages messageList = { props.groupChat.messages } groupId = { props.groupChat.id }/>
      <RoomUsers  usersInRoom={ props.groupChat.users }/>
    </div>
  );
};
