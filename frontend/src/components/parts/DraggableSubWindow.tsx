import React from "react";
import HeaderDraggableFrame from "./HeaderDraggableFrame.tsx";
import Draggable from "react-draggable";

type DraggableFrameProps = {
    children: React.ReactNode;
    closeFrame: () => void;
    initialPosition: {left:number, top:number};
}

export default function DraggableSubWindow(props:Readonly<DraggableFrameProps>):React.ReactElement {
    const nodeRef:React.MutableRefObject<null> = React.useRef(null);

    return (
        <Draggable
            handle="strong"
            defaultPosition={{x:props.initialPosition.left, y:props.initialPosition.top}}
        >
            <div
                className={"draggableFrame"}
                style={{left:props.initialPosition.left, top:props.initialPosition.top}}
            >
                <HeaderDraggableFrame closeWindow={props.closeFrame} nodeRef={nodeRef} />
                <div className={"draggableFrameBody"}>
                    {props.children}
                </div>
            </div>
        </Draggable>
    )
}