import { useEffect, useState } from "react";
import socket from "../socket/socket";

export const TypingIndicator = () => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleTypingEvent = () => {
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
      }, 5000);
    };

    socket.on("typing", handleTypingEvent);

    return () => {
      socket.off("typing", handleTypingEvent);
    };
  }, []);

  return isTyping ? (
    <div className="typing-indicator">Någon skriver ett meddelande...</div>
  ) : null;
};
