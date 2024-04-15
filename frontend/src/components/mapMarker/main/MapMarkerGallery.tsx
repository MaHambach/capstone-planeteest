import {AppUser} from "../../../types/AppUser.ts";
import {emptyWorldMap, WorldMap} from "../../../types/WorldMap.ts";
import React, {useEffect, useState} from "react";
import {MapMarker} from "../../../types/MapMarker.ts";
import MapMarkerListItem from "../parts/MapMarkerListItem.tsx";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import {useParams} from "react-router-dom";
import {Table, TableBody, TableHead, TableRow} from "@mui/material";
import {StyledTableCell} from "../../_generic/parts/StyledTableCell.tsx";
import BackButton from "../../_generic/parts/BackButton.tsx";
import {FaMapMarkedAlt} from "react-icons/fa";

type Data = {
    appUser: AppUser;
    mapMarkers: MapMarker[];
    mapMarkerTypes: MapMarkerType[];
    worldMaps: WorldMap[];
}
type Functions = {
    updateMapMarker: (mapMarker: MapMarker) => void;
}
type MapMarkerGalleryProps = {
    data: Data,
    functions: Functions,
}
export default function MapMarkerGallery({data, functions}: Readonly<MapMarkerGalleryProps>): React.ReactElement {
    const {id= ''} = useParams<string>();
    const [worldMap, setWorldMap] = useState<WorldMap>(emptyWorldMap);

    function getWorldMapById(id:string):WorldMap {
        const filteredWorldMaps:WorldMap[] = data.worldMaps.filter((worldMap:WorldMap) => worldMap.id === id);
        if(filteredWorldMaps.length === 0) console.error("No world map with id \"" + id + "\" found.");
        else return filteredWorldMaps[0];
        return emptyWorldMap;
    }

    useEffect(() => {
        setWorldMap(getWorldMapById(id));
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <BackButton
                props={{
                    icon: <FaMapMarkedAlt />,
                    tooltip: "Zurück zur Weltkarte"
                }}
            />
            <main>
                <h2>{worldMap.name} - Map Marker Gallery</h2>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell><b>Name</b></StyledTableCell>
                            <StyledTableCell><b>MapMarker</b></StyledTableCell>
                            <StyledTableCell><b>Sichtbarkeit</b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        data.mapMarkers
                            .filter((mapMarker: MapMarker) => mapMarker.worldMapId === worldMap.id)
                            .map((mapMarker: MapMarker) =>
                                <MapMarkerListItem
                                    key={mapMarker.id}
                                    data={{appUser: data.appUser, mapMarkerTypes: data.mapMarkerTypes}}
                                    functions={functions}
                                    props={{mapMarker: mapMarker}}
                                />)
                    }
                    </TableBody>
                </Table>
            </main>
        </>
    );
}
