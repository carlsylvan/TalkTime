import { createContext } from "react";
import { IChatGroup } from "../models/IChatGroup";

export interface IChatContext {
  rooms: IChatGroup[];
  currentRoom:IChatGroup
}

const startValue: IChatContext = {
  rooms: [],
  currentRoom: { id: "", name: "", users: [], messages: []},
};

export const ChatGroupContext = createContext<IChatContext>(startValue);
