import { ChangeEvent, useEffect, useState } from "react";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";

export const CreateRoom = () => {
  const [roomname, setRoomname] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("group_created", (group) => {
      console.log(`Group created: ${group.name}`);
      navigate(`/${group.name}/${group.id}`);
    });

    socket.on("joined_group", (group) => {
      console.log(`Joined group: ${group.name}`);
    });

    return () => {
      socket.off("group_created");
      socket.off("joined_group");
    };
  }, [navigate]);

  const handleCreateRoomButton = () => {
    if (roomname === "") return;
    socket.emit("create_group", roomname);
    setRoomname("");
  };

  const handleCreateRoomInput = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomname(e.target.value);
  };

  return (
    <div>
      <h3>Välj namn på nytt rum</h3>
      <input value={roomname} onChange={handleCreateRoomInput} type="text" />
      <button onClick={handleCreateRoomButton}>Öppna</button>
    </div>
  );
};
