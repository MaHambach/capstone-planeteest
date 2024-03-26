import './MapMarkerIcon.css';
import {BsGeoAltFill} from "react-icons/bs";
import {IconContext} from "react-icons";
import React, {useMemo} from "react";


type MapMarkerIconProps = {
    isSelected:boolean;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}
export default function MapMarkerIcon(props: Readonly<MapMarkerIconProps>): React.ReactElement {
    const iconContextObj = useMemo(() => ({className: 'mapMarkerIcon'}), []); // value is cached by useMemo

    return (
        <IconContext.Provider value={iconContextObj}>
            <button className={props.isSelected ? "mapMarkerIconSelected" : "mapMarkerIcon"}
                    onClick={props.handleClick}
            >
                <BsGeoAltFill />
            </button>
        </IconContext.Provider>
    )
}