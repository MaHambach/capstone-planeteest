import {WorldMap} from "../../../types/WorldMap.ts";
import React, {useState} from "react";
import AddMapMarkerForm from "../../mapMarker/parts/AddMapMarkerForm.tsx";
import {MapMarkerDto} from "../../../types/MapMarkerDto.ts";

type WorldMapImageProps = {
    worldMap: WorldMap;
    addNewMapMarker: boolean;
    saveMapMarker: (mapMarkerDto:MapMarkerDto) => void;
    setArticleIsVisible: (b:boolean) => void;
}
export default function WorldMapImage(props: Readonly<WorldMapImageProps>): React.ReactElement {
    const [coordinates, setCoordinates] = useState({xPosition:0, yPosition:0});
    function worldMapClick(e: React.MouseEvent):void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const rect = e.target.getBoundingClientRect();
        props.setArticleIsVisible(false);
        if(props.addNewMapMarker){
            setCoordinates({xPosition: e.clientX - rect.left, yPosition: e.clientY - rect.top});
        }
        console.log("Left? : " + (e.clientX - rect.left) + " ; Top? : " + (e.clientY - rect.top) + ".");
    }

    return (
        <div className={"worldMapImage"}>
            <img
                onClick={worldMapClick}
                role={"presentation"} /* Suppresses sonarLint protests. */
                src={props.worldMap.worldMapUrl}
                alt={props.worldMap.name}
            />
            {props.addNewMapMarker && <AddMapMarkerForm
                saveMapMarker={props.saveMapMarker}
                worldMapId={props.worldMap.id}
                xPosition={coordinates.xPosition}
                yPosition={coordinates.yPosition}
                markerTypeId={''} /* For later: When MarkerType is implemented */
            />}
        </div>
    )
}
