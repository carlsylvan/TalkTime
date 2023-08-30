import { CreateRoom } from "../CreateRoom";
import "./ActiveRooms.scss";
import { IChatGroup } from "../../models/IChatGroup";
import socket from "../../socket/socket";
import { useEffect, useState } from "react";
import { IUser } from "../../models/IUser";


interface IActiveRoomsProps {
    rooms: IChatGroup [],
    groupId: string
}
interface IActiveUser {
  user: IUser,
  room: string
}
export const ActiveRooms = (props:IActiveRoomsProps) => {
  const [allUsers, setAllUsers] = useState<IActiveUser[]>([]);
  const handleClick = (groupId: string) => {
    if(groupId === props.groupId) return;
    socket.emit("join_group", groupId);
  };
  
  useEffect(()=>{
    const activeUserList: IActiveUser [] = [];
    props.rooms.map((r)=> {
      r.users.map((u)=>{
        const userObject:IActiveUser = {user: u, room: r.name};
        activeUserList.push(userObject);
      });
    });
    setAllUsers(activeUserList);
  },[props.rooms])


  return (
    <div className="active_rooms">
      <div className="active_rooms_list">
        <p>Chat rooms</p>
        <CreateRoom></CreateRoom>
        <ul>
          {props.rooms.map((e, i) => (
            <li key={i}>
              {e.id === props.groupId ? <div className="empty_div"></div> :
                <button className="join_button" onClick={() => {
                  handleClick(e.id);
                }}>gå in</button>
              }
              <span>{e.name} ({e.users.length})</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="active_rooms_users">
        <p>Online</p>
        <ul>
          {allUsers.map((u)=> <li key={u.user.id}>{u.user.username} ({u.room})</li>)}
        </ul>
      </div>
    </div>
  );
};
