import { createContext } from "react";
import { IChatGroup } from "../models/IChatGroup";

export interface IContext {
  chatGroups: IChatGroup[];
  addGroup(id: string, name: string): void;
}

const chatGroup: IContext = {
  chatGroups: [],
  addGroup: () => {},
};

export const ChatGroupContext = createContext<IContext>(chatGroup);
