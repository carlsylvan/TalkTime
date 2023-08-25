// import { useContext } from "react";
// import { ChatGroupContext, IContext } from "../../contexts/chatGroupContext";
// import { IChatGroup } from "../../models/IChatGroup";
import { CreateRoom } from "../CreateRoom";
import "./ActiveRooms.scss";
import { IChatGroup } from "../../models/IChatGroup";
import socket from "../../socket/socket";

interface IActiveRoomsProps {
    chatGroups: IChatGroup []
}
export const ActiveRooms = (props:IActiveRoomsProps) => {
  const handleClick = (groupId: string) => {
    socket.emit("join_group", groupId);
  };
  return (
    <div className="rooms">
      <CreateRoom></CreateRoom>
      <div className="active-rooms">
        <p>Aktiva Rum</p>
        <ul>
          {props.chatGroups.map((e, i) => (
            <li
              key={i}
              onClick={() => {
                handleClick(e.id);
              }}
            >
              {e.name} ({e.users.length} personer)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
