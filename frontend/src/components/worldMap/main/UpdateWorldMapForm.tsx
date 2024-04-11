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

type UpdateWorldMapFormProps = {
    // Data
    appUser: AppUser;
    appUsers: AppUserMinimal[];
    worldMaps: WorldMap[];
    worldMapInvites: WorldMapInvite[];

    // Functions
    // WorldMap
    updateWorldMap: (worldMap:WorldMap) => void;
    deleteWorldMap: (id:string) => void;
    // WorldMapInvite
    acceptWorldMapInvite: (id:string) => void;
    saveWorldMapInvite: (worldMapInviteDto:WorldMapInviteDto) => void;
    deleteWorldMapInvite: (id:string) => void;
    // Observer
    removeObserverFromWorldMap: (observerId:string, worldMapId:string) => void;
    fetchAllObserversOfWorldmap: (worldMapId:string, setObservers:(observers:AppUserMinimal[]) => void) => void;
}

export default function UpdateWorldMapForm(props:Readonly<UpdateWorldMapFormProps>):React.ReactElement {
    const {id= ''} = useParams<string>();
    const [formData, setFormData] = useState<WorldMap>(emptyWorldMap);
    const [observers, setObservers] = useState<AppUserMinimal[]>([]);
    const [isInvitingObserver, setIsInvitingObserver] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        setFormData(getWorldMapById(id));
        props.fetchAllObserversOfWorldmap(id, setObservers);
        // eslint-disable-next-line
    }, [id, props]);

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>):void {
        setFormData(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        )
    }

    function getWorldMapById(id:string):WorldMap {
        const filteredWorldMaps:WorldMap[] = props.worldMaps.filter((worldMap:WorldMap) => worldMap.id === id);
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
                        appUser={props.appUser}
                        appUsers={props.appUsers}
                        worldMapInvites={props.worldMapInvites}
                        worldMaps={props.worldMaps}
                        title={"Offene Einladungen"}
                        invitesType={"ToWorldMap"}
                        worldMapId={id}
                        acceptWorldMapInvite={props.acceptWorldMapInvite}
                        deleteWorldMapInvite={props.deleteWorldMapInvite}
                    />
                    <button onClick={toggleAddNewObserver}>Einladung hinzufügen</button>
                </div>
            </div>
            {isInvitingObserver &&
                <AddWorldMapInviteForm
                    ownerId={props.appUser.id}
                    worldMapId={id}
                    closeAddWorldMapInviteForm={() => setIsInvitingObserver(false)}
                    saveWorldMapInvite={props.saveWorldMapInvite}
                />}
        </main>
    )
}
