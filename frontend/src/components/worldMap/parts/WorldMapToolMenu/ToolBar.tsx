import React from "react";
import MapMarker from "./Entries/MapMarker.tsx";

type ToolBarProps = {
    toggleAddNewMapMarker: (event:React.MouseEvent<HTMLElement>) => void;
}
export default function ToolBar(props:Readonly<ToolBarProps>):React.ReactElement {
    return (
        <div className={"worldMapToolBar"}>
            <MapMarker name={"MapMarker hinzufügen"} toggleAddNewMapMarker={props.toggleAddNewMapMarker} />
        </div>
    )
}