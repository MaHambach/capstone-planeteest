import React, {useEffect, useState} from "react";
import {emptyWorldMap, WorldMap} from "../../../types/WorldMap.ts";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import {WorldMapInviteCard} from "./WorldMapInviteCard.tsx";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import {AppUser} from "../../../types/AppUser.ts";
import useWorldMaps from "../../../hooks/useWorldMaps.ts";

type invitesType = "ToUser" | "FromUser" | "ToWorldMap";

type WorldMapInviteGalleryProps = {
    title: string;
    appUser: AppUser;
    appUsers: AppUserMinimal[];
    worldMapInvites: WorldMapInvite[];
    invitesType: invitesType;
}
export default function WorldMapInviteGallery(props:Readonly<WorldMapInviteGalleryProps>):React.ReactElement {
    const [displayedWorldMapInvites, setDisplayedWorldMapInvites] = useState<WorldMapInvite[]>([]);
    const [displayOwnerName, setDisplayOwnerName] = useState<boolean>(false);
    const [displayInviteeName, setDisplayInviteeName] = useState<boolean>(false);
    const [displayWorldMapName, setDisplayWorldMapName] = useState<boolean>(false);
    const [worldMap, setWorldMap] = useState<WorldMap>(emptyWorldMap);
    const {getWorldMapById} = useWorldMaps();

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
                getAllWorldMapInvitesToWorldMap(setDisplayedWorldMapInvites, worldMap.id);
                setDisplayOwnerName(false);
                setDisplayInviteeName(true);
                setDisplayWorldMapName(false);
                break;
            default:
                break;
        }
        // eslint-disable-next-line
    }, [props, worldMap]);

    useEffect(
        () => {
            if((props.invitesType === "ToUser" || props.invitesType === "FromUser") && props.worldMapInvites.length > 0) {
                setWorldMap(getWorldMapById(props.worldMapInvites[0].worldMapId));
            }
        // eslint-disable-next-line
    }, [props]
    )

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
                            worldMapName={worldMap.name}
                        />
                    )
                })}
            </div>
        </div>
)
}
