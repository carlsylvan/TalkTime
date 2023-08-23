import { IChatGroup } from "../models/IChatGroup"

interface IActiveRoomsProps {
    chatGroups: IChatGroup[]
}

export const ActiveRooms = (props: IActiveRoomsProps) => {
    
    return (
        <div>
            <h1>Aktiva Rum</h1>
            <ul>
                {props.chatGroups.map((e, i) => <li key={i}>{e.name} ({e.users.length} :personer)</li>)}
            </ul>
        </div>
    )
}