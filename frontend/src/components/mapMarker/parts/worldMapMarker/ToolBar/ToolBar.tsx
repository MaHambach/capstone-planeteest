import './ToolBar.css';
import React from "react";
import UpdateMapMarkerButton from "./Entries/UpdateMapMarkerButton.tsx";
import ShowArticleButton from "./Entries/ShowArticleButton.tsx";

type ToolBarProps = {
    handleMapMarkerUpdate: () => void;
    handleArticleFrame: () => void;
    isOwner: boolean;
}

export default function ToolBar(props:Readonly<ToolBarProps>): React.ReactElement {

    return (
        <div className={"mapMarkerCardToolBar"}>
            { props.isOwner && <UpdateMapMarkerButton handleMapMarkerUpdate={props.handleMapMarkerUpdate}/> }
            <ShowArticleButton handleArticleFrame={props.handleArticleFrame}/>
        </div>
    )
}
