import React from "react";
import {IconButton, Tooltip} from "@mui/joy";
import {MdVisibilityOff} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {IconContext} from "react-icons";

type Props = {
    worldMapId: string;
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
type MapMarkerProps = {
    props: Props;
}

export default function MapMarkerVisibility({props}:Readonly<MapMarkerProps>):React.ReactElement {
    const navigate = useNavigate();

    return (
        <Tooltip title={"MapMarker Sichtbarkeit"} placement={"right"} arrow>
            <IconButton
                onClick={() => navigate("/worldmap/mapMarker/" + props.worldMapId)}
                variant="soft"
                color="neutral"
                style={props.style.button}
            >
                <IconContext.Provider value={props.style.icon}>
                    <div>
                        <MdVisibilityOff />
                    </div>
                </IconContext.Provider>
            </IconButton>
        </Tooltip>
    )
}
