import React, {useEffect, useState} from "react";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import {WorldMapInviteCard} from "./WorldMapInviteCard.tsx";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import {AppUser} from "../../../types/AppUser.ts";
import {WorldMap} from "../../../types/WorldMap.ts";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Typography from "@mui/joy/Typography";

type invitesType = "ToUser" | "FromUser" | "ToWorldMap";
type Data = {
    appUser: AppUser;
    appUsers: AppUserMinimal[];
    worldMapInvites: WorldMapInvite[];
    worldMaps: WorldMap[];
}
type Props = {
    title: string;
    invitesType: invitesType;
    worldMapId?: string;
}
type Functions = {
    acceptWorldMapInvite: (id:string) => void;
    deleteWorldMapInvite: (id:string) => void;
}
type WorldMapInviteGalleryProps = {
    data:Data;
    props:Props;
    functions:Functions;
}
export default function WorldMapInviteGallery({data, props, functions}:Readonly<WorldMapInviteGalleryProps>):React.ReactElement {
    const [displayedWorldMapInvites, setDisplayedWorldMapInvites] = useState<WorldMapInvite[]>([]);
    const [displayOwnerName, setDisplayOwnerName] = useState<boolean>(false);
    const [displayInviteeName, setDisplayInviteeName] = useState<boolean>(false);
    const [displayWorldMapName, setDisplayWorldMapName] = useState<boolean>(false);

    function getAllWorldMapInvitesToUser(setWorldMapInvitesToUser:(worldMapInvite:WorldMapInvite[]) => void, appUserId:string):void {
        setWorldMapInvitesToUser(data.worldMapInvites.filter(
            (worldMapInvite:WorldMapInvite) => worldMapInvite.inviteeId === appUserId)
        );
    }

    function getAllWorldMapInvitesFromUser(setWorldMapInvitesFromUser:(worldMapInvite:WorldMapInvite[]) => void, appUserId:string):void {
        setWorldMapInvitesFromUser(data.worldMapInvites.filter(
            (worldMapInvite:WorldMapInvite) => worldMapInvite.ownerId === appUserId)
        );
    }

    function getAllWorldMapInvitesToWorldMap(setWorldMapInvites:(worldMapInvites:WorldMapInvite[]) => void, worldMapId: string):void {
        setWorldMapInvites(data.worldMapInvites.filter(
            (worldMapInvite:WorldMapInvite) => worldMapInvite.worldMapId === worldMapId)
        );
    }

    useEffect(() => {
        switch (props.invitesType) {
            case "ToUser":
                getAllWorldMapInvitesToUser(setDisplayedWorldMapInvites, data.appUser.id);
                setDisplayOwnerName(true);
                setDisplayInviteeName(false);
                setDisplayWorldMapName(true);
                break;
            case "FromUser":
                getAllWorldMapInvitesFromUser(setDisplayedWorldMapInvites, data.appUser.id);
                setDisplayOwnerName(false);
                setDisplayInviteeName(true);
                setDisplayWorldMapName(true);
                break;
            case "ToWorldMap":
                if(props.worldMapId === undefined) break;
                getAllWorldMapInvitesToWorldMap(setDisplayedWorldMapInvites, props.worldMapId);
                setDisplayOwnerName(false);
                setDisplayInviteeName(true);
                setDisplayWorldMapName(false);
                break;
            default:
                break;
        }
        // eslint-disable-next-line
    }, [props]);

    return (
        <>
            <Typography sx={{fontWeight: "bold"}}>{props.title}</Typography>
            <Table size={"small"}>
                <TableHead>
                    <TableRow>
                        {displayWorldMapName &&
                            <TableCell><b>Weltkarte</b></TableCell>
                        }
                        {displayOwnerName &&
                            <TableCell><b>Name</b></TableCell>
                        }
                        {displayInviteeName &&
                            <TableCell><b>Name</b></TableCell>
                        }
                        {displayOwnerName &&
                            <TableCell><b>Akzeptieren</b></TableCell>
                        }
                        {displayOwnerName ?
                            <TableCell><b>Ablehnen</b></TableCell>
                            :
                            <TableCell><b>Entfernen</b></TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayedWorldMapInvites.map((worldMapInvite: WorldMapInvite) => {
                        return (
                            <WorldMapInviteCard
                                key={worldMapInvite.id}
                                data={{
                                    appUsers: data.appUsers,
                                    worldMapInvite: worldMapInvite,
                                    worldMaps: data.worldMaps
                                }}
                                props={{displayOwnerName, displayInviteeName, displayWorldMapName}}
                                functions={functions}
                            />
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}
