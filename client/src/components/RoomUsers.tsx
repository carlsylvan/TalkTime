import { IUser } from "../models/IUser";

interface IUsersInRoomProps {
  usersInRoom: IUser[];
}

export const RoomUsers = (props: IUsersInRoomProps) => {

  return (
    <>
      <h2>Personer i rummet</h2>
      <ul>
        {props.usersInRoom.map((e, i) => <li key={i}>{e.username}</li>)}
        
      </ul>
    </>
  );
};
