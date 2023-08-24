import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";
import { ChatGroupContext, IContext } from "../contexts/chatGroupContext";

export const CreateRoom = () => {
  const [roomname, setRoomname] = useState<string>("");
  const [createroom, setCreateroom] = useState<boolean>(false);
  const context = useContext<IContext>(ChatGroupContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("group_created", (group) => {
      navigate(`/${group.name}/${group.id}`);
      context.addGroup(group.id, group.name);
    });

    // socket.on("joined_group", (group) => {
    //   console.log(`Joined group: ${group.name}`);
    // });

    // return () => {
    //   socket.off("group_created");
    //   socket.off("joined_group");
    // };
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
