import './ToolBar.css';
import React from "react";
import AddMapMarker from "./Entries/MapMarker.tsx";

type ToolBarProps = {
    toggleAddNewMapMarker: (event:React.MouseEvent<HTMLElement>) => void;
    addNewMapMarker: boolean;
}
export default function ToolBar(props:Readonly<ToolBarProps>):React.ReactElement {
    return (
        <div className={"worldMapToolBar"}>
            <AddMapMarker
                name={"MapMarker hinzufügen"}
                toggleAddNewMapMarker={props.toggleAddNewMapMarker}
                addNewMapMarker={props.addNewMapMarker}
            />
        </div>
    )
}