import { IUser } from "../models/IUser";

interface IUsersInRoomProps {
  usersInRoom: IUser[];
}

export const RoomUsers = (props: IUsersInRoomProps) => {

  return (
    <>
      <ul>
        {props.usersInRoom.map((e) => <li>{e.username}</li>)}
        
      </ul>
    </>
  );
};
