import { IChatGroup } from "../../models/IChatGroup"
import "./ActiveRooms.scss";
interface IActiveRoomsProps {
    chatGroups: IChatGroup[]
}

export const ActiveRooms = (props: IActiveRoomsProps) => {
    const handleClick = (group: string) => {
        console.log("Joined: ", group);
        
    }
    return (
        <div className="active-rooms">
            <p>Aktiva Rum</p>
            <ul>
                {props.chatGroups.map((e, i) => <li key={i} onClick={()=>{handleClick(e.name)}}>{e.name} ({e.users.length} personer)</li>)}
            </ul>
        </div>
    )
}