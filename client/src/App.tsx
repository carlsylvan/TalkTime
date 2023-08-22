import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import socket from "./socket/socket";
import { IUser } from "./models/IUser";
import { SocketContext } from "./contexts/socketContext";
import { Socket, io } from "socket.io-client";
import { StartPage } from "./components/StartPage";

function App() {
  const [user, setUser] = useState<IUser>({ id: "", username: "" });
  const [ socket, setSocket] = useState<Socket>(io("http://localhost:3001", {autoConnect: false}))
  useEffect(() => {
    socket.on("new_user_in_lobby", (user: IUser) => {
      console.log(user);
      setUser(user);
    });
  }, []);
  const connectToSocket = () => {
    socket.connect();
    setSocket(socket);
  }
  return (
    <>
      <StartPage connectToSocket = { connectToSocket }/>
      <SocketContext.Provider value = {socket}>

        <Outlet></Outlet>

      </SocketContext.Provider>
    </>


  )
}

export default App;
