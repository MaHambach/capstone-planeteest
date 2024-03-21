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

const initialCoordinates = {
    xPosition: -10,
    yPosition: -10
}
export default function WorldMapImage(props: Readonly<WorldMapImageProps>): React.ReactElement {
    const [coordinates, setCoordinates] = useState(initialCoordinates);
    function worldMapClick(event: React.MouseEvent<HTMLElement>):void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const rect = event.target.getBoundingClientRect();
        props.setArticleIsVisible(false);
        if(props.addNewMapMarker){
            setCoordinates({xPosition: (event.clientX - rect.left), yPosition: (event.clientY - rect.top)});
        }
        console.log("Left? : " + (event.clientX - rect.left) + " ; Top? : " + (event.clientY - rect.top) + ".");
    }

    return (
        <div className={"worldMapImage"}>
            <img
                onClick={worldMapClick}
                role={"presentation"} /* Suppresses sonarLint protests. */
                src={props.worldMap.worldMapUrl}
                alt={props.worldMap.name}
            />
            {(props.addNewMapMarker && coordinates.xPosition > 0 && coordinates.yPosition > 0) &&
                <AddMapMarkerForm
                    saveMapMarker={props.saveMapMarker}
                    worldMapId={props.worldMap.id}
                    xPosition={coordinates.xPosition}
                    yPosition={coordinates.yPosition}
                    markerTypeId={''} /* For later: When MarkerType is implemented */
            />}
        </div>
    )
}
