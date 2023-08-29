import { CreateRoom } from "../CreateRoom";
import "./ActiveRooms.scss";
import { IChatGroup } from "../../models/IChatGroup";
import socket from "../../socket/socket";

interface IActiveRoomsProps {
    rooms: IChatGroup [],
    groupId: string
}
export const ActiveRooms = (props:IActiveRoomsProps) => {
  const handleClick = (groupId: string) => {
    if(groupId === props.groupId) return;
    socket.emit("join_group", groupId);
  };
  console.log(props.rooms);
  
  return (
    <div className="active_rooms">
      <CreateRoom></CreateRoom>
      <div className="active_rooms_list">
        <p>Aktiva Rum</p>
        <ul>
          {props.rooms.map((e, i) => (
            <li
              key={i}
              onClick={() => {
                handleClick(e.id);
              }}
            >
              {e.name}<span> ({e.users.length} pers.)</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
