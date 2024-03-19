import "./WorldMapGallery.css";
import React from "react";
import {WorldMap} from "../../../types/WorldMap.ts";
import DisplayTileGallery from "../../parts/DisplayTileGallery.tsx";


type WorldMapGalleryProps = {
    worldMaps: WorldMap[];
}
export default function WorldMapGallery(props:Readonly<WorldMapGalleryProps>):React.ReactElement {
    return (
        <div className={"worldMapGallery"}>
            <DisplayTileGallery
                urlPrefix={"/worldmap/"}
                tileData={props.worldMaps.map((worldMap:WorldMap) => ({id:worldMap.id, name:worldMap.name, }))}
                addNewName={"Neue Weltkarte"}
                addNewUrl={"/worldmap/new"}
            />
        </div>
    )
}
