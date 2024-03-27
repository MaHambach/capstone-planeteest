import React from "react";

type MapMarkerTypeIconProps = {
    icon: string;
    color: string;
}
export default function MapMarkerTypeIcon(props: Readonly<MapMarkerTypeIconProps>):React.ReactElement {
    import("react-icons/" + props.icon.slice(0,2).toLowerCase())

    return (
        <div>
        </div>
    )
}