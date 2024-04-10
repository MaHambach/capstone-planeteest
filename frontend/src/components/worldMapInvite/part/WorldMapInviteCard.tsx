import React, {useEffect, useState} from "react";
import {ImCross} from "react-icons/im";
import {FaCheck} from "react-icons/fa";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import {useAppUser} from "../../../hooks/useAppUser.ts";
import useWorldMapInvite from "../../../hooks/useWorldMapInvite.ts";

type WorldMapInviteCardProps = {
    worldMapInvite: WorldMapInvite;
    displayOwnerName?: boolean;
    displayInviteeName?: boolean;
    displayWorldMapName?: boolean;
    worldMapName?: string;
}
export function WorldMapInviteCard(props:Readonly<WorldMapInviteCardProps>):React.ReactElement {
    const [ownerName, setOwnerName] = useState<string>("");
    const [inviteeName, setInviteeName] = useState<string>("");
    const {fetchAppUserNameById} = useAppUser();
    const {acceptWorldMapInvite, deleteWorldMapInvite} = useWorldMapInvite();

    useEffect(() => {
        if(props.displayOwnerName) setOwnerName(fetchAppUserNameById(props.worldMapInvite.ownerId));
        if(props.displayInviteeName) setInviteeName(fetchAppUserNameById(props.worldMapInvite.inviteeId));
        // eslint-disable-next-line
    }, []);

    function handleDelete(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        if (window.confirm("Möchten die Einladung zu \"" + props.worldMapName + "\" von \"" + ownerName + "\" für \"" + inviteeName + "\" wirklich löschen?")) {
            deleteWorldMapInvite(props.worldMapInvite.id);
        }
    }

    return (
        <div className={"worldMapInviteCard"}>
            <div className={"worldMapInviteCardTextBox"}>
                {props.displayWorldMapName && <span>{props.worldMapName}</span>}
                {props.displayOwnerName && <span>{ownerName}</span>}
                {props.displayInviteeName && <span>{inviteeName}</span>}
            </div>
            {props.displayOwnerName && <button onClick={() => acceptWorldMapInvite(props.worldMapInvite.id)}><FaCheck /></button>}
            <button onClick={handleDelete}><ImCross /></button>
        </div>
    )
}
