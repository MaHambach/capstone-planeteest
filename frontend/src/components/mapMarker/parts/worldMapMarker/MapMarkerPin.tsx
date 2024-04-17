import {MapMarker} from "../../../../types/MapMarker.ts";
import React, {useEffect, useState} from "react";
import MapMarkerToolBar from "./ToolBar/MapMarkerToolBar.tsx";
import {MapMarkerType} from "../../../../types/MapMarkerType.ts";
import MapMarkerTypeIcon from "../../../mapMarkerType/part/MapMarkerTypeIcon.tsx";
import {getMapMarkerTypeById} from "../../../../utility/getById.ts";

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

    function handleClick(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        functions.handleClick(event);
    }

    return (
        <>
            <button className={"mapMarkerIconButton"}
                    {...props.isSelected ? {style: isSelectedStyle} : {}}
                    onClick={handleClick}
            >
                <MapMarkerTypeIcon
                    iconName={mapMarkerType.icon}
                    color={mapMarkerType.color}
                    tileSize={32}
                />
            </button>
            {props.isSelected &&
                <>
                    <h2 className={"mapMarkerName"}>
                        {props.mapMarker.name}
                    </h2>
                    <MapMarkerToolBar
                        isOwner={props.isOwner}
                        handleMapMarkerUpdate={functions.handleMapMarkerUpdate}
                        handleArticleFrame={functions.handleArticleFrame}
                    />
                </>
            }
        </>
    )
}
