import {useState} from "react";
import {WorldMapInvite} from "../types/WorldMapInvite.ts";
import axios from "axios";
import {WorldMapInviteDto} from "../types/WorldMapInviteDto.ts";
import {AppUserMinimal} from "../types/AppUserMinimal.ts";
import {AppUser} from "../types/AppUser.ts";

export default function useWorldMapInvite() {
    const [worldMapInvites, setWorldMapInvites] = useState<WorldMapInvite[]>([]);

    // REST API calls
    function fetchWorldMapInvites():void {
        axios.get('/api/worldMapInvites')
            .then(response => {
                setWorldMapInvites(response.data);
            })
            .catch(error => {
                console.error("Es gab ein Problem beim Abrufen der Weltkarten:", error.message);
            });
    }

    function fetchAllPossibleInviteesForWorldMap(setPossibleObserver:(possibleObserver:AppUserMinimal[]) => void, worldMapId:string):void {
        axios.get("/api/worldMapInvites/possibleInvitees/" + worldMapId)
            .then(response => {
                setPossibleObserver(response.data.map((appUser:AppUser):AppUserMinimal => ({id: appUser.id, username: appUser.username})));
            })
            .catch(e => {
                console.error(e);
            });
    }

    function saveWorldMapInvite(newWorldMapInviteDto:WorldMapInviteDto):void {
        axios.post('/api/worldMapInvites', newWorldMapInviteDto)
            .then((response) => {
                console.log("New world map invite added with id " + response.data.id + ".");
                fetchWorldMapInvites();
            })
            .catch(error => {
                console.error("Error creating world map invite: ", error.message);
            })
    }

    function acceptWorldMapInvite(worldMapInviteId:string):void {
        axios.post("/api/worldMapInvites/" + worldMapInviteId + "/accept")
            .then(fetchWorldMapInvites)
            .catch(e => {
                console.error(e);
            });
    }

    function deleteWorldMapInvite(worldMapInviteId:string):void{
        axios.delete(`/api/worldMapInvites/${worldMapInviteId}`)
            .then(fetchWorldMapInvites)
            .catch(error => {
                console.log(error)
            });
    }

    return {
        worldMapInvites,

        acceptWorldMapInvite,
        fetchWorldMapInvites,
        fetchAllPossibleInviteesForWorldMap,
        saveWorldMapInvite,
        deleteWorldMapInvite,
    }
}
