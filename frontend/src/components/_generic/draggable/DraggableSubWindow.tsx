import './DraggableSubWindow.css';
import React from "react";
import HeaderDraggableFrame from "./HeaderDraggableFrame.tsx";
import Draggable from "react-draggable";

type Functions = {
    closeFrame: () => void;
}
type Props = {
    initialPosition:
        {
            left:number,
            top:number,
            width:number,
            height:number
        };
    title: string;
}
type DraggableSubWindowProps = {
    props: Props;
    functions: Functions;
    children: React.ReactNode;
}

export default function DraggableSubWindow({children, functions, props}:Readonly<DraggableSubWindowProps>):React.ReactElement {
    const nodeRef:React.MutableRefObject<null> = React.useRef(null);

    return (
        <Draggable
            handle="strong"
            nodeRef={nodeRef}
        >
            <div
                className={"draggableSubWindow"}
                style={{
                    position: "absolute",
                    left: props.initialPosition.left,
                    top: props.initialPosition.top,
                    width: props.initialPosition.width,
                    height: props.initialPosition.height
                }}
            >
                <HeaderDraggableFrame
                    functions={{closeWindow: functions.closeFrame}}
                    props={{title: props.title, nodeRef: nodeRef}}
                />
                <div className={"draggableSubWindowBody"}>
                    {children}
                </div>
            </div>
        </Draggable>
    )
}
