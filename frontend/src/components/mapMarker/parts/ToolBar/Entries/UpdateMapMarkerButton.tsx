import './UpdateMapMarkerButton.css';
import {MapMarker} from "../../../../../types/MapMarker.ts";
import React from "react";


type UpdateMapMarkerButtonProps = {
    mapMarker: MapMarker;
}
export default function UpdateMapMarkerButton(props:Readonly<UpdateMapMarkerButtonProps>):React.ReactElement {

    function handleClick(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        console.log("Update MapMarker with id: " + props.mapMarker.id);
    }

    return (
        <button className={"updateMapMarkerButton"}
                onClick={handleClick}>
            X
        </button>
    )
}