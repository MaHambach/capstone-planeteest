import {MapMarker} from "../../../types/MapMarker.ts";
import icon from "./Settings.webp";
import React from "react";

type MapMarkerCardProps = {
    mapMarker: MapMarker;
}

export default function MapMarkerCard(props: Readonly<MapMarkerCardProps>): React.ReactElement {

    return (
        <img
            className={"mapMarkerCard"}
            style={{
                position:"absolute",
                left: props.mapMarker.xPosition,
                top: props.mapMarker.yPosition
            }}
            src={icon}
            alt={props.mapMarker.name}
        />
    )
}
