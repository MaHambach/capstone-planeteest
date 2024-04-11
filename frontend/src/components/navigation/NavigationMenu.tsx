import './NavigationMenu.css';
import {FaMapMarkedAlt, FaUserCircle} from "react-icons/fa";
import {Button, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {MdMenuBook} from "react-icons/md";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {AppUser} from "../../types/AppUser.ts";
import {BsGeoFill} from "react-icons/bs";

type Data = {
    appUser: AppUser
}
type NavigationMenuProps = {
    data: Data
}

export default function NavigationMenu({data}:Readonly<NavigationMenuProps>):React.ReactElement {
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

    return (
        <>
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
        <Menu
            id={"navigation-menu"}
            anchorEl={anchorEl}
            open={open}
            MenuListProps={{
                'aria-labelledby': 'navigation-button'
            }}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <MenuItem onClick={() => navigate("/user/" + data.appUser.id)}>
                <ListItemIcon>
                    <FaUserCircle />
                </ListItemIcon>
                <ListItemText>
                    Profile
                </ListItemText>
            </MenuItem>
            <MenuItem onClick={() => navigate("/")}>
                <ListItemIcon>
                    <FaMapMarkedAlt />
                </ListItemIcon>
                <ListItemText>
                    Weltkarten
                </ListItemText>
            </MenuItem>
            {data.appUser.role === "ADMIN" &&
                <MenuItem onClick={() => navigate("/mapMarkerType")}>
                    <ListItemIcon>
                        <BsGeoFill />
                    </ListItemIcon>
                    <ListItemText>
                        Map Marker Typen
                    </ListItemText>
                </MenuItem>
            }
        </Menu>

        </>
    )
}
