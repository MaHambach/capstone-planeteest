import {AppUser} from "../../../types/AppUser.ts";
import React from "react";
import WorldMapInviteGallery from "../../worldMapInvite/part/WorldMapInviteGallery.tsx";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import {useNavigate} from "react-router-dom";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import {WorldMap} from "../../../types/WorldMap.ts";

type UserDetailsProps = {
    // Data
    appUser: AppUser;
    appUsers: AppUserMinimal[];
    worldMapInvites: WorldMapInvite[];
    worldMaps: WorldMap[];

    // Functions
    acceptWorldMapInvite: (id:string) => void;
    deleteWorldMapInvite: (id:string) => void;
}
export default function UserDetails(props:Readonly<UserDetailsProps>):React.ReactElement {
    const navigate = useNavigate();

    return (
        <div>
            {props.appUser.username}
            <button onClick={() => navigate("/")}>Zur Gallery</button>
            <div>
                <WorldMapInviteGallery
                    appUser={props.appUser}
                    appUsers={props.appUsers}
                    worldMapInvites={props.worldMapInvites}
                    worldMaps={props.worldMaps}
                    title={"Du lädst zu folgenden Weltkarten ein:"}
                    invitesType={"FromUser"}
                    acceptWorldMapInvite={props.acceptWorldMapInvite}
                    deleteWorldMapInvite={props.deleteWorldMapInvite}
                />
                <WorldMapInviteGallery
                    appUser={props.appUser}
                    appUsers={props.appUsers}
                    worldMapInvites={props.worldMapInvites}
                    worldMaps={props.worldMaps}
                    title={"Du wurdest zu folgenden Weltkarten eingeladen:"}
                    invitesType={"ToUser"}
                    acceptWorldMapInvite={props.acceptWorldMapInvite}
                    deleteWorldMapInvite={props.deleteWorldMapInvite}
                />
            </div>
        </div>
    )
}
