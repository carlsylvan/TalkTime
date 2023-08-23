import { IUser } from "../models/IUser";

interface IUsersInRoomProps {
  usersInRoom: IUser[];
}

export const RoomUsers = (props: IUsersInRoomProps) => {

  return (
    <>
      <p>Personer i rummet</p>
      <ul>
        {props.usersInRoom.map((e, i) => <li key={i}>{e.username}</li>)}
        
      </ul>
    </>
  );
};
