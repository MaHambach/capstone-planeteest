import './MapMarker.css';
import React from "react";
import {BsGeoFill} from "react-icons/bs";
import {Button} from "@mui/material";


type MapMarkerProps = {
    toggleAddNewMapMarker: (event:React.MouseEvent<HTMLElement>) => void;
    addNewMapMarker: boolean;
}

export default function MapMarker(props:Readonly<MapMarkerProps>):React.ReactElement {

    return (
        <Button
            className={props.addNewMapMarker ? "worldMapToolBarEntry_selected" : "worldMapToolBarEntry"}
            onClick={props.toggleAddNewMapMarker}
        >
            <BsGeoFill />
        </Button>
    )
}
