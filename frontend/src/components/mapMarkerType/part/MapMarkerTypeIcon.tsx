import React from "react";
import GetIcon from "./MapMarkerIconList.tsx";

type MapMarkerTypeIconProps = {
    icon: string;
    color: string;
}
export default function MapMarkerTypeIcon(props: Readonly<MapMarkerTypeIconProps>):React.ReactElement {

    return (
        <div>
            <GetIcon iconName={props.icon} color={props.color} />
        </div>
    )
}