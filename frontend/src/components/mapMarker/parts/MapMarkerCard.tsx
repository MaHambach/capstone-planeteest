import './MapMarkerCard.css'
import {MapMarker} from "../../../types/MapMarker.ts";
import React, {useEffect, useState} from "react";
import ToolBar from "./ToolBar/ToolBar.tsx";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import MapMarkerIcon from "./MapMarkerIcon.tsx";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import {getMapMarkerTypeById} from "../../../utility/getById.ts";

type Data = {
    mapMarkerTypes: MapMarkerType[];
}
type Functions = {
    handleArticleFrame: () => void;
    handleMapMarkerUpdate: () => void;
    handleSelectedMapMarkerChange: (mapMarker:MapMarker) => void;
    setSelectedMapMarker: (mapMarker:MapMarker) => void;
}
type Props = {
    mapMarker: MapMarker;
    offsetWorldMapFrame: {xOffset:number, yOffset:number};
    isSelected:boolean;
    isMovable:boolean;
    isOwner:boolean;
}
type MapMarkerCardProps = {
    data:Data;
    functions:Functions;
    props:Props;
}
export default function MapMarkerCard({data, functions, props}: Readonly<MapMarkerCardProps>): React.ReactElement {
    const mapMarkerSize={xSize: 80, ySize: 80};
    const [coordinates, setCoordinates] = useState({xPosition: 0, yPosition: 0});
    const nodeRef:React.MutableRefObject<null> = React.useRef(null);

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        if(!props.isMovable) functions.handleSelectedMapMarkerChange(props.mapMarker);
    }

    useEffect(() => {
        const headlineHeight:number = 34;
        setCoordinates({
            xPosition: props.mapMarker.xPosition + props.offsetWorldMapFrame.xOffset - 0.5 * mapMarkerSize.xSize,
            yPosition: props.mapMarker.yPosition + props.offsetWorldMapFrame.yOffset - 0.5 * mapMarkerSize.ySize - headlineHeight
        });
        // eslint-disable-next-line
    }, [props]);

    function handleDrag(event: DraggableEvent, ui: DraggableData):void {
        event.preventDefault();
        functions.setSelectedMapMarker(
            {...props.mapMarker,
                xPosition: props.mapMarker.xPosition + ui.x,
                yPosition: props.mapMarker.yPosition + ui.y
            }
        );
    }

    return (

            <div className={"mapMarkerCard"} style={{
                position:"absolute",
                left: coordinates.xPosition,
                top: coordinates.yPosition
            }}>
                { props.isMovable ?
                    <Draggable
                        handle="strong"
                        nodeRef={nodeRef}
                        onDrag={handleDrag}
                    >
                    <strong ref={nodeRef}>
                        <MapMarkerIcon
                            isSelected={props.isSelected}
                            handleClick={handleClick}
                            mapMarkerType={getMapMarkerTypeById(props.mapMarker.markerTypeId, data.mapMarkerTypes)}
                        />
                    </strong>
                    </Draggable>
                        :
                    <MapMarkerIcon
                        isSelected={props.isSelected}
                        handleClick={handleClick}
                        mapMarkerType={getMapMarkerTypeById(props.mapMarker.markerTypeId, data.mapMarkerTypes)}
                    />
                }
                {props.isSelected &&
                    <>
                        <h2 className={"mapMarkerName"}>
                            {props.mapMarker.name}
                        </h2>
                        <ToolBar
                            isOwner={props.isOwner}
                            handleMapMarkerUpdate={functions.handleMapMarkerUpdate}
                            handleArticleFrame={functions.handleArticleFrame}
                        />
                    </>
                }
            </div>
    )
}
