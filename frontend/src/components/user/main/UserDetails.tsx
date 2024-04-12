import {AppUser} from "../../../types/AppUser.ts";
import React from "react";
import WorldMapInviteGallery from "../../worldMapInvite/part/WorldMapInviteGallery.tsx";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import {WorldMap} from "../../../types/WorldMap.ts";

type Data = {
    appUser: AppUser;
    appUsers: AppUserMinimal[];
    worldMapInvites: WorldMapInvite[];
    worldMaps: WorldMap[];
}
type Functions = {
    acceptWorldMapInvite: (id:string) => void;
    deleteWorldMapInvite: (id:string) => void;
}
type UserDetailsProps = {
    data: Data;
    functions: Functions;
}
export default function UserDetails({data, functions}:Readonly<UserDetailsProps>):React.ReactElement {

    return (
        <main>
            {data.appUser.username}
            <div>
                <WorldMapInviteGallery
                    props={{
                        title: "Du lädst zu folgenden Weltkarten ein:",
                        invitesType: "FromUser"
                }}
                    data={data}
                    functions={functions}
                />
                <WorldMapInviteGallery
                    props={{
                        title: "Du wurdest von folgenden Nutzern zu Weltkarten eingeladen:",
                        invitesType: "ToUser"
                }}
                    data={data}
                    functions={functions}
                />
            </div>
        </main>
    )
}
