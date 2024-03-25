import './SubWindowHeader.css'
import React from "react";

type SubWindowHeaderProps = {
    title: string;
    closeWindow: () => void;
    nodeRef: React.MutableRefObject<null>;
}
export default function SubWindowHeader(props:Readonly<SubWindowHeaderProps>):React.ReactElement {
    return (
        <strong ref={props.nodeRef}>
            <div className={"updateMapMarkerFormHeader"}>
                <span>MapMarker bearbeiten</span>
                <button onClick={props.closeWindow}>x</button>
            </div>
        </strong>
    )
}