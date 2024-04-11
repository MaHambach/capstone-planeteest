import React, {useEffect, useState} from "react";
import {ImCross} from "react-icons/im";
import {FaCheck} from "react-icons/fa";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import {WorldMap} from "../../../types/WorldMap.ts";

type Data = {
    appUsers: AppUserMinimal[];
    worldMapInvite: WorldMapInvite;
    worldMaps: WorldMap[];
}
type Props = {
    displayOwnerName?: boolean;
    displayInviteeName?: boolean;
    displayWorldMapName?: boolean;
}
type Functions = {
    acceptWorldMapInvite: (id:string) => void;
    deleteWorldMapInvite: (id:string) => void;
}
type WorldMapInviteCardProps = {
    data:Data;
    props:Props;
    functions:Functions;
}
export function WorldMapInviteCard({data, props, functions}:Readonly<WorldMapInviteCardProps>):React.ReactElement {
    const [inviteeName, setInviteeName] = useState<string>("");
    const [ownerName, setOwnerName] = useState<string>("");
    const [worldMapName, setWorldMapName] = useState<string>("");

    useEffect(() => {
        setInviteeName(getAppUserNameById(data.worldMapInvite.inviteeId));
        setOwnerName(getAppUserNameById(data.worldMapInvite.ownerId));
        setWorldMapName(getWorldMapNameById(data.worldMapInvite.worldMapId));
        // eslint-disable-next-line
    }, []);

    function getWorldMapNameById(id:string):string {
        const worldMapWithId:WorldMap | undefined = data.worldMaps.find((worldMap:WorldMap) => worldMap.id === id);
        if(!worldMapWithId) console.error("No world map with id \"" + id + "\" found.");
        else return worldMapWithId.name;
        return "";
    }

    function getAppUserNameById(id:string):string {
        const appUserWithId:AppUserMinimal | undefined = data.appUsers.find((appUser:AppUserMinimal) => appUser.id === id);

        if(!appUserWithId) console.error("No app user with id \"" + id + "\" found.");
        else return appUserWithId.username;
        return "";
    }

    function handleDelete(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        if (window.confirm("Möchten die Einladung zu \"" + worldMapName + "\" von \"" + ownerName + "\" für \"" + inviteeName + "\" wirklich löschen?")) {
            functions.deleteWorldMapInvite(data.worldMapInvite.id);
        }
    }

    function handleAccept(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        functions.acceptWorldMapInvite(data.worldMapInvite.id);
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
