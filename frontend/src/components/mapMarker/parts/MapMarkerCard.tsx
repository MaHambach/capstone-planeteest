import './MapMarkerCard.css'
import {MapMarker} from "../../../types/MapMarker.ts";
import React, {useEffect, useState} from "react";
import ToolBar from "./ToolBar/ToolBar.tsx";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import MapMarkerIcon from "./MapMarkerIcon.tsx";


type MapMarkerCardProps = {
    mapMarker: MapMarker;
    offsetWorldMapFrame: {xOffset:number, yOffset:number};
    isSelected:boolean;
    isMovable:boolean;
    handleArticleFrame: () => void;
    handleMapMarkerUpdate: () => void;
    handleSelectedMapMarkerChange: (mapMarker:MapMarker) => void;
    setSelectedMapMarker: (mapMarker:MapMarker) => void;
}

export default function MapMarkerCard(props: Readonly<MapMarkerCardProps>): React.ReactElement {
    const mapMarkerSize={xSize: 80, ySize: 80};
    const [coordinates, setCoordinates] = useState({xPosition: 0, yPosition: 0});

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        if(!props.isMovable) props.handleSelectedMapMarkerChange(props.mapMarker);
    }

    useEffect(() => {
        const yOffset:number = 34; /* Height of the headline. */
        setCoordinates({
            xPosition: props.mapMarker.xPosition + props.offsetWorldMapFrame.xOffset - 0.5 * mapMarkerSize.xSize,
            yPosition: props.mapMarker.yPosition + props.offsetWorldMapFrame.yOffset - 0.5 * mapMarkerSize.ySize - yOffset
        });
        // eslint-disable-next-line
    }, [props]);

    function handleDrag(event: DraggableEvent, ui: DraggableData):void {
        event.preventDefault();
        if(props.isMovable) {
            props.setSelectedMapMarker(
                {...props.mapMarker,
                    xPosition: props.mapMarker.xPosition + ui.x,
                    yPosition: props.mapMarker.yPosition + ui.y
                }
            );
        }
    }

    return (
        <Draggable
            handle="strong"
            onDrag={handleDrag}
        >
            <div className={"mapMarkerCard"} style={{
                position:"absolute",
                left: coordinates.xPosition, /* Might depend on MapMarkerType */
                top: coordinates.yPosition   /* Might depend on MapMarkerType */
            }}>
                <h2 className={props.isSelected ? "mapMarkerNameSelected" : "mapMarkerName"}>
                    {props.mapMarker.name}
                </h2>
                { props.isMovable ?
                    <strong>
                        <MapMarkerIcon isSelected={props.isSelected} handleClick={handleClick} />
                    </strong> :
                    <MapMarkerIcon isSelected={props.isSelected} handleClick={handleClick} />
                }
                {props.isSelected &&
                    <ToolBar
                        handleMapMarkerUpdate={props.handleMapMarkerUpdate}
                        handleArticleFrame={props.handleArticleFrame}
                    />
                }
            </div>
        </Draggable>
    )
}
