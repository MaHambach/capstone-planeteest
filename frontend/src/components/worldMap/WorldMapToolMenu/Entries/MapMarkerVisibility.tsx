import './MapMarker.css';
import React from "react";
import {Button} from "@mui/material";
import {MdVisibilityOff} from "react-icons/md";
import {useNavigate} from "react-router-dom";

type Props = {
    worldMapId: string;
}
type MapMarkerProps = {
    props: Props;
}

export default function MapMarkerVisibility({props}:Readonly<MapMarkerProps>):React.ReactElement {
    const navigate = useNavigate();

    return (
        <Button
            className={"worldMapToolBarEntry"}
            onClick={() => navigate("/worldmap/mapMarker/" + props.worldMapId)}>
            <MdVisibilityOff />
        </Button>
    )
}
