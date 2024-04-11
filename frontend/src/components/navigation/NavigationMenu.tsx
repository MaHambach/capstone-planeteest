import './NavigationMenu.css';
import {FaMapMarkedAlt, FaUserCircle} from "react-icons/fa";
import {Button, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {MdMenuBook} from "react-icons/md";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {AppUser} from "../../types/AppUser.ts";

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
            className={"navigationMenu"}
            id={"navigation-button"}
            onClick={handleClick}
            aria-control={open ? "navigation-menu" : undefined}
            aria-haspopup={open ? "true" : undefined}
            aria-expanded={open ? "true" : undefined}
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
        </Menu>

        </>
    )
}
