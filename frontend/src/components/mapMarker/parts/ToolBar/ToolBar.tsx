import './ToolBar.css';
import {MapMarker} from "../../../../types/MapMarker.ts";
import React from "react";

type ToolBarProps = {
    mapMarker: MapMarker;
    offsetMapMarkerCard: {xSize:number, ySize:number};
}

export default function ToolBar(props:Readonly<ToolBarProps>): React.ReactElement {

    return (
        <div className={"mapMarkerCardToolBar"}
                style={{
                    position:"absolute",
                    left: (0.5 * props.offsetMapMarkerCard.xSize + props.mapMarker.xPosition), /* Might depend on MapMarkerType */
                    top: (1.5 * props.offsetMapMarkerCard.ySize+ props.mapMarker.yPosition +5) /* Might depend on MapMarkerType */
                }}
        >
            Bear.
        </div>
    )
}