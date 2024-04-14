import './MapMarkerListItem.css';
import {AppUser} from "../../../types/AppUser.ts";
import {MapMarker} from "../../../types/MapMarker.ts";
import React, {useEffect, useState} from "react";
import {emptyMapMarkerType, MapMarkerType} from "../../../types/MapMarkerType.ts";
import MapMarkerTypeCard from "../../mapMarkerType/part/MapMarkerTypeCard.tsx";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import {TableRow, TableCell} from "@mui/material";
import IconSwitch from "../../_generic/parts/IconSwitch.tsx";

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
    const [mapMarker, setMapMarker] = useState<MapMarker>(props.mapMarker);
    useEffect(() => {
        setMapMarker(props.mapMarker);
    }, [props.mapMarker]);

    function getMapMarkerTypeById(mapMarkerTypeId: string): MapMarkerType {
        const mapMarkerTypeWithId: MapMarkerType | undefined = data.mapMarkerTypes.find((mapMarkerType: MapMarkerType) => mapMarkerType.id === mapMarkerTypeId);

        if (mapMarkerTypeWithId) return mapMarkerTypeWithId;

        console.error("MapMarkerType with id " + mapMarkerTypeId + " not found.")
        return emptyMapMarkerType;
    }

    function setMapMarkerVisibility(event:React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        functions.updateMapMarker({
            ...mapMarker,
            visibility: mapMarker.visibility === "OWNER_ONLY" ? "OWNER_AND_OBSERVERS" : "OWNER_ONLY"
        });
    }

    return (
        <TableRow className={"mapMarkerListItem"}>
            <TableCell>{mapMarker.name}</TableCell>
            <TableCell>
                <MapMarkerTypeCard
                    mapMarkerType={getMapMarkerTypeById(mapMarker.markerTypeId)}
                    tileSize={30}
                />
            </TableCell>
            <TableCell>
                <IconSwitch
                    data={{
                        tooltipLeft:"Sichtbar für mich",
                        tooltipRight:"Sichtbar für alle",
                        name: "visibility",
                        valueLeft: "OWNER_ONLY",
                        valueRight: "OWNER_AND_OBSERVERS"
                    }}
                    functions={{
                        onClick: setMapMarkerVisibility
                    }}
                    props={{
                        iconLeft:<MdVisibilityOff/>,
                        iconRight:<MdVisibility/>,
                        isOn: mapMarker.visibility === "OWNER_AND_OBSERVERS"
                    }}/>
            </TableCell>
        </TableRow>
    );
}
