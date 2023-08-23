import { Server, Socket } from "socket.io";
import { IUser } from "../models/IUser";
import { IChatGroup, IMessage } from "../models/IChatGroup";
import { v4 as uuidv4 } from "uuid";

const LOBBY_ID = "lobby-id";

const users: IUser[] = [];

const chatGroups: IChatGroup[] = [
  {
    id: LOBBY_ID,
    name: "Lobby",
    users: [],
    messages: [],
  },
];

const usersInLobby: IUser[] = [];



export const activateTalkTimeSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("join", (username: string) => {
      
      const user: IUser = { id: socket.id, username };
      users.push(user);
      usersInLobby.push(user);
      socket.emit("joined", user);
      
      io.emit("new_user_in_lobby", user);
      io.emit("users_in_lobby_updated", usersInLobby);
      console.log("user connected");
      console.log(socket);
      
    });
    
    socket.on("join_group", (groupId: string) => {
      
      
      const user = users.find((u) => u.id === socket.id);
      if (!user) return;
      
      const lobbyIndex = usersInLobby.findIndex((u) => u.id === user.id);
      if (lobbyIndex !== -1) {
        usersInLobby.splice(lobbyIndex, 1);
      }
      
      const group = chatGroups.find((g) => g.id === groupId);
      if (!group) return;
      
      group.users.push(user);
      socket.join(groupId);
      io.emit("chat_groups_updated", chatGroups);
      console.log("connected to: ", groupId);
      socket.emit("joined_group", group);
      console.log(io.sockets.adapter.rooms);
      console.log(chatGroups[0].users);
      
      console.log(Array.from(io.sockets.adapter.rooms.keys()));
 
      
    });

    socket.on("send_message", (data: { groupId: string; content: string }) => {
      console.log(data.groupId);
      console.log(io.sockets.adapter.rooms);
      const user = users.find((u) => u.id === socket.id);
      if (!user) return;

      let group: IChatGroup | undefined = {
        id: "",
        name: "",
        users: [],
        messages: [],
      };

      if (data.groupId === LOBBY_ID) {
        group = chatGroups[0];
      } else {
        group = chatGroups.find((g) => g.id === data.groupId);
      }

      if (!group) return;

      const message: IMessage = {
        user,
        content: data.content,
        timestamp: new Date().getHours() + ":" + new Date().getMinutes(),
      };
      group.messages.push(message);

      io.to(data.groupId).emit("message_received", message);
      console.log(message);
      
    });

    socket.on("create_group", (groupName: string) => {
      const user = users.find((u) => u.id === socket.id);
      if (!user) return;

      const lobbyIndex = usersInLobby.findIndex((u) => u.id === user.id);
      if (lobbyIndex !== -1) {
        usersInLobby.splice(lobbyIndex, 1);
      }

      const id = generateUniqueId();
      const group: IChatGroup = {
        id,
        name: groupName,
        users: [user],
        messages: [],
      };
      chatGroups.push(group);

      socket.join(id);

      socket.emit("group_created", group);
      socket.emit("joined_group", group);

      io.emit("users_in_lobby_updated", usersInLobby);
      io.emit("chat_groups_updated", chatGroups);
    });

    socket.on("leave_group", (groupId: string) => {
      const user = users.find((u) => u.id === socket.id);
      if (!user) return;

      const group = chatGroups.find((g) => g.id === groupId);
      if (!group) return;

      const userInGroupIndex = group.users.findIndex((u) => u.id === socket.id);
      if (userInGroupIndex !== -1) {
        group.users.splice(userInGroupIndex, 1);
      }

      if (group.users.length === 0 && groupId !== LOBBY_ID) {
        const groupIndex = chatGroups.findIndex((g) => g.id === groupId);
        if (groupIndex !== -1) {
          chatGroups.splice(groupIndex, 1);
        }
      }

      console.log("Joining lobby:", LOBBY_ID);
      socket.join(LOBBY_ID);
      console.log("User added to lobby:", user);
      usersInLobby.push(user);

      socket.leave(groupId);

      const lobbyGroup = chatGroups.find((g) => g.id === LOBBY_ID);
      if (lobbyGroup) {
        lobbyGroup.users.push(user);
      }

      socket.emit("left_group", groupId);
      io.emit("users_in_lobby_updated", usersInLobby);
      io.emit("chat_groups_updated", chatGroups);
      console.log(chatGroups);
    });

    socket.on("disconnect", () => {
      const user = users.find((u) => u.id === socket.id);
      if (!user) return;

      const lobbyIndex = usersInLobby.findIndex((u) => u.id === user.id);
      if (lobbyIndex !== -1) {
        usersInLobby.splice(lobbyIndex, 1);
      }

      io.emit("users_in_lobby_updated", usersInLobby);
    });
  });

  const generateUniqueId = (): string => {
    return uuidv4();
  };
};