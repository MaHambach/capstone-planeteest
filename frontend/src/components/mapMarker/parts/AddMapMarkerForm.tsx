import React, {FormEvent, useState} from "react";
import {MapMarkerDto} from "../../../types/MapMarkerDto.ts";

type AddMapMarkerFormProps = {
    saveMapMarker: (mapMarkerDto:MapMarkerDto) => void;
}

const initialFormData:MapMarkerDto = {
    worldMapId: '',
    name: '',
    xPosition: 0,
    yPosition: 0,
    markerTypeId: ''
}

export default function AddMapMarkerForm(props:Readonly<AddMapMarkerFormProps>):React.ReactElement {
    const [formData, setFormData] = useState(initialFormData);

    function handleSubmit(event: FormEvent<HTMLFormElement>):void {
        event.preventDefault();

        props.saveMapMarker(formData);
    }

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>):void {
        setFormData(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor={"worldMapId"}>Name:</label>
                <input id={"worldMapId"} name={"name"} type={"text"} value={formData.name} onChange={handleChangeInput}/>
            </div>
            <div>
                <label htmlFor={"xPosition"}>Name:</label>
                <input id={"xPosition"} name={"name"} type={"text"} value={formData.name} onChange={handleChangeInput}/>
            </div>
            <div>
                <label htmlFor={"yPosition"}>Name:</label>
                <input id={"yPosition"} name={"name"} type={"text"} value={formData.name} onChange={handleChangeInput}/>
            </div>
            <div>
                <label htmlFor={"markerTypeId"}>Name:</label>
                <input id={"markerTypeId"} name={"name"} type={"text"} value={formData.name} onChange={handleChangeInput}/>
            </div>
        </form>
    )
}