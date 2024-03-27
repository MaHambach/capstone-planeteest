import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import React from "react";
import MapMarkerTypeCard from "../part/MapMarkerTypeCard.tsx";

type MapMarkerTypeGalleryProps ={
    mapMarkerTypes: MapMarkerType[];
}
export default function MapMarkerTypeGallery(props: Readonly<MapMarkerTypeGalleryProps>): React.ReactElement {

    return (
        <main className={"mapMarkerTypeGallery"}>
            {props.mapMarkerTypes.map((mapMarkerType:MapMarkerType) => {
                return (
                    <MapMarkerTypeCard key={mapMarkerType.id} mapMarkerType={mapMarkerType}/>
                )
            })}
        </main>
    )
}