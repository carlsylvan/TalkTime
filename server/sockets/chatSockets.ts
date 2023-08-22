import { Server, Socket } from "socket.io";
import { IUser } from "../models/IUser";
import { IChatGroup, IMessage } from "../models/IChatGroup";
import { v4 as uuidv4 } from "uuid";

const users: IUser[] = [];

const chatGroups: IChatGroup[] = [];

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
      socket.emit("joined_group", group);
    });

    socket.on("send_message", (data: { groupId: string; content: string }) => {
      const user = users.find((u) => u.id === socket.id);
      if (!user) return;

      const group = chatGroups.find((g) => g.id === data.groupId);
      if (!group) return;

      const message: IMessage = {
        user,
        content: data.content,
        timestamp: new Date(),
      };
      group.messages.push(message);

      io.to(data.groupId).emit("message_received", message);
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
      if (userInGroupIndex) {
        group.users.splice(userInGroupIndex, 1);
      }
      socket.leave(groupId);

      usersInLobby.push(user);

      socket.emit("left_group", groupId);
      io.emit("users_in_lobby_updated", usersInLobby);
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
