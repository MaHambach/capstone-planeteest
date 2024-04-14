import "./BackButton.css";
import {Button} from "@mui/material";
import React from "react";
import {Tooltip} from "@mui/joy";

type Props = {
    icon: React.ReactElement;
    tooltip?: string;
}
type BackButtonProps = {
    props: Props;
}
export default function BackButton({props}:Readonly<BackButtonProps>):React.ReactElement {
    return (
        <Tooltip title={props.tooltip} placement={"left"} arrow>
            <Button
                color="primary"
                onClick={() => window.history.back()}
                className={"backButton"}
            >
                {props.icon}
            </Button>
        </Tooltip>
    )
}
