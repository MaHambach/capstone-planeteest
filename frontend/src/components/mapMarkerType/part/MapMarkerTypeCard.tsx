import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import React from "react";
import MapMarkerTypeIcon from "./MapMarkerTypeIcon.tsx";

type MapMarkerTypeCardProps = {
    mapMarkerType: MapMarkerType;
    tileSize: number;
}
export default function MapMarkerTypeCard(props: Readonly<MapMarkerTypeCardProps>): React.ReactElement {
    return (
        <MapMarkerTypeIcon
            iconName={props.mapMarkerType.icon}
            color={props.mapMarkerType.color}
            tileSize={props.tileSize}
        />
    )
}
