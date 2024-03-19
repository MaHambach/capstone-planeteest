import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {WorldMap} from "../../../types/WorldMap.ts";
import WorldMapImage from "../parts/WorldMapImage.tsx";
import {MapMarker} from "../../../types/MapMarker.ts";
import MapMarkerCard from "../../mapMarker/parts/MapMarkerCard.tsx";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";

type WorldMapMainProps = {
    getWorldMap: (id:string) => WorldMap;
    getMapMarkerType: (id:string) => MapMarkerType;
    mapMarkers: MapMarker[];
}

export default function WorldMapMain(props:Readonly<WorldMapMainProps>):React.ReactElement{
    const {id= ''} = useParams<string>();
    const [worldMap, setWorldMap] = useState<WorldMap>();

    useEffect(() => setWorldMap(props.getWorldMap(id)), [id, props]);

    function worldMapClick(e: React.MouseEvent):void {
        console.log("World map clicked at x: " + e.nativeEvent.offsetX + ", y: " + e.nativeEvent.offsetY);

    }

    return (
        <main className={"worldMapMain"}>
            <WorldMapImage worldMap={worldMap} worldMapClick={worldMapClick}/>
            {props.mapMarkers.map((mapMarker:MapMarker) => {
                return <MapMarkerCard key={mapMarker.id} mapMarker={mapMarker} />
            })}
        </main>
    )
}