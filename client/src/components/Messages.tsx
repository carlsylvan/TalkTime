import { useContext } from "react";
import { UserContext } from "../contexts/userContext"
import { IMessage } from "../models/IChatGroup"
import { IUser } from "../models/IUser";

interface IMessagesProps {
    messageList: IMessage []
}

export const Messages = (props: IMessagesProps) => {
    const user = useContext<IUser>(UserContext);
    console.log(user);
    
    return (
        <div>
            MessageList
            <ul>
                {props.messageList.map((e, i) => 
                <li key={i} style={ user.id ===e.user.id ? {backgroundColor: "green"} : {backgroundColor: "blue"}}>
                    {e.content} (skickat av: {e.user.username} tid: {e.timestamp})
                </li>)}
            </ul>
        </div>
    )
}