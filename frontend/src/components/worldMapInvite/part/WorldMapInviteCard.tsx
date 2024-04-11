import React, {useEffect, useState} from "react";
import {ImCross} from "react-icons/im";
import {FaCheck} from "react-icons/fa";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import useWorldMapInvite from "../../../hooks/useWorldMapInvite.ts";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import {WorldMap} from "../../../types/WorldMap.ts";

type WorldMapInviteCardProps = {
    // Data
    appUsers: AppUserMinimal[];
    worldMapInvite: WorldMapInvite;
    worldMaps: WorldMap[];

    // Props
    displayOwnerName?: boolean;
    displayInviteeName?: boolean;
    displayWorldMapName?: boolean;
}
export function WorldMapInviteCard(props:Readonly<WorldMapInviteCardProps>):React.ReactElement {
    const [inviteeName, setInviteeName] = useState<string>("");
    const [ownerName, setOwnerName] = useState<string>("");
    const [worldMapName, setWorldMapName] = useState<string>("");
    const {acceptWorldMapInvite, deleteWorldMapInvite} = useWorldMapInvite();

    useEffect(() => {
        if(props.displayInviteeName) setInviteeName(getAppUserNameById(props.worldMapInvite.inviteeId));
        if(props.displayOwnerName) setOwnerName(getAppUserNameById(props.worldMapInvite.ownerId));
        if(props.displayWorldMapName) setWorldMapName(getWorldMapNameById(props.worldMapInvite.worldMapId));
        // eslint-disable-next-line
    }, []);

    function getWorldMapNameById(id:string):string {
        const worldMapWithId:WorldMap | undefined = props.worldMaps.find((worldMap:WorldMap) => worldMap.id === id);
        if(!worldMapWithId) console.error("No world map with id \"" + id + "\" found.");
        else return worldMapWithId.name;
        return "";
    }

    function getAppUserNameById(id:string):string {
        const appUserWithId:AppUserMinimal | undefined = props.appUsers.find((appUser:AppUserMinimal) => appUser.id === id);

        if(!appUserWithId) console.error("No app user with id \"" + id + "\" found.");
        else return appUserWithId.username;
        return "";
    }

    function handleDelete(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        if (window.confirm("Möchten die Einladung zu \"" + worldMapName + "\" von \"" + ownerName + "\" für \"" + inviteeName + "\" wirklich löschen?")) {
            deleteWorldMapInvite(props.worldMapInvite.id);
        }
    }

    return (
        <div className={"worldMapInviteCard"}>
            <div className={"worldMapInviteCardTextBox"}>
                {props.displayWorldMapName && <span>{worldMapName}</span>}
                {props.displayOwnerName && <span>{ownerName}</span>}
                {props.displayInviteeName && <span>{inviteeName}</span>}
            </div>
            {props.displayOwnerName && <button onClick={() => acceptWorldMapInvite(props.worldMapInvite.id)}><FaCheck /></button>}
            <button onClick={handleDelete}><ImCross /></button>
        </div>
    )
}
