import {emptyWorldMap, WorldMap} from "../../../types/WorldMap.ts";
import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AppUser} from "../../../types/AppUser.ts";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import {WorldMapInviteDto} from "../../../types/WorldMapInviteDto.ts";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import WorldMapInviteGallery from "../../worldMapInvite/part/WorldMapInviteGallery.tsx";
import {ImCross} from "react-icons/im";
import AddWorldMapInviteForm from "../../worldMapInvite/part/AddWorldMapInviteForm.tsx";

type UpdateWorldMapFormProps = {
    updateWorldMap: (worldMap:WorldMap) => void;
    deleteWorldMap: (id:string) => void;
    getWorldMap: (id:string) => WorldMap;
    appUser: AppUser;
    appUsers: AppUserMinimal[];
    saveWorldMapInvite: (worldMapInviteDto:WorldMapInviteDto) => void;
    removeObserverFromWorldMap: (observerId:string, worldMapId:string) => void;
    fetchAllObserversOfWorldmap: (worldMapId:string, setObservers:(observers:AppUserMinimal[]) => void) => void;
    deleteWorldMapInvite: (id:string) => void;
    fetchAllPossibleInviteesForWorldMap: (worldMapId:string, setPossibleObserver:(possibleObserver:AppUserMinimal[]) => void) => void;
    fetchAllWorldMapInvitesToWorldMap: (worldMapId:string, setWorldMapInvites:(worldMapInvites:WorldMapInvite[]) => void) => void;
}

export default function UpdateWorldMapForm(props:Readonly<UpdateWorldMapFormProps>):React.ReactElement {
    const {id= ''} = useParams<string>();
    const [formData, setFormData] = useState<WorldMap>(emptyWorldMap);
    const [observers, setObservers] = useState<AppUserMinimal[]>([]);
    const [possibleObservers, setPossibleObservers] = useState<AppUserMinimal[]>([]);
    const [isInvitingObserver, setIsInvitingObserver] = useState<boolean>(false);
    const [worldMapInvites, setWorldMapInvites] = useState<WorldMapInvite[]>([]);

    const navigate = useNavigate();

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>):void {
        setFormData(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        )
    }

    function toggleAddNewObserver(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        setIsInvitingObserver(!isInvitingObserver);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>):void {
        event.preventDefault();

        props.updateWorldMap(formData);
        navigate('/')
    }

    function handleDeleteWorldMap(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        if (window.confirm("Möchten Sie die Weltkarte" + formData.name + " wirklich löschen?")) {
            props.deleteWorldMap(id);
            navigate("/");
        }
    }

    function handleRemoveObserver(event:React.MouseEvent<HTMLButtonElement>, observerName:string):void {
        event.preventDefault();
        props.removeObserverFromWorldMap(observerName, id);
    }

    useEffect(() => {
        setFormData(props.getWorldMap(id));
        props.fetchAllObserversOfWorldmap(id, setObservers);
        props.fetchAllPossibleInviteesForWorldMap(id, setPossibleObservers);
        props.fetchAllWorldMapInvitesToWorldMap(id, setWorldMapInvites);
    }, [id, props]);

    return (
        <main className={"UpdateWorldMapForm"}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor={"name"}>Name:</label>
                    <input id={"name"} name={"name"}
                           type={"text"}
                           value={formData.name}
                           onChange={handleChangeInput}/>
                </div>
                <div>
                    <label htmlFor={"worldMapUrl"}>URL:</label>
                    <span>{formData.worldMapUrl}</span>
                </div>
                <div>
                    <label htmlFor={"xSize"}>Breite:</label>
                    <span>{formData.xSize}</span>
                </div>
                <div>
                    <label htmlFor={"ySize"}>Höhe:</label>
                    <span>{formData.ySize}</span>
                </div>
                <button type={"submit"}>Speichern</button>
                <button type={"button"} onClick={() => navigate('/')}>Abbrechen</button>
                <button className={"deleteButton"} onClick={handleDeleteWorldMap} type={"button"}>Löschen</button>
            </form>
            <div>
                <div className={"observerListDiv"}>
                    <div>
                        <h3>Betrachter</h3>
                        <button onClick={toggleAddNewObserver}>Einladung hinzufügen</button>
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
                <WorldMapInviteGallery
                    displayInviteeName={true}
                    title={"Offene Einladungen"}
                    appUsers={props.appUsers}
                    worldMapInvites={worldMapInvites}
                    getWorldMap={props.getWorldMap}
                    deleteWorldMapInvite={props.deleteWorldMapInvite}
                />
            </div>
            {isInvitingObserver &&
                <AddWorldMapInviteForm
                    ownerId={props.appUser.id}
                    possibleInvitees={possibleObservers}
                    worldMapId={id}
                    closeAddWorldMapInviteForm={() => setIsInvitingObserver(false)}
                    saveWorldMapInvite={props.saveWorldMapInvite}
                />}
        </main>
    )
}
