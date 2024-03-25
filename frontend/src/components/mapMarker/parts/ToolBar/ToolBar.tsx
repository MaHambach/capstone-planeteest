import './ToolBar.css';
import React from "react";
import UpdateMapMarkerButton from "./Entries/UpdateMapMarkerButton.tsx";
import ShowArticleButton from "./Entries/ShowArticleButton.tsx";

type ToolBarProps = {
    handleUpdateMapMarker: () => void;
    setShowArticle: (showArticle:boolean) => void;
}

export default function ToolBar(props:Readonly<ToolBarProps>): React.ReactElement {

    return (
        <div className={"mapMarkerCardToolBar"}>
            <UpdateMapMarkerButton handleUpdateMapMarker={props.handleUpdateMapMarker}/>
            <ShowArticleButton setShowArticle={props.setShowArticle}/>
        </div>
    )
}