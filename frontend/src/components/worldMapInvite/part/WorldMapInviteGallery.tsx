import React from "react";
import {WorldMap} from "../../../types/WorldMap.ts";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import {WorldMapInviteCard} from "./WorldMapInviteCard.tsx";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";

type WorldMapInviteGalleryProps = {
    title: string;
    appUsers: AppUserMinimal[];
    worldMapInvites: WorldMapInvite[];
    getWorldMap: (id: string) => WorldMap;
    deleteWorldMapInvite: (worldMapInviteId: string) => void;
    isOwner: boolean;
}
export default function WorldMapInviteGallery(props:Readonly<WorldMapInviteGalleryProps>):React.ReactElement {

    return (
        <div className={"worldMapInviteGallery"}>
            <h3>{props.title}</h3>
            <div className={"worldMapInviteGalleryList"}>
                {props.worldMapInvites.map((worldMapInvite:WorldMapInvite) => {
                    return (
                        <WorldMapInviteCard
                            key={worldMapInvite.id}
                            worldMapInviteId={worldMapInvite.id}
                            displayName={props.isOwner ?
                                props.appUsers.filter((appUserMinimal:AppUserMinimal) => appUserMinimal.id === worldMapInvite.inviteeId)[0].username
                                :
                                props.appUsers.filter((appUserMinimal:AppUserMinimal) => appUserMinimal.id === worldMapInvite.ownerId)[0].username}
                            worldMapName={props.getWorldMap(worldMapInvite.worldMapId).name}
                            deleteWorldMapInvite={props.deleteWorldMapInvite}
                        />
                    )
                })}
            </div>
        </div>
)
}
