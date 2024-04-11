import "./WorldMapGallery.css";
import React from "react";
import {emptyWorldMap, WorldMap} from "../../../types/WorldMap.ts";
import DisplayTileGallery from "../../_generic/parts/DisplayTileGallery.tsx";
import {AppUser} from "../../../types/AppUser.ts";

type Data = {
    appUser: AppUser;
    worldMaps: WorldMap[];
}
type Props = {
    observedWorldMapIds: string[];
}

type WorldMapGalleryProps = {
    data: Data,
    props: Props,
}
export default function WorldMapGallery({data, props}:Readonly<WorldMapGalleryProps>):React.ReactElement {

    function getWorldMapById(worldMapId: string): WorldMap {
        const worldMapWithId: WorldMap | undefined = data.worldMaps.find((worldMap: WorldMap) => worldMap.id === worldMapId);

        if (worldMapWithId) return worldMapWithId;

        console.error("WorldMap with id " + worldMapId + " not found.")
        return emptyWorldMap;
    }

    return (
        <main className={"worldMapGallery"}>
            <h2>Meine Weltkarten</h2>
            <DisplayTileGallery
                urlPrefix={"/worldmap/"}
                tileData={data.worldMaps
                    .filter((worldMap: WorldMap) => data.appUser.myWorldMapIds.includes(worldMap.id))
                    .map((worldMap: WorldMap) => ({id: worldMap.id, name: worldMap.name}))}
                addNewName={"Neue Weltkarte"}
                addNewUrl={"/worldmap/add"}
                tileSize={220}
                color={"#FFFFFF"}
                updateUrlPrefix={"/worldmap/"}
                updateUrlSuffix={"/edit"}
            />
            <h2>Beobachtete Weltkarten</h2>
            <DisplayTileGallery
                urlPrefix={"/worldmap/"}
                tileData={
                    props.observedWorldMapIds.map((worldMapId: string) => getWorldMapById(worldMapId))
                        .map((worldMap: WorldMap) => ({id: worldMap.id, name: worldMap.name}))}
                addNewName={"Neue Weltkarte"}
                addNewUrl={"/worldmap/add"}
                tileSize={220}
                color={"#FFFFFF"}
                cantAddNew={true}
            />
        </main>
    )
}
