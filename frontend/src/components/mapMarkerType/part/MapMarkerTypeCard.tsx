import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import React from "react";
import MapMarkerTypeIcon from "./MapMarkerTypeIcon.tsx";

type MapMarkerTypeCardProps = {
    mapMarkerType: MapMarkerType;
    tileSize: number;
    navigationFunction: (mapMarkerType:MapMarkerType) => void;
}
export default function MapMarkerTypeCard(props: Readonly<MapMarkerTypeCardProps>): React.ReactElement {
    function handleClick(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        props.navigationFunction(props.mapMarkerType);
    }

    return (
        <button
            className={"mapMarkerTypeGalleryTile"}
            onClick={handleClick}
            title={props.mapMarkerType.name}
        >
            <MapMarkerTypeIcon
                iconName={props.mapMarkerType.icon}
                color={props.mapMarkerType.color}
                tileSize={props.tileSize}
            />
        </button>
    )
}
