import React, {useEffect, useState} from "react";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import {WorldMap} from "../../../types/WorldMap.ts";
import {TableCell, TableRow} from "@mui/material";
import AcceptInviteButton from "../../_generic/parts/AcceptInviteButton.tsx";
import DeleteInviteButton from "../../_generic/parts/DeleteInviteButton.tsx";

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

    function handleDelete(event:React.MouseEvent<HTMLButtonElement>, worldMapInviteId: string):void {
        event.preventDefault();
        if (window.confirm("Möchtest du die Einladung zu \"" + worldMapName + "\" von \"" + ownerName + "\" für \"" + inviteeName + "\" wirklich löschen?")) {
            functions.deleteWorldMapInvite(worldMapInviteId);
        }
    }

    function handleAccept(event:React.MouseEvent<HTMLButtonElement>, worldMapInviteId: string):void {
        event.preventDefault();
        functions.acceptWorldMapInvite(worldMapInviteId);
    }

    return (
        <TableRow>
            {props.displayWorldMapName &&
                <TableCell>
                    <span>{worldMapName}</span>
                </TableCell>
            }
            {props.displayOwnerName &&
                <TableCell>
                    <span>{ownerName}</span>
                </TableCell>
            }
            {props.displayInviteeName &&
                <TableCell>
                    <span>{inviteeName}</span>
                </TableCell>
            }
            {props.displayOwnerName &&
                <TableCell>
                    <AcceptInviteButton functions={{onClick: handleAccept}}
                                        props={{target: data.worldMapInvite.id}}
                    />
                </TableCell>
            }
            <TableCell>
                <DeleteInviteButton functions={{onClick: handleDelete}}
                                    props={{target: data.worldMapInvite.id}}
                />
            </TableCell>
        </TableRow>
    )
}
