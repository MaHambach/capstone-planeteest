import {MapMarker} from "../../../types/MapMarker.ts";
import React from "react";

type UpdateMapMarkerCardProps = {
    mapMarker: MapMarker;
    updateMapMarker: (mapMarker: MapMarker) => void;
    closeMapMarkerCard: () => void;
}
export default function UpdateMapMarkerCard(props:Readonly<UpdateMapMarkerCardProps>):React.ReactElement {

    return (
        <div>
            {props.mapMarker.name}
        </div>
    )
}