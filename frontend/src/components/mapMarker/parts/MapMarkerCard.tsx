import {MapMarker} from "../../../types/MapMarker.ts";
import mapMarkerIcon from "../../../assets/Settings.webp";
import React from "react";

type MapMarkerCardProps = {
    mapMarker: MapMarker;
    handleArticleChange: (articleId:string) => void;
    offsetWorldMapFrame: {xOffset:number, yOffset:number};
}

export default function MapMarkerCard(props: Readonly<MapMarkerCardProps>): React.ReactElement {
    const [cardSize, setCardSize] = React.useState({xSize: 0, ySize: 0});

    const img = new Image();

    img.src = mapMarkerIcon;
    img.onload = () =>{
        setCardSize({xSize: img.width, ySize: img.height});
    }

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        props.handleArticleChange(props.mapMarker.articleId);
    }

    return (
        <img
            onClick={handleClick}
            role={"presentation"} /* Suppresses sonarLint protests. */
            className={"mapMarkerCard"}
            style={{
                position:"absolute",
                left: props.offsetWorldMapFrame.xOffset + props.mapMarker.xPosition - 0.5 * cardSize.xSize, /* Might depend on MapMarkerType */
                top: props.offsetWorldMapFrame.yOffset + props.mapMarker.yPosition - 0.5 * cardSize.ySize   /* Might depend on MapMarkerType */
            }}
            src={mapMarkerIcon}
            alt={props.mapMarker.name}
        />
    )
}
