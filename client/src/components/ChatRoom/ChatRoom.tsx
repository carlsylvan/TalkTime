import { IChatGroup, IMessage } from "../../models/IChatGroup";

import { Messages } from "../Messages";

import { RoomUsers } from "../RoomUsers";
import "./ChatRoom.scss";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import { IUser } from "../../models/IUser";
import { TypingIndicator } from "../TypingIndicator";

interface IChatRoomProps {
  currentRoom: IChatGroup;
}
export const ChatRoom = (props: IChatRoomProps) => {
  const user = useContext<IUser>(UserContext);

  return (
    <div className="chat_room">
      <Messages
        messageList={props.currentRoom.messages}
        groupId={props.currentRoom.id}
        roomName={props.currentRoom.name}
      />
      <RoomUsers usersInRoom={props.currentRoom.users} />
      <TypingIndicator />
    </div>
  );
};
