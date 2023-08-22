import { IUser } from "../models/IUser";

interface ILobbyUsersList {
  lobbyUserList: IUser;
}

export const UsersInLobbyList = (props: ILobbyUsersList) => {
  return (
    <>
      <ul>
        <li>{props.lobbyUserList.username}</li>
      </ul>
    </>
  );
};
