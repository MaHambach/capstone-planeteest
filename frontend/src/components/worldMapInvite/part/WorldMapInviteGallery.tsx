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
    displayOwnerName?: boolean;
    displayInviteeName?: boolean;
    displayWorldMapName?: boolean;
    acceptWorldMapInvite?: (worldMapInviteId: string) => void;
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
                            displayOwnerName={props.displayOwnerName}
                            displayInviteeName={props.displayInviteeName}
                            displayWorldMapName={props.displayWorldMapName}
                            ownerName={props.appUsers.filter((appUser:AppUserMinimal):boolean => appUser.id === worldMapInvite.ownerId)[0].username}
                            inviteeName={props.appUsers.filter((appUser:AppUserMinimal):boolean => appUser.id === worldMapInvite.inviteeId)[0].username}
                            worldMapName={props.getWorldMap(worldMapInvite.worldMapId).name}
                            deleteWorldMapInvite={props.deleteWorldMapInvite}
                            acceptWorldMapInvite={props.acceptWorldMapInvite}
                        />
                    )
                })}
            </div>
        </div>
)
}
