import './ToolBar.css';
import React from "react";
import {MapMarkerDto} from "../../../../types/MapMarkerDto.ts";
import MapMarker from "./Entries/MapMarker.tsx";

type ToolBarProps = {
    saveMapMarker: (mapMarkerDto:MapMarkerDto) => void;
}
export default function ToolBar(props:Readonly<ToolBarProps>):React.ReactElement {
    return (
        <div>
            <MapMarker name={"MapMarker hinzufügen"} saveMapMarker={props.saveMapMarker} />
        </div>
    )
}