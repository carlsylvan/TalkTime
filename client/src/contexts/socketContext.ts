import { createContext } from "react";
import { Socket, io } from "socket.io-client";

const socket : Socket  = io("http://localhost:3001", {autoConnect: false});
export  const SocketContext = createContext<Socket>(socket);