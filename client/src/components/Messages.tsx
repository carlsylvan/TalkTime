import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../contexts/userContext";
import { IUser } from "../models/IUser";
import { MessageInput } from "./MessageInput";
import { TypingIndicator } from "./TypingIndicator";
import { ChatGroupContext, IChatContext } from "../contexts/chatContext";

export const Messages = () => {
  const user = useContext<IUser>(UserContext);
  const chat = useContext<IChatContext>(ChatGroupContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, [chat.currentRoom.messages]);

  return (
    <div className="chat_room_messages">
      <div className="chat_room_messages_list">
        <ul className="message_list">
          {chat.currentRoom.messages.map((e, i) => (
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
      <MessageInput />
    </div>
  );
};
