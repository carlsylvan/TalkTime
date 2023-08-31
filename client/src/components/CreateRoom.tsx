import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";
import { IChatGroup } from "../models/IChatGroup";

export const CreateRoom = () => {
  const [roomname, setRoomname] = useState<string>("");
  const [createroom, setCreateroom] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("group_created", (group:IChatGroup) => {
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
    <>
      {!createroom ? (
        <button onClick={openForm} className="create_room_button">Create room</button>
      ) : (
        <div className="create_room_form">
          <button onClick={()=>{setCreateroom(false)}}>close</button>
          <form  onSubmit={handleCreateRoom}>
            <p>Room name</p>
            <input
              value={roomname}
              onChange={handleCreateRoomInput}
              type="text"
            />
            <button type="submit">Open</button>
          </form>
        </div>
      )}
    </>
  );
};
