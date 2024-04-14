import './MapMarkerIcon.css';
import React from "react";
import MapMarkerTypeIcon from "../../../mapMarkerType/part/MapMarkerTypeIcon.tsx";
import {MapMarkerType} from "../../../../types/MapMarkerType.ts";


type MapMarkerIconProps = {
    isSelected:boolean;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
    mapMarkerType: MapMarkerType;
}
export default function MapMarkerIcon(props: Readonly<MapMarkerIconProps>): React.ReactElement {
    const isSelectedStyle = {
        filter: "drop-shadow(0 0 4px " + props.mapMarkerType.color + ")",
        "borderRadius": "50px",
        "boxShadow": "inset 0 0 10px " + props.mapMarkerType.color,
        "zIndex": "20"
    }

    return (
            <button className={"mapMarkerIconButton"}
                    {...props.isSelected ? {style: isSelectedStyle} : {}}
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
