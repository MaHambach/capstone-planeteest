import './HeaderDraggableFrame.css'
import React from "react";
import {Typography} from "@mui/material";


type Functions = {
    closeWindow: () => void;
}
type Props = {
    title: string;
    nodeRef: React.MutableRefObject<null>;
}
type SubWindowHeaderProps = {
    functions: Functions;
    props: Props;
}
export default function HeaderDraggableFrame({functions, props}:Readonly<SubWindowHeaderProps>):React.ReactElement {

    return (
        <strong ref={props.nodeRef}>
            <div className={"headerDraggableFrame"}>
                <Typography color="primary" level={"h4"} variant={"solid"}>{props.title}</Typography>
                <button className={"closeWindowButton"} onClick={functions.closeWindow}>x</button>
            </div>
        </strong>
    )
}
