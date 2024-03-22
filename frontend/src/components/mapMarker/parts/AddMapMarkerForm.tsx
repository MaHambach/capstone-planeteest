import React, {FormEvent, useEffect, useState} from "react";
import {emptyMapMarkerDto, MapMarkerDto} from "../../../types/MapMarkerDto.ts";

type AddMapMarkerFormProps = {
    saveMapMarker: (mapMarkerDto:MapMarkerDto) => void;
    worldMapId: string;
    xPosition: number;
    yPosition: number;
    closeAddMapMarkerForm: () => void;
    markerTypeId: string;
}

export default function AddMapMarkerForm(props:Readonly<AddMapMarkerFormProps>):React.ReactElement {
    const [formData, setFormData] = useState(emptyMapMarkerDto);

    function handleSubmit(event: FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        props.saveMapMarker(formData);
        props.closeAddMapMarkerForm();
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