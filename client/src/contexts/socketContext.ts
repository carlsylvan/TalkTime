import { createContext } from "react";
import { Socket, io } from "socket.io-client";
export interface ISocketManager {
    socket: Socket,
    connect: ()=>void
}
const manager : ISocketManager= {
    socket: io("http://localhost:3001"),
    connect: ()=>{}
}
export  const SocketContext = createContext<ISocketManager>(manager);

