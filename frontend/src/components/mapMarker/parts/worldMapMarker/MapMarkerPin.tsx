import './MapMarkerPin.css'
import {MapMarker} from "../../../../types/MapMarker.ts";
import React, {useEffect, useState} from "react";
import ToolBar from "./ToolBar/ToolBar.tsx";
import {MapMarkerType} from "../../../../types/MapMarkerType.ts";
import MapMarkerTypeIcon from "../../../mapMarkerType/part/MapMarkerTypeIcon.tsx";
import {getMapMarkerTypeById} from "../../../../utility/getById.ts";
import {Menu, Popover} from "@mui/material";

type Data = {
    mapMarkerTypes: MapMarkerType[];
}
type Functions = {
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleArticleFrame: () => void;
    handleMapMarkerUpdate: () => void;
    handleSelectedMapMarkerChange: (mapMarker:MapMarker) => void;
    setSelectedMapMarker: (mapMarker:MapMarker) => void;
}
type Props = {
    mapMarker: MapMarker;
    isSelected:boolean;
    isOwner:boolean;
}
type MapMarkerCardProps = {
    data:Data;
    functions:Functions;
    props:Props;
}
export default function MapMarkerPin({data, functions, props}: Readonly<MapMarkerCardProps>): React.ReactElement {
    const [mapMarkerType, setMapMarkerType] = useState<MapMarkerType>(getMapMarkerTypeById(props.mapMarker.markerTypeId, data.mapMarkerTypes));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const isSelectedStyle = {
        filter: "drop-shadow(0 0 4px " + mapMarkerType.color + ")",
        "borderRadius": "50px",
        "boxShadow": "inset 0 0 10px " + mapMarkerType.color,
        "zIndex": "20"
    }

    useEffect(() => {
        setMapMarkerType(getMapMarkerTypeById(props.mapMarker.markerTypeId, data.mapMarkerTypes));
        // eslint-disable-next-line
    }, [props]);

    function handleClose(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        setAnchorEl(null);
    }

    function handleClick(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        functions.handleClick(event);
    }

    return (
        <>
            <Popover
                anchorEl={anchorEl}
                open={open}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                transformOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <h2>
                    {props.mapMarker.name}
                </h2>
            </Popover>
            <button className={"mapMarkerIconButton"}
                    {...props.isSelected ? {style: isSelectedStyle} : {}}
                    onClick={handleClick}
                    id={"MapMarkerPinButton"}
                    aria-controls={open ? "MapMarkerMenu" : undefined}
                    aria-haspopup={"true"}
                    aria-expanded={open ? "true" : undefined}
            >
                <MapMarkerTypeIcon
                    iconName={mapMarkerType.icon}
                    color={mapMarkerType.color}
                    tileSize={32}
                />
            </button>
            <Menu
                id={"MapMarkerMenu"}
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{'aria-labelledby': 'navigation-button'}}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                transformOrigin={{vertical: 'top', horizontal: 'center'}}
                disableScrollLock={true}
            >
                <ToolBar
                    isOwner={props.isOwner}
                    handleMapMarkerUpdate={functions.handleMapMarkerUpdate}
                    handleArticleFrame={functions.handleArticleFrame}
                />
            </Menu>
        </>
    )
}
