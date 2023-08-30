import { IChatGroup } from "../../models/IChatGroup";

import { Messages } from "../Messages";

import { RoomUsers } from "../RoomUsers";
import "./ChatRoom.scss";

interface IChatRoomProps {
  currentRoom: IChatGroup;
}
export const ChatRoom = (props: IChatRoomProps) => {
  return (
    <div className="chat_room">
      <Messages
        messageList={props.currentRoom.messages}
        groupId={props.currentRoom.id}
        roomName={props.currentRoom.name}
      />
      <RoomUsers currentRoom={props.currentRoom} />
    </div>
  );
};
