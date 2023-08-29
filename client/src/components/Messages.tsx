import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { IChatGroup, IMessage } from "../models/IChatGroup";
import { IUser } from "../models/IUser";
import { MessageInput } from "./MessageInput";
import { TypingIndicator } from "./TypingIndicator";

interface IMessagesProps {
  messageList: IMessage[];
  groupId: string;
  roomName: string;
}

export const Messages = (props: IMessagesProps) => {
  const user = useContext<IUser>(UserContext);
  return (
    <div>
      <div>
        <ul>
          {props.messageList.map((e, i) => (
            <li key={i} className={user.id === e.user.id ? "myMessages" : ""}>
              <div>
                <span>{e.timestamp}</span>
                <div>
                  <span>{e.user.username}</span>
                  {e.isGif ? (
                    <img src={e.content} alt="Random GIF" />
                  ) : (
                    e.content
                  )}
                </div>
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
