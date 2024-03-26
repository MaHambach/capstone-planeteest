import './DraggableSubWindow.css';
import React from "react";
import HeaderDraggableFrame from "./HeaderDraggableFrame.tsx";
import Draggable from "react-draggable";

type DraggableSubWindowProps = {
    children: React.ReactNode;
    closeFrame: () => void;
    initialPosition:
        {
            left:number,
            top:number,
            width:number,
            height:number
        };
}

export default function DraggableSubWindow(props:Readonly<DraggableSubWindowProps>):React.ReactElement {
    const nodeRef:React.MutableRefObject<null> = React.useRef(null);

    return (
        <Draggable
            handle="strong"
        >
            <div
                className={"draggableSubWindow"}
                style={{
                    left:props.initialPosition.left,
                    top:props.initialPosition.top,
                    width:props.initialPosition.width,
                    height:props.initialPosition.height
                }}
            >
                <HeaderDraggableFrame closeWindow={props.closeFrame} nodeRef={nodeRef} />
                <div className={"draggableSubWindowBody"}>
                    {props.children}
                </div>
            </div>
        </Draggable>
    )
}