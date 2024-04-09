import {AppUser} from "../../../types/AppUser.ts";
import {WorldMap} from "../../../types/WorldMap.ts";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import React from "react";
import WorldMapInviteGallery from "../../worldMapInvite/part/WorldMapInviteGallery.tsx";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";

type UserDetailsProps = {
    appUser: AppUser;
    appUsers: AppUserMinimal[];
    getWorldMap: (id: string) => WorldMap;
    worldMapInvites: WorldMapInvite[];
    deleteWorldMapInvite: (worldMapInviteId: string) => void;
}
export default function UserDetails(props:Readonly<UserDetailsProps>):React.ReactElement {


    return (
        <div>
            {props.appUser.username}
            <div>
                <WorldMapInviteGallery
                    title={"Du lädst zu folgenden Weltkarten ein:"}
                    isOwner={true}
                    worldMapInvites={props.worldMapInvites
                        .filter((worldMapInvite:WorldMapInvite) => worldMapInvite.ownerId === props.appUser.id)}
                    getWorldMap={props.getWorldMap}
                    appUsers={props.appUsers}
                    deleteWorldMapInvite={props.deleteWorldMapInvite}
                />
                <WorldMapInviteGallery
                    title={"Du wurdest zu folgenden Weltkarten eingeladen:"}
                    isOwner={false}
                    worldMapInvites={props.worldMapInvites
                        .filter((worldMapInvite:WorldMapInvite) => worldMapInvite.inviteeId === props.appUser.id)}
                    getWorldMap={props.getWorldMap}
                    appUsers={props.appUsers}
                    deleteWorldMapInvite={props.deleteWorldMapInvite}
                />
            </div>
        </div>
    )
}
