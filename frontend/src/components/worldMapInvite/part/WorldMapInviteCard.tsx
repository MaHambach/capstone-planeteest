import React, {useEffect, useState} from "react";
import {ImCross} from "react-icons/im";
import {FaCheck} from "react-icons/fa";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
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

    // Functions
    acceptWorldMapInvite: (id:string) => void;
    deleteWorldMapInvite: (id:string) => void;
}
export function WorldMapInviteCard(props:Readonly<WorldMapInviteCardProps>):React.ReactElement {
    const [inviteeName, setInviteeName] = useState<string>("");
    const [ownerName, setOwnerName] = useState<string>("");
    const [worldMapName, setWorldMapName] = useState<string>("");

    useEffect(() => {
        setInviteeName(getAppUserNameById(props.worldMapInvite.inviteeId));
        setOwnerName(getAppUserNameById(props.worldMapInvite.ownerId));
        setWorldMapName(getWorldMapNameById(props.worldMapInvite.worldMapId));
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
            props.deleteWorldMapInvite(props.worldMapInvite.id);
        }
    }

    function handleAccept(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        props.acceptWorldMapInvite(props.worldMapInvite.id);
    }

    return (
        <div className={"worldMapInviteCard"}>
            <div className={"worldMapInviteCardTextBox"}>
                {props.displayWorldMapName && <span>{worldMapName}</span>}
                {props.displayOwnerName && <span>{ownerName}</span>}
                {props.displayInviteeName && <span>{inviteeName}</span>}
            </div>
            {props.displayOwnerName && <button onClick={handleAccept}><FaCheck /></button>}
            <button onClick={handleDelete}><ImCross /></button>
        </div>
    )
}
