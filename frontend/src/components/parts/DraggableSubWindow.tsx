import './DraggableSubWindow.css';
import React from "react";
import HeaderDraggableFrame from "./HeaderDraggableFrame.tsx";
import Draggable from "react-draggable";

type DraggableSubWindowProps = {
    children: React.ReactNode;
    closeFrame: () => void;
    initialPosition: {left:number, top:number};
}

export default function DraggableSubWindow(props:Readonly<DraggableSubWindowProps>):React.ReactElement {
    const nodeRef:React.MutableRefObject<null> = React.useRef(null);

    return (
        <Draggable
            handle="strong"
            defaultPosition={{x:props.initialPosition.left, y:props.initialPosition.top}}
        >
            <div
                className={"draggableSubWindow"}
                style={{left:props.initialPosition.left, top:props.initialPosition.top}}
            >
                <HeaderDraggableFrame closeWindow={props.closeFrame} nodeRef={nodeRef} />
                <div className={"draggableSubWindowBody"}>
                    {props.children}
                </div>
            </div>
        </Draggable>
    )
}