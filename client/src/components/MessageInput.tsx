import { FormEvent, useContext, useState } from "react";
import socket from "../socket/socket";
import { getRandomGif } from "../services/gifService";
import { IChatContext, ChatGroupContext } from "../contexts/chatContext";

export const MessageInput = () => {
  const [msg, setMsg] = useState<string>("");
  const chat = useContext<IChatContext>(ChatGroupContext);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(msg!=="") {
      socket.emit("send_message", {
        groupId: chat.currentRoom.id,
        content: msg,
      });
      setMsg("");
    }
  };

  const handleTyping = () => {
    socket.emit("typing", chat.currentRoom.id);
  };

  const handleRandomGifButton = async () => {
    try {
      const response = await getRandomGif();
      const gifUrl = response.data.images.fixed_height.url;

      socket.emit("send_message", {
        groupId: chat.currentRoom.id,
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
          placeholder="Type here..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button type="submit">Send</button>
        <button onClick={handleRandomGifButton} type="button" className="gif_button">
            GIF
        </button>
      </form>
    </>
  );
};
