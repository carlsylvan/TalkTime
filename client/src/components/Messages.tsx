import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../contexts/userContext";
import { IMessage } from "../models/IChatGroup";
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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, [props.messageList]);

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
                    <img
                      src={e.content}
                      alt="Random GIF"
                      onLoad={scrollToBottom}
                    />
                  </div>
                ) : (
                  <div className="chat_room_messages_text">{e.content}</div>
                )}
              </div>
            </li>
          ))}
          <div ref={messagesEndRef} />
          <TypingIndicator />
        </ul>
      </div>
      <MessageInput messageList={props.messageList} groupId={props.groupId} />
    </div>
  );
};
