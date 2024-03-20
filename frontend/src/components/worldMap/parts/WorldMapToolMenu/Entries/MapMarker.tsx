import './MapMarker.css';
import React, {useState} from "react";
import {MapMarkerDto} from "../../../../../types/MapMarkerDto.ts";


type MapMarkerProps = {
    name: string;
    saveMapMarker: (mapMarkerDto:MapMarkerDto) => void;
}

export default function MapMarker(props:Readonly<MapMarkerProps>):React.ReactElement {
    const [placeMapMarker, setPlaceMapMarker] = useState<boolean>(false)

    function toggleDisplayMapMarkerTypes(event) {
        event.preventDefault();
        setPlaceMapMarker(!placeMapMarker);
    }

    return (
        <button className={"worldMapToolBarEntry"} onClick={toggleDisplayMapMarkerTypes}>
            <p>{props.name}</p>
        </button>
    )
}