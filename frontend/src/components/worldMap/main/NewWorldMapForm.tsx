import React, {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {WorldMapDto} from "../../../types/WorldMapDto.ts";

type NewWorldMapFormProps = {
    saveWorldMap: (worldMapDto:WorldMapDto) => void;
}

const initialFormData:WorldMapDto = {
    name: '',
    worldMapUrl: '',
    xSize: 0,
    ySize: 0
}

export default function NewWorldMapForm(props:Readonly<NewWorldMapFormProps>):React.ReactElement {
    const [formData, setFormData] = useState(initialFormData);
    const [imageDimensions, setImageDimensions] = useState({x:0, y:0});
    const img = new Image();

    const navigate = useNavigate();

    function handleSubmit(event: FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        props.saveWorldMap({...formData, xSize:imageDimensions.x, ySize:imageDimensions.y});
        navigate('/')
    }

    img.onload = function() {
        setImageDimensions({x:img.width, y:img.height});
    }

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>):void {
        if(event.target.name === "worldMapUrl") img.src = event.target.value;

        setFormData(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        )
    }

    return (
        <main>
            <h2>Neue Weltkarte anlegen</h2>
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
                    <input id={"worldMapUrl"} name={"worldMapUrl"}
                           type={"text"}
                           value={formData.worldMapUrl}
                           onChange={handleChangeInput}/>
                </div>
                <button type={"submit"}>Speichern</button>
                <button type={"button"} onClick={() => navigate('/')}>Abbrechen</button>
            </form>
            <div>
                <img src={formData.worldMapUrl} alt={"Weltkarte"} width={"200px"} height={"200px"}/>
            </div>
        </main>
    )
}
