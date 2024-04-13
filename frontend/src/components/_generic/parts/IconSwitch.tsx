import "./IconSwitch.css"
import React from "react";
import {Button} from "@mui/material";
import {Tooltip} from "@mui/joy";

type Data = {
    tooltipLeft?: string;
    tooltipRight?: string;
    name: string;
    valueLeft: string;
    valueRight: string;
}
type Functions = {
    onClick: (nt: React.MouseEvent<HTMLButtonElement>) => void;
}
type Props = {
    iconLeft: React.ReactElement;
    iconRight: React.ReactElement;
}
type IconSwitchProps = {
    data: Data;
    functions: Functions;
    props: Props;
}
export default function IconSwitch({data, functions, props}:Readonly<IconSwitchProps>):React.ReactElement {
    const [isOn, setIsOn] = React.useState<boolean>(false);

    function handleChange (event: React.MouseEvent<HTMLButtonElement>):void {
        setIsOn(!isOn);
        functions.onClick(event);
    }

    return (
        <Button onClick={handleChange}
                className={"iconSwitch"}
                name={data.name}
        >
            <Tooltip title={data.tooltipLeft} placement={"bottom"} arrow>
                <div
                    className={isOn ?
                        "iconSwitchIcon iconSwitchIconLeft_isOn" :
                        "iconSwitchIcon iconSwitchIconLeft_isOff"}>
                    {props.iconLeft}
                </div>
            </Tooltip>
            <Tooltip title={data.tooltipRight} placement={"bottom"} arrow>
                <div
                    className={isOn ?
                        "iconSwitchIcon iconSwitchIconRight_isOn" :
                        "iconSwitchIcon iconSwitchIconRight_isOff"}>
                    {props.iconRight}
                </div>
            </Tooltip>
        </Button>
    )
}
