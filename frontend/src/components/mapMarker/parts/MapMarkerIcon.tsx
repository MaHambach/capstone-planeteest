import './MapMarkerIcon.css';
import {BsGeoAltFill} from "react-icons/bs";
import React from "react";


type MapMarkerIconProps = {
    isSelected:boolean;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}
export default function MapMarkerIcon(props: Readonly<MapMarkerIconProps>): React.ReactElement {

    return (
            <button className={props.isSelected ? "mapMarkerIconButtonSelected" : "mapMarkerIconButton"}
                    onClick={props.handleClick}
            >
                <BsGeoAltFill />
            </button>
    )
}