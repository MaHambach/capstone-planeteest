import './MapMarker.css';
import React from "react";


type MapMarkerProps = {
    name: string;
    toggleAddNewMapMarker: (event:React.MouseEvent<HTMLElement>) => void;
}

export default function MapMarker(props:Readonly<MapMarkerProps>):React.ReactElement {

    return (
        <button className={"worldMapToolBarEntry"} onClick={props.toggleAddNewMapMarker}>
            <p>{props.name}</p>
        </button>
    )
}