import { ChangeEvent, useState } from "react";

import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";

export const StartPage = () => {
  const [username, setUsername] = useState<string>("");

  const navigate = useNavigate();

  const initChat = () => {
    if (username === "") return;
    socket.connect();
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
