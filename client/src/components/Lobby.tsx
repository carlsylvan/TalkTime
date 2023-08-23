import { ChangeEvent, useEffect, useState } from "react";
import { IUser } from "../models/IUser";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";
import { IChatGroup } from "../models/IChatGroup";

export const Lobby = () => {
  // const [newUser, setNewUser] = useState<IUser>(() => {
  //   const savedUser = sessionStorage.getItem("newUser");
  //   return savedUser ? JSON.parse(savedUser) : { id: "", username: "" };
  // });

  // const [usersInLobby, setUsersInLobby] = useState<IUser[]>(() => {
  //   const savedUsersInLobbyList = sessionStorage.getItem("lobbyList");
  //   return savedUsersInLobbyList ? JSON.parse(savedUsersInLobbyList) : [];
  // });

  // const [groupChatName, setGroupChatName] = useState<string>("");

  // const navigate = useNavigate();

  // useEffect(() => {
  //   socket.on("joined", (user: IUser) => {
  //     console.log(user);
  //     setNewUser(user);
  //     sessionStorage.setItem("newUser", JSON.stringify(user));
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.on("users_in_lobby_updated", (usersInLobby) => {
  //     console.log(usersInLobby);
  //     setUsersInLobby(usersInLobby);
  //     sessionStorage.setItem("lobbyList", JSON.stringify(usersInLobby));
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.on("chat_groups_updated", (chatGroups: IChatGroup[]) => {
  //     console.log(chatGroups);
  //   });
  // }, []);

  // // const showUsersInLobbyList = usersInLobby.map((user: IUser) => {
  // //   return (
  // //     <RoomUsers key={user.id} lobbyUserList={user}></RoomUsers>
  // //   );
  // // });

  // const handleCreateGroupChatButton = () => {
  //   if (groupChatName !== "") {
  //     socket.emit("create_group", groupChatName);
  //     socket.on("group_created", (group: IChatGroup) => {
  //       navigate(`/chat-room/${group.id}`);
  //     });
  //   }
  // };

  // const handleCreateGroupChatInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   setGroupChatName(e.target.value);
  // };

  return 
    // <>
    //   <h2>Välkommen {newUser.username}!</h2>
    //   <div>
    //     <h3>Användare i lobbyn</h3>
    //     {/* {showUsersInLobbyList} */}
    //   </div>
    //   <div>
    
    //     <h3>Skapa en gruppchatt</h3>
    //     <input
    //       value={groupChatName}
    //       onChange={handleCreateGroupChatInput}
    //       type="text"
    //     />
    //     <button onClick={handleCreateGroupChatButton}>Skapa</button>
    //   </div>
    // </>
  
};
