import './NavigationMenu.css';
import {FaMapMarkedAlt, FaUserCircle} from "react-icons/fa";
import {Button, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {MdMenuBook} from "react-icons/md";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {AppUser} from "../../types/AppUser.ts";
import {BsGeoFill} from "react-icons/bs";
import {GrLogout} from "react-icons/gr";
import {Tooltip} from "@mui/joy";

type Data = {
    appUser: AppUser
}
type Functions = {
    logoutAppUser: () => void;
}
type NavigationMenuProps = {
    data: Data,
    functions: Functions
}
export default function NavigationMenu({data, functions}:Readonly<NavigationMenuProps>):React.ReactElement {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    function handleClick(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    }

    function handleClose(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        setAnchorEl(null);
    }

    function handleNavigate(event:React.MouseEvent, path:string):void {
        event.preventDefault();
        navigate(path);
        setAnchorEl(null);
    }

    return (
        <>
            <Tooltip title={"Navigation"} placement={"right"} arrow>
                <Button
                    color='inherit'
                    id={"navigation-button"}
                    onClick={handleClick}
                    aria-controls={open ? "navigation-menu" : undefined}
                    aria-haspopup={"true"}
                    aria-expanded={open ? "true" : undefined}
                    className={"navigationMenu"}
                >
                    <MdMenuBook />
                </Button>
            </Tooltip>
            <Menu
                id={"navigation-menu"}
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{'aria-labelledby': 'navigation-button'}}
                onClose={handleClose}
                anchorOrigin={{vertical: 'top', horizontal: 'left',}}
                transformOrigin={{vertical: 'top', horizontal: 'right',}}
                disableScrollLock={true}
            >
                <MenuItem onClick={(event) => handleNavigate(event,"/user/" + data.appUser.id)}>
                    <ListItemIcon>
                        <FaUserCircle />
                    </ListItemIcon>
                    <ListItemText>
                        Profile
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={(event) => handleNavigate(event,"/")}>
                    <ListItemIcon>
                        <FaMapMarkedAlt />
                    </ListItemIcon>
                    <ListItemText>
                        Weltkarten
                    </ListItemText>
                </MenuItem>
                {data.appUser.role === "ADMIN" &&
                    <MenuItem onClick={(event) => handleNavigate(event,"/mapMarkerType")}>
                        <ListItemIcon>
                            <BsGeoFill />
                        </ListItemIcon>
                        <ListItemText>
                            Map Marker Typen
                        </ListItemText>
                    </MenuItem>
                }
                <MenuItem onClick={functions.logoutAppUser}>
                    <ListItemIcon>
                        <GrLogout />
                    </ListItemIcon>
                    <ListItemText>
                        Logout
                    </ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}
