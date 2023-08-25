import { FormEvent, useContext, useState } from "react"
import { IChatGroup, IMessage } from "../models/IChatGroup";
import socket from "../socket/socket";
interface IMessageInput {
    groupId: string
    // sendMessage(msg:string) : void
    // groupChat: IChatGroup,
}
export const MessageInput = (props:IMessageInput) => {
    const [ msg, setMsg ] = useState<string>("");
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        socket.emit("send_message", {
          groupId: props.groupId,
          content: msg,
        });
        setMsg("");
    }
    return (
        <>
        <form onSubmit={handleSubmit}> 
            <input 
                type="text" 
                placeholder="Skriv här..."
                value={ msg }
                onChange={(e) => setMsg(e.target.value)} />
            <button type="submit" >Skicka</button>
        </form>
        </>
    )
}