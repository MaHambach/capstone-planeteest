import './MapMarkerPin.css'
import {MapMarker} from "../../../../types/MapMarker.ts";
import React, {useEffect, useState} from "react";
import ToolBar from "./ToolBar/ToolBar.tsx";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import {MapMarkerType} from "../../../../types/MapMarkerType.ts";
import {getMapMarkerTypeById} from "../../../../utility/getById.ts";
import MapMarkerTypeIcon from "../../../mapMarkerType/part/MapMarkerTypeIcon.tsx";

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
export default function MapMarkerPin({data, functions, props}: Readonly<MapMarkerCardProps>): React.ReactElement {
    const mapMarkerSize={xSize: 50, ySize: 50};
    const [mapMarkerType, setMapMarkerType] = useState<MapMarkerType>(getMapMarkerTypeById(props.mapMarker.markerTypeId, data.mapMarkerTypes));
    const [coordinates, setCoordinates] = useState({xPosition: 0, yPosition: 0});
    const nodeRef:React.MutableRefObject<null> = React.useRef(null);

    const isSelectedStyle = {
        filter: "drop-shadow(0 0 4px " + mapMarkerType.color + ")",
        "borderRadius": "50px",
        "boxShadow": "inset 0 0 10px " + mapMarkerType.color,
        "zIndex": "20"
    }

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        if(!props.isMovable) functions.handleSelectedMapMarkerChange(props.mapMarker);
    }

    useEffect(() => {
        setMapMarkerType(getMapMarkerTypeById(props.mapMarker.markerTypeId, data.mapMarkerTypes));
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

            <div className={"mapMarkerPin"} style={{
                position:"absolute",
                left: coordinates.xPosition,
                top: coordinates.yPosition
            }}>
                <Draggable
                    handle="strong"
                    nodeRef={nodeRef}
                    onDrag={handleDrag}
                    disabled={!props.isMovable}
                >
                <strong ref={nodeRef}>
                    <button className={"mapMarkerIconButton"}
                            {...props.isSelected ? {style: isSelectedStyle} : {}}
                            onClick={handleClick}
                    >
                        <MapMarkerTypeIcon
                            iconName={mapMarkerType.icon}
                            color={mapMarkerType.color}
                            tileSize={32}
                        />
                    </button>
                </strong>
                </Draggable>
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
