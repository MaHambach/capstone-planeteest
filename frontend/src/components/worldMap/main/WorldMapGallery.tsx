import "./WorldMapGallery.css";
import React from "react";
import {WorldMap} from "../../../types/WorldMap.ts";
import DisplayTileGallery from "../../_generic/parts/DisplayTileGallery.tsx";
import {AppUser} from "../../../types/AppUser.ts";
import {useNavigate} from "react-router-dom";


type WorldMapGalleryProps = {
    appUser: AppUser;
    worldMaps: WorldMap[];
    logoutAppUser: () => void;
}
export default function WorldMapGallery(props:Readonly<WorldMapGalleryProps>):React.ReactElement {
    const navigate = useNavigate();

    return (
        <main className={"worldMapGallery"}>
            <button onClick={props.logoutAppUser}>Logout</button>
            {props.appUser.role === "ADMIN" && <button onClick={() => {navigate("/mapMarkerType")}}>MapMarkerTypes</button>}
            <h2>Meine Weltkarten</h2>
            <DisplayTileGallery
                urlPrefix={"/worldmap/"}
                tileData={props.worldMaps
                    .filter((worldMap:WorldMap) => props.appUser.myWorldMapIds.includes(worldMap.id))
                    .map((worldMap:WorldMap) => ({id:worldMap.id, name:worldMap.name}))}
                addNewName={"Neue Weltkarte"}
                addNewUrl={"/worldmap/add"}
                tileSize={220}
                color={"#FFFFFF"}
            />
            <h2>Beobachtete Weltkarten</h2>
            <DisplayTileGallery
                urlPrefix={"/worldmap/"}
                tileData={props.worldMaps
                    .filter((worldMap:WorldMap) => props.appUser.observedWorldMapIds.includes(worldMap.id))
                    .map((worldMap:WorldMap) => ({id:worldMap.id, name:worldMap.name}))}
                addNewName={"Neue Weltkarte"}
                addNewUrl={"/worldmap/add"}
                tileSize={220}
                color={"#FFFFFF"}
            />
        </main>
    )
}
