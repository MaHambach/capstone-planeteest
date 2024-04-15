import "./UpdateWorldMapMain.css"
import {WorldMap} from "../../../types/WorldMap.ts";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AppUser} from "../../../types/AppUser.ts";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import {WorldMapInviteDto} from "../../../types/WorldMapInviteDto.ts";
import WorldMapInviteGallery from "../../worldMapInvite/part/WorldMapInviteGallery.tsx";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import {Grid, Sheet} from "@mui/joy";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import ObserverCard from "../parts/ObserverCard.tsx";
import AddWorldMapInviteButton from "../../worldMapInvite/part/AddWorldMapInviteButton.tsx";
import SaveWorldMapForm from "../parts/SaveWorldMapForm.tsx";

type Data = {
    appUser: AppUser;
    appUsers: AppUserMinimal[];
    worldMaps: WorldMap[];
    worldMapInvites: WorldMapInvite[];
}
type Functions = {
    updateWorldMap: (worldMap:WorldMap) => void;
    deleteWorldMap: (id:string) => void;

    acceptWorldMapInvite: (id:string) => void;
    saveWorldMapInvite: (worldMapInviteDto:WorldMapInviteDto) => void;
    deleteWorldMapInvite: (id:string) => void;

    removeObserverFromWorldMap: (observerId:string, worldMapId:string) => void;
    fetchAllObserversOfWorldmap: (worldMapId:string, setObservers:(observers:AppUserMinimal[]) => void) => void;
}
type UpdateWorldMapFormProps = {
    data:Data;
    functions:Functions;
}

export default function UpdateWorldMapMain({data, functions}:Readonly<UpdateWorldMapFormProps>):React.ReactElement {
    const {id= ''} = useParams<string>();
    const [observers, setObservers] = useState<AppUserMinimal[]>([]);


    useEffect(() => {
        functions.fetchAllObserversOfWorldmap(id, setObservers);
        // eslint-disable-next-line
    }, [id, data]);


    function handleRemoveObserver(event:React.MouseEvent<HTMLButtonElement>, observerName:string):void {
        event.preventDefault();
        functions.removeObserverFromWorldMap(observerName, id);
    }

    return (
        <main className={"UpdateWorldMapMain"}>
            <SaveWorldMapForm
                data={{worldMaps: data.worldMaps}}
                functions={{deleteWorldMap: functions.deleteWorldMap, updateWorldMap: functions.updateWorldMap}}
                props={{worldMapId: id}}
            />
            <Grid container spacing={1.5} sx={{ flexGrow: 1 }}>
                <Grid xs={6}>
                    <Sheet sx={{p: 1}} variant="outlined">
                        <b>Betrachter</b>
                        <TableContainer>
                            <Table size={"small"}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <b>Name</b>
                                        </TableCell>
                                        <TableCell>
                                            <b>Entfernen</b>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {observers.map((appUser: AppUserMinimal) => {
                                        return (<ObserverCard key={appUser.id}
                                                              functions={{handleRemoveObserver: handleRemoveObserver}}
                                                              props={{appUser: appUser}}
                                            />
                                        )
                                    })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Sheet>
                </Grid>
                <Grid xs={6}>
                    <Sheet sx={{p:1}} variant="outlined">
                        <AddWorldMapInviteButton
                            props={{ownerId: data.appUser.id, worldMapId: id}}
                            functions={{
                                saveWorldMapInvite: functions.saveWorldMapInvite
                            }}
                        />
                        <WorldMapInviteGallery
                            data={data}
                            props={{
                                title: "Offene Einladungen",
                                invitesType: "ToWorldMap",
                                worldMapId: id
                            }}
                            functions={{
                                acceptWorldMapInvite: functions.acceptWorldMapInvite,
                                deleteWorldMapInvite: functions.deleteWorldMapInvite
                            }}
                        />

                    </Sheet>
                </Grid>
            </Grid>
        </main>
    )
}
