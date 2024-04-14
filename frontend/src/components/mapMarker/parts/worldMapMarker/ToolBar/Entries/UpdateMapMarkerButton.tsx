import './UpdateMapMarkerButton.css';
import React from "react";
import {BsFillGearFill} from "react-icons/bs";
import {ListItemIcon, MenuItem} from "@mui/material";

type UpdateMapMarkerButtonProps = {
    handleMapMarkerUpdate: ()=> void;
}

export default function UpdateMapMarkerButton(props:Readonly<UpdateMapMarkerButtonProps>):React.ReactElement {
    function handleClick(event: React.MouseEvent):void {
        event.preventDefault();
        props.handleMapMarkerUpdate()
    }

    return (
        <MenuItem onClick={handleClick}>
            <ListItemIcon>
                <BsFillGearFill />
            </ListItemIcon>
        </MenuItem>
    )
}
