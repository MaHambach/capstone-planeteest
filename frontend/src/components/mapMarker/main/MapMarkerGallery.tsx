import {AppUser} from "../../../types/AppUser.ts";
import {emptyWorldMap, WorldMap} from "../../../types/WorldMap.ts";
import React, {useEffect, useState} from "react";
import {MapMarker} from "../../../types/MapMarker.ts";
import MapMarkerListItem from "../parts/MapMarkerListItem.tsx";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import {useParams} from "react-router-dom";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

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
        <main>
            <h2>{worldMap.name} - Map Marker Gallery</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Name</b></TableCell>
                        <TableCell><b>Type</b></TableCell>
                        <TableCell><b>Visibility</b></TableCell>
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
    );
}
