import {MapMarker} from "../../../types/MapMarker.ts";
import mapMarkerIcon from "../../../assets/Settings.webp";
import React, {useState} from "react";

type MapMarkerCardProps = {
    mapMarker: MapMarker;
}

export default function MapMarkerCard(props: Readonly<MapMarkerCardProps>): React.ReactElement {
    const [cardSize, setCardSize] = React.useState({xSize: 0, ySize: 0});
    const [visibilityEdit, setVisibilityEdit] = useState<boolean>(false);


    const img = new Image();

    img.src = mapMarkerIcon;
    img.onload = () =>{
        setCardSize({xSize: img.width, ySize: img.height});
    }

    function mapMarkerClick(event:React.MouseEvent<HTMLElement>) :void{
        event.preventDefault();
        setVisibilityEdit(!visibilityEdit);
    }

    return (
        <img
            onClick={mapMarkerClick}
            role={"presentation"} /* Suppresses sonarLint protests. */
            className={"mapMarkerCard"}
            style={{
                position:"absolute",
                left: props.mapMarker.xPosition - 0.5 * cardSize.xSize, /* Might depend on MapMarkerType */
                top: props.mapMarker.yPosition - 0.5 * cardSize.ySize   /* Might depend on MapMarkerType */
            }}
            src={mapMarkerIcon}
            alt={props.mapMarker.name}

        />
    )
}
