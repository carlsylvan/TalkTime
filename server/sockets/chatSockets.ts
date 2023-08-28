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

      const group = chatGroups.find((g) => g.id === LOBBY_ID);
      if (!group) return;
      group.users.push(user);
      socket.emit("joined", user);

      io.emit("new_user_in_lobby", user);
      io.emit("joined_lobby", group);
      io.emit("users_in_group_updated", group);
      io.emit("users_list_udpated", users);
    });

    socket.on("join_group", (groupId: string) => {
      const user = users.find((u) => u.id === socket.id);
      if (!user) return;
      // const userGroup = getUserGroup(socket);
      // console.log(userGroup);

      const group = chatGroups.find((g) => g.id === groupId);
      // console.log(group);

      if (!group) return;

      const userInGroupIndex = group.users.findIndex((u) => u.id === user.id);
      if (userInGroupIndex !== -1) {
        group.users.splice(userInGroupIndex, 1);
      }

      group.users.push(user);
      socket.join(groupId);
      io.emit("chat_groups_updated", chatGroups);
      io.emit("joined_group", group);
    });

    socket.on(
      "send_message",
      (data: { groupId: string; content: string; isGif?: boolean }) => {
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
          isGif: data.isGif || false,
        };

        group.messages.push(message);

        io.emit("chat_group_updated", group);
        io.to(data.groupId).emit("message_received", message);
      },
    );

    socket.on("create_group", (groupName: string) => {
      const user = users.find((u) => u.id === socket.id);
      if (!user) return;
      const userGroup = getUserGroup(socket);
      console.log(userGroup);
      const chatGroup = chatGroups.find((g) => g.id === userGroup?.id);

      if (!chatGroup) return;

      const userInChatGroupIndex = chatGroup.users.findIndex(
        (u) => u.id === user.id,
      );
      if (userInChatGroupIndex !== -1) {
        chatGroup.users.splice(userInChatGroupIndex, 1);
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
      io.emit("new_group_created", group);
      io.emit("users_in_lobby_updated", usersInLobby);
      io.emit("chat_groups_updated", chatGroups);
      io.emit("users_in_group_updated", chatGroup);
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
      io.emit("users_in_group_updated", group);
      console.log(chatGroups);
    });

    socket.on("disconnect", () => {
      const user = users.find((u) => u.id === socket.id);
      if (!user) return;

      const chatGroup = chatGroups.find((group) => {
        const user = group.users.find((user) => user.id === socket.id);

        if (user) return group.id;
      });

      if (!chatGroup) return;

      const userInGroupIndex = chatGroup.users.findIndex(
        (u) => u.id === user.id,
      );
      if (userInGroupIndex !== -1) {
        usersInLobby.splice(userInGroupIndex, 1);
      }

      if (chatGroup.users.length === 0 && chatGroup.id !== LOBBY_ID) {
        const groupIndex = chatGroups.findIndex((g) => g.id === chatGroup.id);
        if (groupIndex !== -1) {
          chatGroups.splice(groupIndex, 1);
        }
      }

      io.emit("users_in_group_updated", chatGroup);
      io.emit("users_list_udpated", users);
      io.emit("chat_groups_updated", chatGroups);
    });
  });

  const generateUniqueId = (): string => {
    return uuidv4();
  };
  const getUserGroup = (socket: Socket) => {
    const chatGroup = chatGroups.find((group) => {
      const user = group.users.find((user) => user.id === socket.id);

      if (user) return group.id;
    });
    return chatGroup;
  };
};
