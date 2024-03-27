import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import React from "react";

type MapMarkerTypeGalleryProps ={
    mapMarkerTypes: MapMarkerType[];
    handleSelectedMapMarkerTypeChange: (mapMarkerType:MapMarkerType) => void;
    selectedMapMarkerType: MapMarkerType;
}
export default function MapMarkerTypeGallery(props: Readonly<MapMarkerTypeGalleryProps>): React.ReactElement {

    return (
        <div className={"mapMarkerTypeGallery"}>
            {props.mapMarkerTypes.map((mapMarkerType:MapMarkerType) => {
                return (
                    <div key={mapMarkerType.id}>
                        test
                    </div>
                )
            })}
        </div>
    )
}