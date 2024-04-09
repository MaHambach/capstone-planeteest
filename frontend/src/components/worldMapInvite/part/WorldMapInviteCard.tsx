import React from "react";
import {ImCross} from "react-icons/im";

type WorldMapInviteCardProps = {
    worldMapInviteId: string;
    displayName: string;
    worldMapName: string;
    deleteWorldMapInvite: (worldMapInviteId: string) => void;
}
export function WorldMapInviteCard(props:Readonly<WorldMapInviteCardProps>):React.ReactElement {
    function handleDelete(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        if (window.confirm("Möchten die Einladung zu \"" + props.worldMapName + "\" für \"" + props.displayName + "\" wirklich löschen?")) {
            props.deleteWorldMapInvite(props.worldMapInviteId);
        }
    }

    return (
        <div className={"worldMapInviteCard"}>
            <div className={"worldMapInviteCardTextBox"}>
                <p>{props.worldMapName}</p>
                <p>{props.displayName}</p>
            </div>
            <button onClick={handleDelete}><ImCross /></button>
        </div>
    )
}
