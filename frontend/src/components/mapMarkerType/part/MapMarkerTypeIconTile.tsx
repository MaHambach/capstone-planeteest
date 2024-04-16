import './MapMarkerTypeIconTile.css';
import MapMarkerTypeIcon from "./MapMarkerTypeIcon.tsx";
import React from "react";

type MapMarkerTypeIconTileProps = {
    iconName: string;
    handleClick: (iconName:string) => void;
    shadowColor?: string;
    tileSize: number;
}
export default function MapMarkerTypeIconTile(props: Readonly<MapMarkerTypeIconTileProps>): React.ReactElement {
    function handleClick(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        props.handleClick(props.iconName);
    }

    return (
        <button className={"mapMarkerTypeIconTile"}
                onClick={handleClick}
                style={{width: props.tileSize, height: props.tileSize}}
        >
            <MapMarkerTypeIcon iconName={props.iconName} color={props.shadowColor} tileSize={props.tileSize/2}/>
        </button>
    );
}
