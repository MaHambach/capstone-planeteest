import './ToolBar.css';
import React from "react";
import UpdateMapMarkerButton from "./Entries/UpdateMapMarkerButton.tsx";

type ToolBarProps = {
    handleUpdateMapMarker: () => void;
    offsetMapMarkerCard: {xSize:number, ySize:number};
}

export default function ToolBar(props:Readonly<ToolBarProps>): React.ReactElement {

    return (
        <div className={"mapMarkerCardToolBar"}
                style={{
                    position:"absolute",
                    left: (props.offsetMapMarkerCard.xSize), /* Might depend on MapMarkerType */
                    top: (props.offsetMapMarkerCard.ySize) /* Might depend on MapMarkerType */
                }}
        >
            <UpdateMapMarkerButton handleUpdateMapMarker={props.handleUpdateMapMarker}/>
        </div>
    )
}