import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { IChatGroup } from "../models/IChatGroup";
import { IUser } from "../models/IUser";

interface IMessagesProps {
  groupChat: IChatGroup;
}

export const Messages = (props: IMessagesProps) => {
  const user = useContext<IUser>(UserContext);
  return (
    <div>
      <ul>
        {props.groupChat.messages.map((e, i) => (
          <li key={i} className={user.id === e.user.id ? "myMessages" : ""}>
            <div>
              <span>{e.timestamp}</span>
              <div>
                <span>{e.user.username}</span>
                {e.isGif ? <img src={e.content} alt="Random GIF" /> : e.content}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
