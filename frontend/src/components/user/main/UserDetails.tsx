import {AppUser} from "../../../types/AppUser.ts";
import {WorldMap} from "../../../types/WorldMap.ts";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import React, {useEffect, useState} from "react";
import WorldMapInviteGallery from "../../worldMapInvite/part/WorldMapInviteGallery.tsx";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";

type UserDetailsProps = {
    appUser: AppUser;
    appUsers: AppUserMinimal[];
    getWorldMap: (id: string) => WorldMap;
    fetchAllWorldMapInvitesToUser: (setWorldMapInvitesToUser:(worldMapInvite:WorldMapInvite[]) => void) => void;
    fetchAllWorldMapInvitesFromUser: (setWorldMapInvitesFromUser:(worldMapInvite:WorldMapInvite[]) => void) => void;
    deleteWorldMapInvite: (worldMapInviteId: string) => void;
}
export default function UserDetails(props:Readonly<UserDetailsProps>):React.ReactElement {
    const [worldMapInvitesToUser, setWorldMapInvitesToUser] = useState<WorldMapInvite[]>([]);
    const [worldMapInvitesFromUser, setWorldMapInvitesFromUser] = useState<WorldMapInvite[]>([]);

    useEffect(() => {
        props.fetchAllWorldMapInvitesToUser(setWorldMapInvitesToUser);
        props.fetchAllWorldMapInvitesFromUser(setWorldMapInvitesFromUser);
    }, [props]);

    return (
        <div>
            {props.appUser.username}
            <div>
                <WorldMapInviteGallery
                    title={"Du lädst zu folgenden Weltkarten ein:"}
                    worldMapInvites={worldMapInvitesToUser}
                    getWorldMap={props.getWorldMap}
                    appUsers={props.appUsers}
                    deleteWorldMapInvite={props.deleteWorldMapInvite}
                />
                <WorldMapInviteGallery
                    title={"Du wurdest zu folgenden Weltkarten eingeladen:"}
                    worldMapInvites={worldMapInvitesFromUser}
                    getWorldMap={props.getWorldMap}
                    appUsers={props.appUsers}
                    deleteWorldMapInvite={props.deleteWorldMapInvite}
                />
            </div>
        </div>
    )
}
