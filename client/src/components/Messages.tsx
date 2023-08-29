import { useContext } from "react";
import { UserContext } from "../contexts/userContext"
import { IChatGroup, IMessage } from "../models/IChatGroup"
import { IUser } from "../models/IUser";
import { MessageInput } from "./MessageInput";


interface IMessagesProps {
    messageList: IMessage [],
    groupId: string,
    roomName: string
}

export const Messages = (props: IMessagesProps) => {
    const user = useContext<IUser>(UserContext);

    return (
        <div className="chat_room_messages">
            <div>
                  {/* <p>{props.roomName}</p> */}
                <ul>
                    {props.messageList.map((e, i) => 
                    <li key={i} className = { user.id ===e.user.id ? "my_messages" : ""}>
                        <div>
                            <span>
                                {e.timestamp}
                            </span>
                            <div>
                                <span>
                                    {e.user.username}
                                </span>
                                <div>
                                    {e.content}
                                </div>
                            </div>
                        </div>
                    </li>)}
                </ul>
            </div>
            <MessageInput groupId = { props.groupId }/>
        </div>
    )
}