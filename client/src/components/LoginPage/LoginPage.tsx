import { useState, FormEvent } from "react";
import "./LoginPage.scss";
import socket from "../../socket/socket";
import { useNavigate } from "react-router-dom";


export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const initChat = () => {
    if (username === "") return;
    socket.connect();
    socket.emit("join", username);
  };

  const handleJoinTalkTimeButton = (e:FormEvent) => {
    e.preventDefault();
    initChat();
    if (username === "") return;
    setUsername("");
    navigate("/lobby/lobby-id");
  };

  return (
    <div className="login-page">
      <form onSubmit={handleJoinTalkTimeButton}>
        <h3>Wellcome to TalkTime chat! Please type your nickname to join!</h3>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Namn..." />
        <button onClick={handleJoinTalkTimeButton}>Log in</button>
      </form>
    </div>
  );
};


