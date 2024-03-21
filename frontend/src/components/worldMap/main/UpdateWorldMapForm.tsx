import {WorldMap} from "../../../types/WorldMap.ts";
import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

type UpdateWorldMapFormProps = {
    updateWorldMap: (worldMap:WorldMap) => void;
    deleteWorldMap: (id:string) => void;
    getWorldMap: (id:string) => WorldMap;
}

const initialFormData:WorldMap = {
    id: '',
    name: '',
    worldMapUrl: '',
    xSize: 0,
    ySize: 0
}

export default function UpdateWorldMapForm(props:Readonly<UpdateWorldMapFormProps>):React.ReactElement {
    const {id= ''} = useParams<string>();
    const [formData, setFormData] = useState<WorldMap>(initialFormData);

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

    function handleDeleteProduct():void {
        if (window.confirm("Möchten Sie die Weltkarte" + formData.name + " Produkt wirklich löschen?")) {
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
                    <span>{formData.worldMapUrl}</span>

                </div>
                <div>
                    <label htmlFor={"ySize"}>Höhe:</label>
                    <span>{formData.worldMapUrl}</span>
                </div>
                <button type={"submit"}>Speichern</button>
                <button type={"button"} onClick={() => navigate('/')}>Abbrechen</button>
                <button className={"deleteButton"} onClick={handleDeleteProduct} type={"button"}>Löschen</button>
            </form>
        </main>
    )
}