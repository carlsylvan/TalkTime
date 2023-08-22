import { FormEvent, useState } from "react"
interface IMessageInput {
    sendMessage(msg:string) : void
}
export const MessageInput = (props:IMessageInput) => {
    const [ msg, setMsg ] = useState<string>("");
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.sendMessage(msg);
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