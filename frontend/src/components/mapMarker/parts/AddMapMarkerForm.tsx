import './AddMapMarkerForm.css';
import React, {FormEvent, useEffect, useState} from "react";
import {MapMarkerDto} from "../../../types/MapMarkerDto.ts";

type AddMapMarkerFormProps = {
    saveMapMarker: (mapMarkerDto:MapMarkerDto) => void;
    worldMapId: string;
    xPosition: number;
    yPosition: number;
    markerTypeId: string;
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

    useEffect(() => {
        setFormData(
            {
                ...formData,
                worldMapId: props.worldMapId,
                xPosition: props.xPosition,
                yPosition: props.yPosition,
                markerTypeId: '' /* For later: When MarkerType is implemented */
            }
        )
    }, [props]);

    return (
        <form className={"addMapMarkerForm"} onSubmit={handleSubmit}>
            <div>
                <label htmlFor={"name"}>Name:</label>
                <input id={"name"} name={"name"} type={"text"} value={formData.name} onChange={handleChangeInput}/>
            </div>
        </form>
    )
}