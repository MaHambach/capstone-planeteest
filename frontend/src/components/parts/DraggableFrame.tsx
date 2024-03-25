import React from "react";
import Draggable from "react-draggable";
import HeaderDraggableFrame from "./HeaderDraggableFrame.tsx";

type DraggableFrameProps = {
    children: React.ReactNode;
    closeFrame: () => void;
}

export default function DraggableFrame(props:Readonly<DraggableFrameProps>):React.ReactElement {
    const nodeRef = React.useRef(null);

    return (
        <Draggable>
            <div>
                <HeaderDraggableFrame closeWindow={props.closeFrame} nodeRef={nodeRef} />
            </div>
        </Draggable>
    )
}