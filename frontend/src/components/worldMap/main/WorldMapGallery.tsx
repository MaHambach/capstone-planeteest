import "./WorldMapGallery.css";
import React from "react";
import {WorldMap} from "../../../types/WorldMap.ts";
import DisplayTileGallery from "../../_generic/parts/DisplayTileGallery.tsx";


type WorldMapGalleryProps = {
    worldMaps: WorldMap[];
}
export default function WorldMapGallery(props:Readonly<WorldMapGalleryProps>):React.ReactElement {
    return (
        <main className={"worldMapGallery"}>
            <DisplayTileGallery
                urlPrefix={"/worldmap/"}
                tileData={props.worldMaps.map((worldMap:WorldMap) => ({id:worldMap.id, name:worldMap.name}))}
                addNewName={"Neue Weltkarte"}
                addNewUrl={"/worldmap/add"}
                tileSize={220}
                color={"#FFFFFF"}
            />
        </main>
    )
}
