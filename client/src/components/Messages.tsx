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
            <ul>
                {props.messageList.map((e, i) => 
                <li key={i} className = { user.id ===e.user.id ? "myMessages" : ""}>
                    <div>
                        <span>
                            {e.timestamp}
                        </span>
                        <div>
                            <span>
                                {e.user.username}
                            </span>
                            {e.content}
                        </div>
                    </div>
                </li>)}
            </ul>
        </div>
    )
}