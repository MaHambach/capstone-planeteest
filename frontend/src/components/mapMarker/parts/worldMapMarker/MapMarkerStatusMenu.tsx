import {IconButton, Tooltip} from "@mui/joy";
import {menuButtonStyling} from "../../../../data/MenuButtonStyling.ts";
import {IconContext} from "react-icons";
import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {FaRegCircle} from "react-icons/fa";
import {GrClose} from "react-icons/gr";
import React, {useMemo, useState} from "react";
import {MapMarkerStatus} from "../../../../data/MapMarkerStatus.ts";
import {TbCircleDotted} from "react-icons/tb";


type Functions = {
    onClick: (target:string, value:string) => void;
}
type Props = {
    mapMarkerStatus: MapMarkerStatus
}
type MapMarkerStatusMenuProps = {
    functions:Functions,
    props:Props
}
export default function MapMarkerStatusMenu({functions, props}:Readonly<MapMarkerStatusMenuProps>):React.ReactElement {
    const [mapMarkerStatus, setMapMarkerStatus] = useState<MapMarkerStatus>(props.mapMarkerStatus);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const style = useMemo(() => ({...menuButtonStyling.icon, size: "32px"}), []); // value is cached by useMemo
    const open = Boolean(anchorEl);

    function handleClick(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    }

    function handleClose(event:React.MouseEvent):void {
        event.preventDefault();
        setAnchorEl(null);
    }

    function handleSubmit(event:React.MouseEvent, mapMarkerStatus:MapMarkerStatus):void {
        handleClose(event);
        setMapMarkerStatus(mapMarkerStatus);
        functions.onClick("status", mapMarkerStatus);
    }

    function displayStartIcon():React.ReactElement {
        switch(mapMarkerStatus){
            case "ACTIVE":
                return <FaRegCircle />;
            case "INACTIVE":
                return <TbCircleDotted />;
            case "DESTROYED":
                return <GrClose />;
        }
    }

    return(
        <>
            <Tooltip title={"Status"} placement={"bottom"} arrow>
                <IconButton
                    id={"MapMarkerStatusMenu-button"}
                    onClick={handleClick}
                    aria-controls={open ? "navigation-menu" : undefined}
                    aria-haspopup={"true"}
                    aria-expanded={open ? "true" : undefined}
                >
                    <IconContext.Provider value={style}>
                        <div>
                            {displayStartIcon()}
                        </div>
                    </IconContext.Provider>
                </IconButton>
            </Tooltip>
            <Menu
                id={"MapMarkerStatusMenu-menu"}
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{'aria-labelledby': 'MapMarkerStatusMenu-button'}}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                disableScrollLock={true}

            >
                <MenuItem onClick={(event:React.MouseEvent) => handleSubmit(event, "ACTIVE")}>
                    <ListItemIcon>
                        <FaRegCircle />
                    </ListItemIcon>
                    <ListItemText>
                        Aktiv
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={(event:React.MouseEvent) => handleSubmit(event,"INACTIVE")}>
                    <ListItemIcon>
                        <TbCircleDotted />
                    </ListItemIcon>
                    <ListItemText>
                        Inaktiv
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={(event:React.MouseEvent) => handleSubmit(event,"DESTROYED")}>
                    <ListItemIcon>
                        <GrClose />
                    </ListItemIcon>
                    <ListItemText>
                        Zerstört
                    </ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}
