import React from "react";
import {BsGeoFill} from "react-icons/bs";
import {IconButton, Tooltip} from "@mui/joy";
import {IconContext} from "react-icons";


type MapMarkerProps = {
    toggleAddNewMapMarker: (event:React.MouseEvent<HTMLElement>) => void;
    addNewMapMarker: boolean;
    style: {
        button: {
            width: number;
            height: number;
            padding: number;
        };
        icon: {
            size: string;
            color: string;
        };
    };
}

export default function AddMapMarker(props:Readonly<MapMarkerProps>):React.ReactElement {

    return (
        <Tooltip title={"Neuen MapMarker erstellen"} placement={"right"} arrow>
            <IconButton
                color={props.addNewMapMarker ? "success" : "neutral"}
                onClick={props.toggleAddNewMapMarker}
                variant="soft"
                style={props.style.button}
            >
                <IconContext.Provider value={props.style.icon}>
                    <div>
                        <BsGeoFill />
                    </div>
                </IconContext.Provider>
            </IconButton>
        </Tooltip>
    )
}
