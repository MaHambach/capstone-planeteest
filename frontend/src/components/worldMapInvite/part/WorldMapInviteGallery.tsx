import React, {useEffect, useState} from "react";
import {WorldMap} from "../../../types/WorldMap.ts";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import {WorldMapInviteCard} from "./WorldMapInviteCard.tsx";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import {AppUser} from "../../../types/AppUser.ts";

type invitesType = "ToUser" | "FromUser" | "ToWorldMap";

type WorldMapInviteGalleryProps = {
    title: string;
    appUser: AppUser;
    appUsers: AppUserMinimal[];
    worldMapInvites: WorldMapInvite[];
    invitesType: invitesType;
    worldMap?: WorldMap;
}
export default function WorldMapInviteGallery(props:Readonly<WorldMapInviteGalleryProps>):React.ReactElement {
    const [displayedWorldMapInvites, setDisplayedWorldMapInvites] = useState<WorldMapInvite[]>([]);
    const [displayOwnerName, setDisplayOwnerName] = useState<boolean>(false);
    const [displayInviteeName, setDisplayInviteeName] = useState<boolean>(false);
    const [displayWorldMapName, setDisplayWorldMapName] = useState<boolean>(false);

    function fetchAllWorldMapInvitesToUser(setWorldMapInvitesToUser:(worldMapInvite:WorldMapInvite[]) => void, appUserId:string):void {
        setWorldMapInvitesToUser(props.worldMapInvites.filter(
            (worldMapInvite:WorldMapInvite) => worldMapInvite.inviteeId === appUserId)
        );
    }

    function fetchAllWorldMapInvitesFromUser(setWorldMapInvitesFromUser:(worldMapInvite:WorldMapInvite[]) => void, appUserId:string):void {
        setWorldMapInvitesFromUser(props.worldMapInvites.filter(
            (worldMapInvite:WorldMapInvite) => worldMapInvite.ownerId === appUserId)
        );
    }

    function fetchAllWorldMapInvitesToWorldMap(setWorldMapInvites:(worldMapInvites:WorldMapInvite[]) => void, worldMapId: string):void {
        setWorldMapInvites(props.worldMapInvites.filter(
            (worldMapInvite:WorldMapInvite) => worldMapInvite.worldMapId === worldMapId)
        );
    }

    useEffect(() => {
        switch (props.invitesType) {
            case "ToUser":
                fetchAllWorldMapInvitesToUser(setDisplayedWorldMapInvites, props.appUser.id);
                setDisplayOwnerName(true);
                setDisplayInviteeName(false);
                setDisplayWorldMapName(true);
                break;
            case "FromUser":
                fetchAllWorldMapInvitesFromUser(setDisplayedWorldMapInvites, props.appUser.id);
                setDisplayOwnerName(false);
                setDisplayInviteeName(true);
                setDisplayWorldMapName(true);
                break;
            case "ToWorldMap":
                fetchAllWorldMapInvitesToWorldMap(setDisplayedWorldMapInvites, props.worldMap?.id ?? "");
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
        <div className={"worldMapInviteGallery"}>
            <h3>{props.title}</h3>
            <div className={"worldMapInviteGalleryList"}>
                {displayedWorldMapInvites.map((worldMapInvite:WorldMapInvite) => {
                    return (
                        <WorldMapInviteCard
                            key={worldMapInvite.id}
                            worldMapInvite={worldMapInvite}
                            displayOwnerName={displayOwnerName}
                            displayInviteeName={displayInviteeName}
                            displayWorldMapName={displayWorldMapName}
                            worldMapName={props.worldMap?.name}
                        />
                    )
                })}
            </div>
        </div>
)
}
