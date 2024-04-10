import {AppUser} from "../../../types/AppUser.ts";
import {WorldMap} from "../../../types/WorldMap.ts";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import React from "react";
import WorldMapInviteGallery from "../../worldMapInvite/part/WorldMapInviteGallery.tsx";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import {useNavigate} from "react-router-dom";

type UserDetailsProps = {
    appUser: AppUser;
    appUsers: AppUserMinimal[];
    getWorldMap: (id: string) => WorldMap;
    fetchAllWorldMapInvitesToUser: (setWorldMapInvitesToUser:(worldMapInvite:WorldMapInvite[]) => void) => void;
    fetchAllWorldMapInvitesFromUser: (setWorldMapInvitesFromUser:(worldMapInvite:WorldMapInvite[]) => void) => void;
    deleteWorldMapInvite: (worldMapInviteId: string) => void;
    acceptWorldMapInvite: (worldMapInviteId: string) => void;
}
export default function UserDetails(props:Readonly<UserDetailsProps>):React.ReactElement {
    const navigate = useNavigate();

    return (
        <div>
            {props.appUser.username}
            <button onClick={() => navigate("/")}>Zur Gallery</button>
            <div>
                <WorldMapInviteGallery
                    title={"Du lädst zu folgenden Weltkarten ein:"}
                    appUsers={props.appUsers}
                    invitesType={"FromUser"}
                />
                <WorldMapInviteGallery
                    title={"Du wurdest zu folgenden Weltkarten eingeladen:"}
                    appUsers={props.appUsers}
                    invitesType={"ToUser"}
                />
            </div>
        </div>
    )
}
