import './HeaderDraggableFrame.css'
import React from "react";

type SubWindowHeaderProps = {
    closeWindow: () => void;
    nodeRef: React.MutableRefObject<null>;
}
export default function HeaderDraggableFrame(props:Readonly<SubWindowHeaderProps>):React.ReactElement {
    return (
        <strong ref={props.nodeRef}>
            <div className={"headerDraggableFrame"}>
                <button className={"closeWindowButton"} onClick={props.closeWindow}>x</button>
            </div>
        </strong>
    )
}