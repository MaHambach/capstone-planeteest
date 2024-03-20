import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {WorldMap} from "../../../types/WorldMap.ts";
import WorldMapImage from "../parts/WorldMapImage.tsx";
import {MapMarker} from "../../../types/MapMarker.ts";
import MapMarkerCard from "../../mapMarker/parts/MapMarkerCard.tsx";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import ToolBar from "../parts/WorldMapToolMenu/ToolBar.tsx";
import {MapMarkerDto} from "../../../types/MapMarkerDto.ts";

type WorldMapMainProps = {
    getWorldMap: (id:string) => WorldMap;
    getMapMarkerType: (id:string) => MapMarkerType;
    mapMarkers: MapMarker[];
    saveMapMarker: (mapMarkerDto:MapMarkerDto) => void;
}

export default function WorldMapMain(props:Readonly<WorldMapMainProps>):React.ReactElement{
    const {id= ''} = useParams<string>();
    const [worldMap, setWorldMap] = useState<WorldMap>();
    const [coordinates, setCoordinates] = useState({xPosition:0, yPosition:0});

    useEffect(() => setWorldMap(props.getWorldMap(id)), [id, props]);

    function worldMapClick(e: React.MouseEvent):void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const rect = e.target.getBoundingClientRect();
        setCoordinates({xPosition: e.clientX - rect.left, yPosition: e.clientY - rect.top});
        console.log("Left? : " + (e.clientX - rect.left) + " ; Top? : " + (e.clientY - rect.top) + ".");
    }

    return (
        <main className={"worldMapMain"}>
            <ToolBar />
            <WorldMapImage worldMap={worldMap} worldMapClick={worldMapClick}/>
            {props.mapMarkers.map((mapMarker:MapMarker) => {
                return <MapMarkerCard key={mapMarker.id} mapMarker={mapMarker} coordinates={coordinates}/>
            })}
        </main>
    )
}