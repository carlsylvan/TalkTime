import { Outlet } from "react-router-dom";
import "./App.scss";
import { useEffect, useState } from "react";
import socket from "./socket/socket";
import { IUser } from "./models/IUser";
import { UserContext } from "./contexts/userContext";


function App() {
  const [user, setUser] = useState<IUser>({ id: "", username: "" });
  useEffect(() => {
    socket.on("new_user_in_lobby", (user: IUser) => {
      console.log(user);
    });
    socket.on("joined", (user) => {
      setUser(user);
    })
  }, [socket]);
  return (
    <>
      <h1>TalkTime Chat</h1>
      <UserContext.Provider value={user}>
        <Outlet></Outlet>
      </UserContext.Provider>
    </>


  )
}

export default App;
