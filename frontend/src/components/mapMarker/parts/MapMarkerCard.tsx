import './MapMarkerCard.css'
import {MapMarker} from "../../../types/MapMarker.ts";
import mapMarkerIcon from "../../../assets/Settings.webp";
import React from "react";
import ToolBar from "./ToolBar/ToolBar.tsx";

type MapMarkerCardProps = {
    mapMarker: MapMarker;
    handleArticleChange: (articleId:string) => void;
    offsetWorldMapFrame: {xOffset:number, yOffset:number};
    isSelected:boolean;
    setSelectedMapMarker: (mapMarkerId:string) => void;
}

export default function MapMarkerCard(props: Readonly<MapMarkerCardProps>): React.ReactElement {
    const [mapIconSize, setMapIconSize] = React.useState({xSize: 0, ySize: 0});

    const img = new Image();

    img.src = mapMarkerIcon;
    img.onload = () =>{
        setMapIconSize({xSize: img.width, ySize: img.height});
    }

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        props.handleArticleChange(props.mapMarker.articleId);
        props.setSelectedMapMarker(props.mapMarker.id);
    }

    return (
        <div className={"mapMarkerCard"}>
            {props.isSelected &&
                <h2
                    className={"mapMarkerName"}
                    style={{
                        position:"absolute",
                        left: (props.offsetWorldMapFrame.xOffset + props.mapMarker.xPosition - 0.5 * mapIconSize.xSize), /* Might depend on MapMarkerType */
                        top: (props.offsetWorldMapFrame.yOffset + props.mapMarker.yPosition - mapIconSize.ySize -5) /* Might depend on MapMarkerType */
                }}>
                    {props.mapMarker.name}
                </h2>
            }
            <img
                className={props.isSelected ? "mapMarkerCardImageSelected" : "mapMarkerCardImage"}
                onClick={handleClick}
                role={"presentation"} /* Suppresses sonarLint protests. */
                style={{
                    position:"absolute",
                    left: props.offsetWorldMapFrame.xOffset + props.mapMarker.xPosition - 0.5 * mapIconSize.xSize, /* Might depend on MapMarkerType */
                    top: props.offsetWorldMapFrame.yOffset + props.mapMarker.yPosition - 0.5 * mapIconSize.ySize   /* Might depend on MapMarkerType */
                }}
                src={mapMarkerIcon}
                alt={props.mapMarker.name}
            />
            {props.isSelected &&
                <ToolBar mapMarker={props.mapMarker}
                         offsetMapMarkerCard={mapIconSize}
            />}
        </div>
    )
}
