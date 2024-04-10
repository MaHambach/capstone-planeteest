import React, {useEffect, useState} from "react";
import {WorldMap} from "../../../types/WorldMap.ts";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import {WorldMapInviteCard} from "./WorldMapInviteCard.tsx";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import useWorldMapInvite from "../../../hooks/useWorldMapInvite.ts";

type invitesType = "ToUser" | "FromUser" | "ToWorldMap";

type WorldMapInviteGalleryProps = {
    title: string;
    appUsers: AppUserMinimal[];
    invitesType: invitesType;
    worldMap?: WorldMap;
}
export default function WorldMapInviteGallery(props:Readonly<WorldMapInviteGalleryProps>):React.ReactElement {
    const [worldMapInvites, setWorldMapInvites] = useState<WorldMapInvite[]>([]);
    const { fetchAllWorldMapInvitesToUser,
            fetchAllWorldMapInvitesFromUser,
            fetchAllWorldMapInvitesToWorldMap} = useWorldMapInvite();
    const [displayOwnerName, setDisplayOwnerName] = useState<boolean>(false);
    const [displayInviteeName, setDisplayInviteeName] = useState<boolean>(false);
    const [displayWorldMapName, setDisplayWorldMapName] = useState<boolean>(false);

    useEffect(() => {
        switch (props.invitesType) {
            case "ToUser":
                fetchAllWorldMapInvitesToUser(setWorldMapInvites);
                setDisplayOwnerName(true);
                setDisplayInviteeName(false);
                setDisplayWorldMapName(true);
                break;
            case "FromUser":
                fetchAllWorldMapInvitesFromUser(setWorldMapInvites);
                setDisplayOwnerName(false);
                setDisplayInviteeName(true);
                setDisplayWorldMapName(true);
                break;
            case "ToWorldMap":
                fetchAllWorldMapInvitesToWorldMap(setWorldMapInvites, props.worldMap?.id ?? "");
                setDisplayOwnerName(false);
                setDisplayInviteeName(true);
                setDisplayWorldMapName(false);
                break;
            default:
                break;
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className={"worldMapInviteGallery"}>
            <h3>{props.title}</h3>
            <div className={"worldMapInviteGalleryList"}>
                {worldMapInvites.map((worldMapInvite:WorldMapInvite) => {
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
