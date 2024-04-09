import React from "react";
import {ImCross} from "react-icons/im";
import {FaCheck} from "react-icons/fa";

type WorldMapInviteCardProps = {
    worldMapInviteId: string;
    displayOwnerName?: boolean;
    displayInviteeName?: boolean;
    displayWorldMapName?: boolean;
    ownerName: string;
    inviteeName: string;
    worldMapName: string;
    deleteWorldMapInvite: (worldMapInviteId: string) => void;
    acceptWorldMapInvite?: (worldMapInviteId: string) => void;
}
export function WorldMapInviteCard(props:Readonly<WorldMapInviteCardProps>):React.ReactElement {
    function handleDelete(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        if (window.confirm("Möchten die Einladung zu \"" + props.worldMapName + "\" von \"" + props.ownerName + "\" für \"" + props.inviteeName + "\" wirklich löschen?")) {
            props.deleteWorldMapInvite(props.worldMapInviteId);
        }
    }

    return (
        <div className={"worldMapInviteCard"}>
            <div className={"worldMapInviteCardTextBox"}>
                {props.displayWorldMapName && <span>{props.worldMapName}</span>}
                {props.displayOwnerName && <span>{props.ownerName}</span>}
                {props.displayInviteeName && <span>{props.inviteeName}</span>}
            </div>

            {// @ts-ignore
                props.acceptWorldMapInvite && <button onClick={() => props.acceptWorldMapInvite(props.worldMapInviteId)}><FaCheck /></button>}
            <button onClick={handleDelete}><ImCross /></button>
        </div>
    )
}
