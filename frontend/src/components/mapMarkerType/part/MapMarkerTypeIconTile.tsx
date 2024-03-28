import './MapMarkerTypeIconTile.css';
import MapMarkerTypeIcon from "./MapMarkerTypeIcon.tsx";
import React from "react";

type MapMarkerTypeIconTileProps = {
    iconName: string;
    handleClick: (iconName:string) => void;
    borderColor: string;
    tileSize: number;
}
export default function MapMarkerTypeIconTile(props: Readonly<MapMarkerTypeIconTileProps>): React.ReactElement {
    function handleClick(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        props.handleClick(props.iconName);
    }

    return (
        <button className={"mapMarkerTypeIconTile"} onClick={handleClick}>
            <MapMarkerTypeIcon iconName={props.iconName} color={props.borderColor} tileSize={props.tileSize}/>
        </button>
    );
}