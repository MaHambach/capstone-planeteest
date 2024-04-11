import './MapMarkerListItem.css';
import {AppUser} from "../../../types/AppUser.ts";
import {MapMarker} from "../../../types/MapMarker.ts";
import React from "react";
import {emptyMapMarkerType, MapMarkerType} from "../../../types/MapMarkerType.ts";
import MapMarkerTypeCard from "../../mapMarkerType/part/MapMarkerTypeCard.tsx";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";

type Data = {
    appUser: AppUser;
    mapMarkerTypes: MapMarkerType[];
}
type Functions = {
    updateMapMarker: (mapMarker: MapMarker) => void;
}
type Props = {
    mapMarker: MapMarker;
}
type MapMarkerListItemProps = {
    data: Data,
    functions: Functions,
    props: Props,
}
export default function MapMarkerListItem({data, functions, props}: Readonly<MapMarkerListItemProps>): React.ReactElement {

    function getMapMarkerTypeById(mapMarkerTypeId: string): MapMarkerType {
        const mapMarkerTypeWithId: MapMarkerType | undefined = data.mapMarkerTypes.find((mapMarkerType: MapMarkerType) => mapMarkerType.id === mapMarkerTypeId);

        if (mapMarkerTypeWithId) return mapMarkerTypeWithId;

        console.error("MapMarkerType with id " + mapMarkerTypeId + " not found.")
        return emptyMapMarkerType;
    }

    function handleVisibilityChange(event:React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        functions.updateMapMarker({
            ...props.mapMarker,
            visibility: props.mapMarker.visibility === "OWNER_ONLY" ? "OWNER_AND_OBSERVERS" : "OWNER_ONLY"
        });
    }

    return (
        <form className={"mapMarkerListItem"}>
            <p>
                {props.mapMarker.name}
            </p>
            <p>
                <MapMarkerTypeCard
                    mapMarkerType={getMapMarkerTypeById(props.mapMarker.markerTypeId)}
                    tileSize={30}
                />
            </p>
            <p>
                <button onClick={handleVisibilityChange}>
                    <div
                        className={props.mapMarker.visibility === "OWNER_ONLY" ?
                            "icon visibleToOwnerOnly_ownerOnly" :
                            "icon visibleToEveryone_ownerOnly"}><FaRegEyeSlash/></div>
                    <div
                        className={props.mapMarker.visibility === "OWNER_ONLY" ?
                            "icon visibleToOwnerOnly_everyone" :
                            "icon visibleToEveryone_everyone"}><FaRegEye/></div>
                </button>
            </p>
        </form>
    );
}
