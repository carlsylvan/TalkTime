import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { activateTalkTimeSocket } from "./sockets/chatSockets";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());

activateTalkTimeSocket(io);

const port = 3001;
server.listen(port, () =>
  console.log(`Server is up and running on port ${port}`),
);
