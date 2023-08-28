import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";

export const CreateRoom = () => {
  const [roomname, setRoomname] = useState<string>("");
  const [createroom, setCreateroom] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("group_created", (group) => {
      navigate(`/${group.name}/${group.id}`);
    });
  }, [navigate]);

  const handleCreateRoom = (e: FormEvent) => {
    e.preventDefault();
    if (roomname === "") return;
    socket.emit("create_group", roomname);
    setRoomname("");
    setCreateroom(false);
  };

  const handleCreateRoomInput = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomname(e.target.value);
  };
  const openForm = () => {
    setCreateroom(true);
  };

  return (
    <div>
      {!createroom ? (
        <button onClick={openForm}>Skapa rum</button>
      ) : (
        <form className="create-room-form" onSubmit={handleCreateRoom}>
          <h3>Välj namn på nytt rum</h3>
          <input
            value={roomname}
            onChange={handleCreateRoomInput}
            type="text"
          />
          <button type="submit">Öppna</button>
        </form>
      )}
    </div>
  );
};
