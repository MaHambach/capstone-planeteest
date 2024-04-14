import './MapMarkerListItem.css';
import {AppUser} from "../../../types/AppUser.ts";
import {MapMarker} from "../../../types/MapMarker.ts";
import React, {useEffect, useState} from "react";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import {TableRow} from "@mui/material";
import IconSwitch from "../../_generic/parts/IconSwitch.tsx";
import {StyledTableCell} from "../../_generic/parts/StyledTableCell.tsx";
import MapMarkerTypeSelect from "../../mapMarkerType/part/MapMarkerTypeSelect.tsx";

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

    function setMapMarkerVisibility(event:React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        functions.updateMapMarker({
            ...mapMarker,
            visibility: mapMarker.visibility === "OWNER_ONLY" ? "OWNER_AND_OBSERVERS" : "OWNER_ONLY"
        });
    }

    function setMapMarkerTypeId(mapMarkerTypeId:string): void {
        functions.updateMapMarker({
            ...mapMarker,
            markerTypeId: mapMarkerTypeId
        });
    }

    return (
        <TableRow className={"mapMarkerListItem"}>
            <StyledTableCell>
                {mapMarker.name}
            </StyledTableCell>
            <StyledTableCell align={"center"}>
                <MapMarkerTypeSelect
                    data={{mapMarkerTypes: data.mapMarkerTypes}}
                    functions={{onClick: setMapMarkerTypeId}}
                    props={{value: props.mapMarker.markerTypeId}}
                />
            </StyledTableCell>
            <StyledTableCell align={"center"}>
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
            </StyledTableCell>
        </TableRow>
    );
}
