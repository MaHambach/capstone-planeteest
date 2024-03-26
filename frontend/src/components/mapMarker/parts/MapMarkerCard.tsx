import './MapMarkerCard.css'
import {MapMarker} from "../../../types/MapMarker.ts";
import React, {useEffect, useMemo, useState} from "react";
import ToolBar from "./ToolBar/ToolBar.tsx";
import {BsGeoAltFill} from "react-icons/bs";
import {IconContext} from "react-icons";
import Draggable from "react-draggable";


type MapMarkerCardProps = {
    mapMarker: MapMarker;
    offsetWorldMapFrame: {xOffset:number, yOffset:number};
    isSelected:boolean;
    isMoveAble:boolean;
    handleSelectedMapMarkerChange: (mapMarker:MapMarker) => void;
    handleUpdateMapMarker: () => void;
    setShowArticle: (showArticle:boolean) => void;
}

export default function MapMarkerCard(props: Readonly<MapMarkerCardProps>): React.ReactElement {
    const mapIconSize={xSize: 80, ySize: 80};
    const iconContextObj = useMemo(() => ({className: 'mapMarkerIcon'}), []); // value is cached by useMemo
    const [coordinates, setCoordinates] = useState({xPosition: 0, yPosition: 0});

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        props.handleSelectedMapMarkerChange(props.mapMarker);
    }

    useEffect(() => {
        const yOffset:number = props.isSelected ? 34 : 0 ;
        setCoordinates({
            xPosition: props.mapMarker.xPosition + props.offsetWorldMapFrame.xOffset - 0.5 * mapIconSize.xSize,
            yPosition: props.mapMarker.yPosition + props.offsetWorldMapFrame.yOffset - 0.5 * mapIconSize.ySize - yOffset
        });
        // eslint-disable-next-line
    }, [props]);

    return (
        <Draggable>
            <div className={"mapMarkerCard"} style={{
                position:"absolute",
                left: coordinates.xPosition, /* Might depend on MapMarkerType */
                top: coordinates.yPosition   /* Might depend on MapMarkerType */
            }}>
                {props.isSelected && <h2 className={"mapMarkerName"}> {props.mapMarker.name} </h2>}

                <IconContext.Provider value={iconContextObj}>
                    <button className={props.isSelected ? "mapMarkerCardImageSelected" : "mapMarkerCardImage"}
                         onClick={handleClick}
                         >
                        <BsGeoAltFill />
                    </button>
                </IconContext.Provider>

                {props.isSelected && <ToolBar handleUpdateMapMarker={props.handleUpdateMapMarker} setShowArticle={props.setShowArticle}/>}
            </div>
        </Draggable>
    )
}
