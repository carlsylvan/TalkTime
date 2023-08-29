import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { IChatGroup, IMessage } from "../models/IChatGroup";
import { IUser } from "../models/IUser";
import { MessageInput } from "./MessageInput";
import { TypingIndicator } from "./TypingIndicator";
import socket from "../socket/socket";

interface IMessagesProps {
  messageList: IMessage[];
  groupId: string;
  roomName: string;
}

export const Messages = (props: IMessagesProps) => {
  const user = useContext<IUser>(UserContext);

  return (
    <div className="chat_room_messages">
      <div className="chat_room_messages_list">
        <ul>
          {props.messageList.map((e, i) => (
            <li key={i} className={user.id === e.user.id ? "my_messages" : ""}>
              <div>
                <span>
                  {e.timestamp} {e.user.username}
                </span>
                {e.isGif ? (
                  <div className="chat_room_messages_gif">
                    <img src={e.content} alt="Random GIF" />
                  </div>
                ) : (
                  <div className="chat_room_messages_text">{e.content}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
        <TypingIndicator />
      </div>
      <MessageInput messageList={props.messageList} groupId={props.groupId} />
    </div>
  );
};
