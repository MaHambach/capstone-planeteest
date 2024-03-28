import './MapMarker.css';
import React from "react";
import {BsGeoFill} from "react-icons/bs";


type MapMarkerProps = {
    name: string;
    toggleAddNewMapMarker: (event:React.MouseEvent<HTMLElement>) => void;
    addNewMapMarker: boolean;
}

export default function MapMarker(props:Readonly<MapMarkerProps>):React.ReactElement {

    return (
        <button
            className={props.addNewMapMarker ? "worldMapToolBarEntry_selected" : "worldMapToolBarEntry"}
            onClick={props.toggleAddNewMapMarker}>
            <BsGeoFill />
        </button>
    )
}