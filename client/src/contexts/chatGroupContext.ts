import { createContext } from "react";
import { IChatGroup } from "../models/IChatGroup";

export const ChatGroupContext = createContext<IChatGroup>(
    {
        id: "",
        name: "",
        users: [],
        messages: [],
    })