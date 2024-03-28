import './MapMarkerIcon.css';
import React from "react";
import MapMarkerTypeIcon from "../../mapMarkerType/part/MapMarkerTypeIcon.tsx";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";


type MapMarkerIconProps = {
    isSelected:boolean;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
    mapMarkerType: MapMarkerType;
}
export default function MapMarkerIcon(props: Readonly<MapMarkerIconProps>): React.ReactElement {

    return (
            <button className={props.isSelected ? "mapMarkerIconButtonSelected" : "mapMarkerIconButton"}
                    onClick={props.handleClick}
            >
                <MapMarkerTypeIcon
                    iconName={props.mapMarkerType.icon}
                    color={props.mapMarkerType.color}
                    tileSize={32}
                />
            </button>
    )
}
