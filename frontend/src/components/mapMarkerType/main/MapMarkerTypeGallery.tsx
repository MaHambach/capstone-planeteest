import './MapMarkerTypeGallery.css';
import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import React from "react";
import MapMarkerTypeCard from "../part/MapMarkerTypeCard.tsx";
import {useNavigate} from "react-router-dom";

type MapMarkerTypeGalleryProps ={
    mapMarkerTypes: MapMarkerType[];
}
export default function MapMarkerTypeGallery(props: Readonly<MapMarkerTypeGalleryProps>): React.ReactElement {
    const navigate = useNavigate();

    return (
        <main className={"mapMarkerTypeGallery"}>
            {props.mapMarkerTypes.map((mapMarkerType:MapMarkerType) => {
                return (
                    <MapMarkerTypeCard
                        key={mapMarkerType.id}
                        mapMarkerType={mapMarkerType}
                        tileSize={80}
                        navigationFunction={() => navigate("/mapMarkerType/" + mapMarkerType.id + "/edit")}
                    />
                )
            })}
            <div className={"mapMarkerTypeGalleryAddTile"}>
                <button className={"mapMarkerTypeGalleryAddButton"} onClick={() => navigate("/mapMarkerType/add")}>
                    <b>Add Map Marker Type</b>
                </button>
            </div>
        </main>
    )
}