import {emptyWorldMap, WorldMap} from "../../../types/WorldMap.ts";
import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AppUser} from "../../../types/AppUser.ts";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import {WorldMapInviteDto} from "../../../types/WorldMapInviteDto.ts";
import WorldMapInviteGallery from "../../worldMapInvite/part/WorldMapInviteGallery.tsx";
import {ImCross} from "react-icons/im";
import AddWorldMapInviteForm from "../../worldMapInvite/part/AddWorldMapInviteForm.tsx";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import {Button, ButtonGroup, Input, Sheet} from "@mui/joy";
import {Table, TableBody, TableCell, TableRow} from "@mui/material";

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

export default function UpdateWorldMapForm({data, functions}:Readonly<UpdateWorldMapFormProps>):React.ReactElement {
    const {id= ''} = useParams<string>();
    const [formData, setFormData] = useState<WorldMap>(emptyWorldMap);
    const [observers, setObservers] = useState<AppUserMinimal[]>([]);
    const [isInvitingObserver, setIsInvitingObserver] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        setFormData(getWorldMapById(id));
        functions.fetchAllObserversOfWorldmap(id, setObservers);
        // eslint-disable-next-line
    }, [id, data]);

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>):void {
        setFormData(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        )
    }

    function getWorldMapById(id:string):WorldMap {
        const filteredWorldMaps:WorldMap[] = data.worldMaps.filter((worldMap:WorldMap) => worldMap.id === id);
        if(filteredWorldMaps.length === 0) console.error("No world map with id \"" + id + "\" found.");
        else return filteredWorldMaps[0];
        return emptyWorldMap;
    }

    function toggleAddNewObserver(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        setIsInvitingObserver(!isInvitingObserver);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>):void {
        event.preventDefault();

        functions.updateWorldMap(formData);
        navigate('/')
    }

    function handleDeleteWorldMap(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        if (window.confirm("Möchten Sie die Weltkarte" + formData.name + " wirklich löschen?")) {
            functions.deleteWorldMap(id);
            navigate("/");
        }
    }

    function handleRemoveObserver(event:React.MouseEvent<HTMLButtonElement>, observerName:string):void {
        event.preventDefault();
        functions.removeObserverFromWorldMap(observerName, id);
    }

    return (
        <main className={"UpdateWorldMapForm"}>
            <form onSubmit={handleSubmit}>
                <Table
                    style={{maxWidth: "100%", minWidth: "100px"}}
                >
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <label htmlFor={"name"}>Name:</label>
                            </TableCell>
                            <TableCell colSpan={2}>
                                <Input
                                    id={"name"} name={"name"}
                                    type={"text"}
                                    value={formData.name}
                                    onChange={handleChangeInput}
                                    style={{maxWidth: "50%", minWidth: "100px"}}
                                />
                            </TableCell>
                            <TableCell colSpan={3} rowSpan={5}>
                                <img src={formData.worldMapUrl} alt={"Weltkarte"} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label htmlFor={"worldMapUrl"}>URL:</label>

                            </TableCell>
                            <TableCell colSpan={2}>
                                <Input
                                    id={"worldMapUrl"}
                                    name={"worldMapUrl"}
                                    type={"text"}
                                    value={formData.worldMapUrl}
                                    onChange={handleChangeInput}
                                    style={{maxWidth: "50%", minWidth: "100px"}}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label htmlFor={"xSize"}>Breite:</label>

                            </TableCell>
                            <TableCell colSpan={2}>
                                <span>{formData.xSize}</span>
                            </TableCell>
                       </TableRow>
                        <TableRow>
                                <TableCell>
                                    <label htmlFor={"ySize"}>Höhe:</label>
                                </TableCell>
                                <TableCell colSpan={2}>
                                    <span>{formData.ySize}</span>
                                </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3}>
                                <ButtonGroup>
                                    <Button color={"neutral"} type={"submit"}>Speichern</Button>
                                    <Button color={"neutral"} onClick={() => navigate('/')}>Abbrechen</Button>
                                    <Button color={"danger"} onClick={handleDeleteWorldMap} type={"button"}>Löschen</Button>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
                <Sheet>

                </Sheet>
                <Sheet>
                </Sheet>
                <Sheet>
                </Sheet>

            </form>

            <div>
                <div className={"observerListDiv"}>
                    <div>
                        <h3>Betrachter</h3>

                    </div>
                    {observers.map((appUser:AppUserMinimal) => {
                        return (
                            <div className={"observerListEntry"}
                                 key={appUser.id}
                            >
                                <span>{appUser.username}</span>
                                <button onClick={(event:React.MouseEvent<HTMLButtonElement>) => handleRemoveObserver(event, appUser.username)}><ImCross /></button>
                            </div>
                        )
                        })
                    }
                </div>
                <div className={"inviteListDiv"}>
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
                    <button onClick={toggleAddNewObserver}>Einladung hinzufügen</button>
                </div>
            </div>
            {isInvitingObserver &&
                <AddWorldMapInviteForm
                    props={{ownerId: data.appUser.id, worldMapId: id}}
                    functions={{
                        closeAddWorldMapInviteForm: () => setIsInvitingObserver(false),
                        saveWorldMapInvite: functions.saveWorldMapInvite
                    }}
                />}
        </main>
    )
}
