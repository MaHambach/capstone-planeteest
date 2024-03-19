import {MapMarker} from "../../../types/MapMarker.ts";
import mapMarkerIcon from "../../../assets/Settings.webp";
import React from "react";

type MapMarkerCardProps = {
    mapMarker: MapMarker;
    coordinates: {xPosition:number, yPosition:number};
}

export default function MapMarkerCard(props: Readonly<MapMarkerCardProps>): React.ReactElement {
    const [cardSize, setCardSize] = React.useState({xSize: 0, ySize: 0});

    const img = new Image();

    img.src = mapMarkerIcon;
    img.onload = () =>{
        setCardSize({xSize: img.width, ySize: img.height});
    }

    return (
        <img
            className={"mapMarkerCard"}
            style={{
                position:"absolute",
                left: props.coordinates.xPosition - 0.5 * cardSize.xSize,
                top: props.coordinates.yPosition - 0.5 * cardSize.ySize
            }}
            src={mapMarkerIcon}
            alt={props.mapMarker.name}
        />
    )
}
