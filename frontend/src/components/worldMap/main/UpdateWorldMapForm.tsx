import {emptyWorldMap, WorldMap} from "../../../types/WorldMap.ts";
import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AppUser} from "../../../types/AppUser.ts";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import {WorldMapInviteDto} from "../../../types/WorldMapInviteDto.ts";
import {WorldMapInvite} from "../../../types/WorldMapInvite.ts";
import WorldMapInviteGallery from "../../worldMapInvite/part/WorldMapInviteGallery.tsx";

type UpdateWorldMapFormProps = {
    updateWorldMap: (worldMap:WorldMap) => void;
    deleteWorldMap: (id:string) => void;
    getWorldMap: (id:string) => WorldMap;
    appUser: AppUser;
    appUsers: AppUserMinimal[];
    saveWorldMapInvite: (worldMapInviteDto:WorldMapInviteDto) => void;
    worldMapInvites: WorldMapInvite[];
}

export default function UpdateWorldMapForm(props:Readonly<UpdateWorldMapFormProps>):React.ReactElement {
    const {id= ''} = useParams<string>();
    const [formData, setFormData] = useState<WorldMap>(emptyWorldMap);

    const navigate = useNavigate();

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>):void {
        setFormData(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        )
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

    useEffect(() => setFormData(props.getWorldMap(id)), [id, props]);

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
                    {props.appUsers.map((appUser:AppUserMinimal) => {
                        return (
                            <div className={"observerListEntry"}
                                 key={appUser.id}
                            >
                                <p>{appUser.username}</p>
                                <button onClick={() => props.saveWorldMapInvite({ownerId: props.appUser.id, inviteeId: appUser.id, worldMapId: id})}>Einladen</button>
                            </div>
                        )
                        })
                    }
                </div>
                <WorldMapInviteGallery title={} appUsers={} worldMapInvites={} getWorldMap={} deleteWorldMapInvite={} />
            </div>
        </main>
    )
}
