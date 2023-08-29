import { FormEvent, useContext, useState } from "react";
import { IChatGroup, IMessage } from "../models/IChatGroup";
import socket from "../socket/socket";
import { getRandomGif } from "../services/gifService";
interface IMessageInput {
  groupId: string;
  // sendMessage(msg:string) : void
  messageList: IMessage[];
}
export const MessageInput = (props: IMessageInput) => {
  const [msg, setMsg] = useState<string>("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("send_message", {
      groupId: props.groupId,
      content: msg,
    });
    setMsg("");
  };

  const handleTyping = () => {
    socket.emit("typing", props.groupId);
  };

  const handleRandomGifButton = async () => {
    try {
      const response = await getRandomGif();
      const gifUrl = response.data.images.fixed_height.url;

      socket.emit("send_message", {
        groupId: props.groupId,
        content: gifUrl,
        isGif: true,
      });
    } catch (error) {
      console.log("Det gick inte att hämta GIF", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Skriv här..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button type="submit">Skicka</button>
        <button onClick={handleRandomGifButton} type="submit" className="gif_button">
            GIF
        </button>
      </form>
    </>
  );
};
