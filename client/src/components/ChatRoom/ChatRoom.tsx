import { IChatGroup } from "../../models/IChatGroup";
import { Messages } from "../Messages";
import { RoomUsers } from "../RoomUsers";
import "./ChatRoom.scss";

interface IChatRoomProps {
  groupChat: IChatGroup
}
export const ChatRoom = (props: IChatRoomProps) => {



  return (
    <div className="chat-room">
      <h1>{props.groupChat.name}</h1>
      <Messages messageList = { props.groupChat.messages } groupId = { props.groupChat.id }/>
      <RoomUsers  usersInRoom={ props.groupChat.users }/>
    </div>
  );
};
