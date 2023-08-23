import { IUser } from "./IUser";

export interface IMessage {
  user: IUser;
  content: string;
  timestamp: string;
}

export interface IChatGroup {
  id: string;
  name: string;
  users: IUser[];
  messages: IMessage[];
}
