import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
// import socket from "./socket/socket";
import { IUser } from "./models/IUser";
import { SocketContext } from "./contexts/socketContext";
import { Socket, io } from "socket.io-client";


function App() {
  const [user, setUser] = useState<IUser>({ id: "", username: "" });
  const [socket, setSocket] = useState<Socket>(io("http://localhost:3001", {autoConnect: false}))
  useEffect(() => {
    socket.on("new_user_in_lobby", (user: IUser) => {
      console.log(user);
      setUser(user);
    });
  }, []);
  const connect = () => {
    socket.connect();
  }
  console.log(socket.connected);
  
  
  return (
    <>
      <SocketContext.Provider value = { {socket, connect} }>
        <Outlet></Outlet>
      </SocketContext.Provider>
    </>


  )
}

export default App;
