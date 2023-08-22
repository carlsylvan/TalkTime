import { ChangeEvent, useState, useContext } from "react";

// import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../contexts/socketContext";


export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();
  const socketManager  = useContext(SocketContext);

  const initChat = () => {
    if (username === "") return;
    socketManager.connect();
    socketManager.socket.emit("join", username);
  };

  const handleJoinTalkTimeButton = () => {
    initChat();
    if (username === "") return;
    setUsername("");
    navigate("lobby");
  };

  const handleJoinTalkTimeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  return (
    <div>
      <h3>Fyll i ditt användarnamn för att joina</h3>
      <input value={username} onChange={handleJoinTalkTimeInput} type="text" />
      <button onClick={handleJoinTalkTimeButton}>Joina</button>
    </div>
  );
};


