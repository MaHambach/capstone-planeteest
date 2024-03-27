import './MapMarker.css';
import React from "react";
import {BsFillGearFill} from "react-icons/bs";


type MapMarkerProps = {
    name: string;
    toggleAddNewMapMarker: (event:React.MouseEvent<HTMLElement>) => void;
}

export default function MapMarker(props:Readonly<MapMarkerProps>):React.ReactElement {

    return (
        <button className={"worldMapToolBarEntry"} onClick={props.toggleAddNewMapMarker}>
            <BsFillGearFill />
        </button>
    )
}