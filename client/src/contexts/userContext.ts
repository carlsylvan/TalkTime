import { createContext } from "react";
import { IUser } from "../models/IUser";

export  const UserContext = createContext<IUser>({id:"",username: ""});