import { ChangeEvent, useState, useContext } from "react";

// import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../contexts/socketContext";
interface IStartPageProps {
  connectToSocket(): void
}
export const StartPage = (props:IStartPageProps) => {
  const [username, setUsername] = useState<string>("");

  const navigate = useNavigate();
  const socket  = useContext(SocketContext)
  const initChat = () => {
    if (username === "") return;
    props.connectToSocket();
    console.log(socket.connected);
    
    socket.emit("join", username);
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
