import React, {useEffect, useState} from "react";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import {WorldMapInviteCard} from "./WorldMapInviteCard.tsx";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import {AppUser} from "../../../types/AppUser.ts";
import {WorldMap} from "../../../types/WorldMap.ts";

type invitesType = "ToUser" | "FromUser" | "ToWorldMap";

type WorldMapInviteGalleryProps = {
    // Data
    appUser: AppUser;
    appUsers: AppUserMinimal[];
    worldMapInvites: WorldMapInvite[];
    worldMaps: WorldMap[];

    // Props
    title: string;
    invitesType: invitesType;
    worldMapId?: string;
}
export default function WorldMapInviteGallery(props:Readonly<WorldMapInviteGalleryProps>):React.ReactElement {
    const [displayedWorldMapInvites, setDisplayedWorldMapInvites] = useState<WorldMapInvite[]>([]);
    const [displayOwnerName, setDisplayOwnerName] = useState<boolean>(false);
    const [displayInviteeName, setDisplayInviteeName] = useState<boolean>(false);
    const [displayWorldMapName, setDisplayWorldMapName] = useState<boolean>(false);

    function getAllWorldMapInvitesToUser(setWorldMapInvitesToUser:(worldMapInvite:WorldMapInvite[]) => void, appUserId:string):void {
        setWorldMapInvitesToUser(props.worldMapInvites.filter(
            (worldMapInvite:WorldMapInvite) => worldMapInvite.inviteeId === appUserId)
        );
    }

    function getAllWorldMapInvitesFromUser(setWorldMapInvitesFromUser:(worldMapInvite:WorldMapInvite[]) => void, appUserId:string):void {
        setWorldMapInvitesFromUser(props.worldMapInvites.filter(
            (worldMapInvite:WorldMapInvite) => worldMapInvite.ownerId === appUserId)
        );
    }

    function getAllWorldMapInvitesToWorldMap(setWorldMapInvites:(worldMapInvites:WorldMapInvite[]) => void, worldMapId: string):void {
        setWorldMapInvites(props.worldMapInvites.filter(
            (worldMapInvite:WorldMapInvite) => worldMapInvite.worldMapId === worldMapId)
        );
    }

    useEffect(() => {
        switch (props.invitesType) {
            case "ToUser":
                getAllWorldMapInvitesToUser(setDisplayedWorldMapInvites, props.appUser.id);
                setDisplayOwnerName(true);
                setDisplayInviteeName(false);
                setDisplayWorldMapName(true);
                break;
            case "FromUser":
                getAllWorldMapInvitesFromUser(setDisplayedWorldMapInvites, props.appUser.id);
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
        <div className={"worldMapInviteGallery"}>
            <h3>{props.title}</h3>
            <div className={"worldMapInviteGalleryList"}>
                {displayedWorldMapInvites.map((worldMapInvite:WorldMapInvite) => {
                    return (
                        <WorldMapInviteCard
                            key={worldMapInvite.id}
                            worldMapInvite={worldMapInvite}
                            appUsers={props.appUsers}
                            worldMaps={props.worldMaps}
                            displayOwnerName={displayOwnerName}
                            displayInviteeName={displayInviteeName}
                            displayWorldMapName={displayWorldMapName}
                        />
                    )
                })}
            </div>
        </div>
)
}
