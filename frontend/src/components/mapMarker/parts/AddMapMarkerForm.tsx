import React, {FormEvent, useEffect, useState} from "react";
import {emptyMapMarkerDto, MapMarkerDto} from "../../../types/MapMarkerDto.ts";
import DraggableSubWindow from "../../_generic/parts/DraggableSubWindow.tsx";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";

type AddMapMarkerFormProps = {
    saveMapMarker: (mapMarkerDto:MapMarkerDto) => void;
    worldMapId: string;
    xPosition: number;
    yPosition: number;
    closeAddMapMarkerForm: () => void;
    mapMarkerTypes: MapMarkerType[];
}

export default function AddMapMarkerForm(props:Readonly<AddMapMarkerFormProps>):React.ReactElement {
    const [formData, setFormData] = useState(emptyMapMarkerDto);

    function handleSubmit(event: FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        props.saveMapMarker(formData);
        props.closeAddMapMarkerForm();
    }

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>):void {
        setFormData(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        );
    }

    useEffect(() => {
        setFormData(
            {
                ...formData,
                worldMapId: props.worldMapId,
                xPosition: props.xPosition,
                yPosition: props.yPosition,
                markerTypeId: props.mapMarkerTypes[0].id,
            }
        );
        // eslint-disable-next-line
    }, [props]);

    return (
        <DraggableSubWindow
            closeFrame={props.closeAddMapMarkerForm}
            initialPosition={{
                left:200,
                top:200,
                width:200,
                height:200
            }}
        >
            <form className={"addMapMarkerForm"} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor={"name"}>Name:</label>
                    <input id={"name"} name={"name"} type={"text"} value={formData.name} onChange={handleChangeInput}/>
                </div>
                <div className={"mapMarkerUpdateDiv"}>
                    <label htmlFor={"markerTypeId"}>Typ: </label>
                    <select id={"markerTypeId"} name={"markerTypeId"} value={formData.markerTypeId} onChange={handleChangeInput}>
                        {props.mapMarkerTypes.map((mapMarkerType: MapMarkerType) => {
                            return <option key={mapMarkerType.id}
                                           value={mapMarkerType.id}>
                                {mapMarkerType.name}
                            </option>
                        })}
                    </select>
                </div>
                <div className={"mapMarkerUpdateDiv"}>
                    <label htmlFor={"Visibility"}>Sichtbarkeit: </label>
                    <select id={"visibility"} name={"visibility"} value={formData.visibility} onChange={handleChangeInput}>
                        <option value={"OWNER_ONLY"}>Nur für mich</option>
                        <option value={"OWNER_AND_OBSERVERS"}>Für alle</option>
                    </select>
                </div>
                <div>
                    <button type={"submit"}>Speichern</button>
                </div>
            </form>
        </DraggableSubWindow>
    )
}
