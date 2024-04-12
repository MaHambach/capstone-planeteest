import './ToolBar.css';
import React from "react";
import AddMapMarker from "./Entries/MapMarker.tsx";
import MapMarkerVisibility from "./Entries/MapMarkerVisibility.tsx";

type Functions = {
    toggleAddNewMapMarker: (event:React.MouseEvent<HTMLElement>) => void;
}
type Props = {
    worldMapId: string;
    addNewMapMarker: boolean;
}
type ToolBarProps = {
    functions: Functions;
    props: Props;
}
export default function ToolBar({functions, props}:Readonly<ToolBarProps>):React.ReactElement {
    return (
        <div className={"worldMapToolBar"}>
            <AddMapMarker
                toggleAddNewMapMarker={functions.toggleAddNewMapMarker}
                addNewMapMarker={props.addNewMapMarker}
            />
            <MapMarkerVisibility props={{worldMapId: props.worldMapId}} />
        </div>
    )
}
