import './ToolBar.css';
import React from "react";
import AddMapMarker from "./Entries/AddMapMarker.tsx";
import MapMarkerVisibility from "./Entries/MapMarkerVisibility.tsx";
import {ButtonGroup} from "@mui/joy";

const style = {
    button: {
        width: 64, height: 64,
        padding: 0,
    },
    icon: {
        "size": "44px",
        "color": "black",
    }
};
type Functions = {
    toggleAddNewMapMarker: (event:React.MouseEvent<HTMLElement>) => void;
}
type Props = {
    worldMapId: string;
    addNewMapMarker: boolean;
}
type ToolBarProps = {
    functions: Functions;
    props: Props;
}
export default function ToolBar({functions, props}:Readonly<ToolBarProps>):React.ReactElement {
    return (
        <ButtonGroup
            className={"worldMapToolBar"}
            orientation={"vertical"}
            size={"lg"}
            variant="soft"
            sx={{fontSize: "2rem"}}
            spacing={0.5}
        >
            <AddMapMarker addNewMapMarker={props.addNewMapMarker}
                          toggleAddNewMapMarker={functions.toggleAddNewMapMarker}
                          style={style}
            />
            <MapMarkerVisibility props={{worldMapId: props.worldMapId, style:style}}/>
        </ButtonGroup>
    )
}
