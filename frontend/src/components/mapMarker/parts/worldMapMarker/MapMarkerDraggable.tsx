import './MapMarkerDraggable.css'
import {MapMarker} from "../../../../types/MapMarker.ts";
import React, {useEffect, useState} from "react";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import {MapMarkerType} from "../../../../types/MapMarkerType.ts";
import MapMarkerPin from "./MapMarkerPin.tsx";

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
export default function MapMarkerDraggable({data, functions, props}: Readonly<MapMarkerCardProps>): React.ReactElement {
    const mapMarkerSize={xSize: 50, ySize: 50};
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
        <div className={"mapMarkerDraggable"} style={{
            position:"absolute",
            left: coordinates.xPosition,
            top: coordinates.yPosition
        }}>
            {props.isMovable ?
                <Draggable
                    handle="strong"
                    nodeRef={nodeRef}
                    onDrag={handleDrag}
                >
                    <strong ref={nodeRef}>
                        <MapMarkerPin
                            data={{...data}}
                            functions={{...functions, handleClick: handleClick}}
                            props={{...props}}
                        />
                    </strong>
                </Draggable>
                :
                <MapMarkerPin
                    data={{...data}}
                    functions={{...functions, handleClick: handleClick}}
                    props={{...props}}
                />
            }

        </div>
    )
}
