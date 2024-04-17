import React from "react";
import {IconButton, Tooltip} from "@mui/joy";
import {menuButtonStyling} from "../../../data/MenuButtonStyling.ts";
import {IconContext} from "react-icons";

const buttonPosition = {
    top: "84px",
    right: "10px",
}

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
            <IconButton
                variant="soft"
                color="neutral"
                onClick={() => window.history.back()}
                style={{...menuButtonStyling.button, ...buttonPosition}}
                sx={{position: "fixed"}}
            >

                <IconContext.Provider value={menuButtonStyling.icon}>
                    <div>
                        {props.icon}
                    </div>
                </IconContext.Provider>
            </IconButton>
        </Tooltip>
    )
}
