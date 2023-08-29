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
      socket.join(group.id);
      socket.emit("joined", user);
      io.to(group.id).emit("joined_lobby", group);
      io.emit("chat_groups_update", chatGroups);
      // io.emit("new_user_in_lobby", user);
      // io.emit("users_in_group_updated", group);
      // io.emit("users_list_udpated", users);
    });

    socket.on("join_group", (groupId: string) => {
      const user = users.find((u) => u.id === socket.id);
      if (!user) return;
      const leavingGroup = getUserRoom(socket);
      if(!leavingGroup) return;
      const userIndex = leavingGroup.users.findIndex((u)=>u.id === user.id);
      if(userIndex !== -1) {
        leavingGroup.users.splice(userIndex,1);
      }
      if(leavingGroup.users.length===0 && leavingGroup.id !== LOBBY_ID){
        const roomIndex = chatGroups.findIndex((g) => g.id === leavingGroup.id);
        chatGroups.splice(roomIndex,1);
      }
      socket.leave(leavingGroup.id);
      const joinGroup = chatGroups.find((g) => g.id === groupId);

      if (!joinGroup) return;
      joinGroup.users.push(user);
      socket.join(groupId);
      io.emit("chat_groups_update", chatGroups);
      io.to(leavingGroup.id).emit("user_left", leavingGroup);
      io.to(joinGroup.id).emit("new_user_in_room", joinGroup);
      
      
    });

    socket.on("send_message", (data: { groupId: string; content: string }) => {
      const user = users.find((u) => u.id === socket.id);
      if (!user) return;
      
      // let group: IChatGroup | undefined = {
      //   id: "",
      //   name: "",
      //   users: [],
      //   messages: [],
      // };

      const group: IChatGroup | undefined = chatGroups.find((g) => g.id === data.groupId);

      if (!group) return;
      
      const message: IMessage = {
        user,
        content: data.content,
        timestamp: new Date().getMinutes()<10 ? new Date().getHours() +":0"+ new Date().getMinutes() :  new Date().getHours() +":"+ new Date().getMinutes(),
      };
      group.messages.push(message);
      
      // io.emit("chat_group_updated", group);
      io.to(data.groupId).emit("message_received", group);
    });

    socket.on("create_group", (groupName: string) => {
      const user = users.find((u) => u.id === socket.id);
      if (!user) return;

      const leavingGroup = chatGroups.find((g) => g.id === getUserRoom(socket)?.id);

      if (!leavingGroup) return;

      const userInChatGroupIndex = leavingGroup.users.findIndex(
        (u) => u.id === user.id,
      );
      if (userInChatGroupIndex !== -1) {
        leavingGroup.users.splice(userInChatGroupIndex, 1);
      }

      const id = generateUniqueId();
      const group: IChatGroup = {
        id,
        name: groupName,
        users: [user],
        messages: [],
      };
      chatGroups.push(group);
      socket.leave(leavingGroup.id);
      socket.join(id);

      socket.emit("group_created", group);
    
      io.to(leavingGroup.id).emit("user_left", leavingGroup)
      io.emit("new_group_created", chatGroups);
      // socket.emit("joined_group", group);
      // io.emit("users_in_lobby_updated", usersInLobby);
      // io.emit("chat_groups_updated", chatGroups);
      // io.emit("users_in_group_updated", chatGroup);
    });

    // socket.on("leave_group", (groupId: string) => {
    //   const user = users.find((u) => u.id === socket.id);
    //   if (!user) return;

    //   const group = chatGroups.find((g) => g.id === groupId);
    //   if (!group) return;

    //   const userInGroupIndex = group.users.findIndex((u) => u.id === socket.id);
    //   if (userInGroupIndex !== -1) {
    //     group.users.splice(userInGroupIndex, 1);
    //   }

    //   if (group.users.length === 0 && groupId !== LOBBY_ID) {
    //     const groupIndex = chatGroups.findIndex((g) => g.id === groupId);
    //     if (groupIndex !== -1) {
    //       chatGroups.splice(groupIndex, 1);
    //     }
    //   }

    //   console.log("Joining lobby:", LOBBY_ID);
    //   socket.join(LOBBY_ID);
    //   console.log("User added to lobby:", user);
    //   usersInLobby.push(user);

    //   socket.leave(groupId);

    //   const lobbyGroup = chatGroups.find((g) => g.id === LOBBY_ID);
    //   if (lobbyGroup) {
    //     lobbyGroup.users.push(user);
    //   }

    //   socket.emit("left_group", groupId);
    //   io.emit("users_in_lobby_updated", usersInLobby);
    //   io.emit("chat_groups_updated", chatGroups);
    //   io.emit("users_in_group_updated", group);
    //   console.log(chatGroups);
    // });

    socket.on("disconnect", () => {
      const user = users.find((u) => u.id === socket.id);
      if (!user) return;

      const leavingGroup = chatGroups.find((group) => {
        const user = group.users.find((user) => user.id === socket.id);

        if (user) return group.id;
      });

      if (!leavingGroup) return;

      const userInGroupIndex = leavingGroup.users.findIndex(
        (u) => u.id === user.id,
      );
      if (userInGroupIndex !== -1) {
        leavingGroup.users.splice(userInGroupIndex, 1);
      }

      if (leavingGroup.users.length === 0 && leavingGroup.id !== LOBBY_ID) {
        const groupIndex = chatGroups.findIndex((g) => g.id === leavingGroup.id);
        if (groupIndex !== -1) {
          chatGroups.splice(groupIndex, 1);
        }
      }
      if(leavingGroup.users.length === 0 && leavingGroup.id === LOBBY_ID) {
        leavingGroup.messages = [];
      }

      io.emit("user_disconnected", chatGroups);
      io.to(leavingGroup.id).emit("user_left", leavingGroup);
      // io.emit("users_list_udpated", users);
      // io.emit("chat_groups_updated", chatGroups);
    });
  });

  const generateUniqueId = (): string => {
    return uuidv4();
  };
  const getUserRoom = (socket: Socket) => {
    const chatGroup = chatGroups.find((group) => {
      const user = group.users.find((user) => user.id === socket.id);

      if (user) return group.id;
    });
    return chatGroup;
  }
};