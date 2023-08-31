import { CreateRoom } from "../CreateRoom";
import "./ActiveRooms.scss";
import socket from "../../socket/socket";
import { useContext, useEffect, useState } from "react";
import { IUser } from "../../models/IUser";
import { ChatGroupContext, IChatContext } from "../../contexts/chatContext";


interface IActiveUser {
  user: IUser,
  room: string
}
export const ActiveRooms = () => {
  const [allUsers, setAllUsers] = useState<IActiveUser[]>([]);

  const chat = useContext<IChatContext>(ChatGroupContext);

  const handleClick = (groupId: string) => {
    if(groupId === chat.currentRoom.id) return;
    socket.emit("join_group", groupId);
  };
  
  useEffect(()=>{
    const activeUserList: IActiveUser [] = [];
    chat.rooms.map((r)=> {
      r.users.map((u)=>{
        const userObject:IActiveUser = {user: u, room: r.name};
        activeUserList.push(userObject);
      });
    });
    setAllUsers(activeUserList);
  },[chat.rooms])


  return (
    <div className="active_rooms">
      <div className="active_rooms_list">
        <p>Chat rooms</p>
        <CreateRoom></CreateRoom>
        <ul>
          {chat.rooms.map((e, i) => (
            <li key={i}>
              {e.id === chat.currentRoom.id ? <div className="empty_div"></div> :
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
