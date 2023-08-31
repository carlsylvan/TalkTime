import { Messages } from "../Messages";
import { RoomUsers } from "../RoomUsers";
import "./ChatRoom.scss";

export const ChatRoom = () => {
  return (
    <div className="chat_room">
      <Messages />
      <RoomUsers />
    </div>
  );
};
