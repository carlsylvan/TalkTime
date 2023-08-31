import { CreateRoom } from "../CreateRoom";
import "./ChatInfo.scss";
import socket from "../../socket/socket";
import { useContext, useEffect, useState } from "react";
import { IUser } from "../../models/IUser";
import { ChatGroupContext, IChatContext } from "../../contexts/chatContext";


interface IActiveUser {
  user: IUser,
  room: string
}
export const ChatInfo = () => {
  const [allUsers, setAllUsers] = useState<IActiveUser[]>([]);
  const [showRooms, setShowRooms] = useState<boolean>(false);
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

  const viewRooms = () => {
    setShowRooms(true);
  }
  const viewUsers = () => {
    setShowRooms(false);
  }
  return (
    <div className="chatinfo">
      <CreateRoom></CreateRoom>
      <div className="chatinfo_main">
        <button onClick={viewRooms} className={showRooms ? "pushed" : ""}>Rooms</button>
        <button onClick={viewUsers} className={showRooms ? "" : "pushed"}>Users Online</button>
      {showRooms ? 
        <div className="chatinfo_main_list">
          <ul>
            {chat.rooms.map((e, i) => (
              <li key={i}>
                <span>{e.name} ({e.users.length})</span>
                {e.id === chat.currentRoom.id ? <div className="empty_div"></div> :
                  <button className="join_button" onClick={() => {
                    handleClick(e.id);
                  }}>join</button>
                }
              </li>
            ))}
          </ul>
        </div> :
        <div className="chatinfo_main_users">
          <ul>
            {allUsers.map((u)=> <li key={u.user.id}><span>{u.user.username} ({u.room})</span></li>)}
          </ul>
        </div>
      }
      </div>
    </div>
  );
};
