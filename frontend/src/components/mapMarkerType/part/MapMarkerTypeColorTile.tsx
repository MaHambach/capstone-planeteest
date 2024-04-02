import './MapMarkerTypeColorTile.css';
import React from "react";

type MapMarkerTypeColorTileProps = {
    color: string;
    setColor: (color:string) => void;
    tileSize: number;
}
export default function MapMarkerTypeColorTile(props:Readonly<MapMarkerTypeColorTileProps>): React.ReactElement {
    const colorTileStyle = {
        backgroundColor: props.color,
        width: props.tileSize,
        height: props.tileSize
    };

    function handleClick(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        props.setColor(props.color);
    }

    return (
        <button className={"mapMarkerTypeColorTile"} style={colorTileStyle} onClick={handleClick}/>
    );
}