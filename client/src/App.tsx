import { Outlet, useNavigate } from "react-router-dom";
import "./App.scss";
import { useEffect, useState } from "react";
import socket from "./socket/socket";
import { IUser } from "./models/IUser";
import { UserContext } from "./contexts/userContext";


function App() {
  
  const [user, setUser] = useState<IUser>({ id: "", username: "" });
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("joined", (user) => {
      setUser(user);
    })
    if(!socket.connected) {
      navigate("/")
    }
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

