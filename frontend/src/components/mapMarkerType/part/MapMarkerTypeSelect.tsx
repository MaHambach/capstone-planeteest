import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import React, {useState} from "react";
import {Button, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import MapMarkerTypeIcon from "./MapMarkerTypeIcon.tsx";
import {getMapMarkerTypeById} from "../../../utility/getById.ts";
import {Tooltip} from "@mui/joy";

type Data= {
    mapMarkerTypes: MapMarkerType[];
}
type Functions = {
    onClick: (mapMarkerTypeId:string) => void;
}
type Props = {
    value: string;
}
type MapMarkerTypeSelectProps = {
    data: Data;
    functions: Functions;
    props: Props;

}
export default function MapMarkerTypeSelect({data, functions, props}: Readonly<MapMarkerTypeSelectProps>): React.ReactElement {
    const [selectedMapMarkerTypeId, setSelectedMapMarkerTypeId] = useState<string>(props.value);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleClick(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    }

    function handleClose(event:React.MouseEvent):void {
        event.preventDefault();
        setAnchorEl(null);
    }
    function displayMapMarkerType(mapMarkerTypeId:string): React.ReactElement {
        const selectedMapMarkerType: MapMarkerType = getMapMarkerTypeById(mapMarkerTypeId, data.mapMarkerTypes);
        return <MapMarkerTypeIcon
            iconName={selectedMapMarkerType.icon}
            color={selectedMapMarkerType.color}
            tileSize={40}
        />;
    }

    return (
        <>
            <Tooltip title={"MapMarker Symbol"} placement={"bottom"} arrow>
                <Button
                    color='inherit'
                    id={"mapMarkerTypeSelect-button"}
                    onClick={handleClick}
                    aria-controls={open ? "MapMarkerTypeSelect" : undefined}
                    aria-haspopup={"true"}
                    aria-expanded={open ? "true" : undefined}
                >
                    {displayMapMarkerType(selectedMapMarkerTypeId)}
                </Button>
            </Tooltip>
            <Menu
                id={"MapMarkerTypeSelect"}
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{
                    'aria-labelledby': 'navigation-button'
                }}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                transformOrigin={{vertical: 'top', horizontal: 'left',}}
                disableScrollLock={true}
            >
                {data.mapMarkerTypes.map((mapMarkerType: MapMarkerType) => {
                    return <MenuItem
                        key={mapMarkerType.id}
                        onClick={(event) => {
                            handleClose(event);
                            setSelectedMapMarkerTypeId(mapMarkerType.id);
                            functions.onClick(mapMarkerType.id);
                        }}>
                        <ListItemIcon>
                            {displayMapMarkerType(mapMarkerType.id)}
                        </ListItemIcon>
                        <ListItemText>
                            {mapMarkerType.name}
                        </ListItemText>
                    </MenuItem>
                })}
            </Menu>
        </>
    )
}
