import React, {FormEvent, useEffect, useState} from "react";
import {emptyMapMarkerDto, MapMarkerDto} from "../../../types/MapMarkerDto.ts";
import DraggableSubWindow from "../../_generic/draggable/DraggableSubWindow.tsx";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import IconSwitch from "../../_generic/parts/IconSwitch.tsx";
import {Sheet} from "@mui/joy";

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

    function setMapMarkerVisibility(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        setFormData(
            {
                ...formData,
                visibility: formData.visibility === "OWNER_ONLY" ? "OWNER_AND_OBSERVERS" : "OWNER_ONLY"
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
                markerTypeId: props.mapMarkerTypes[0].id,
            }
        );
        // eslint-disable-next-line
    }, [props]);

    return (
        <DraggableSubWindow
            functions={{closeFrame: props.closeAddMapMarkerForm}}
            props={{
                initialPosition: {left:100, top:100, width:200, height:200},
                title: "Neuer MapMarker"
            }}
        >
            <form className={"addMapMarkerForm"} onSubmit={handleSubmit}>
                <Sheet>
                    <label htmlFor={"name"}>Name:</label>
                    <input id={"name"} name={"name"} type={"text"} value={formData.name} onChange={handleChangeInput}/>
                </Sheet>
                <Sheet className={"mapMarkerUpdateDiv"}>
                    <label htmlFor={"markerTypeId"}>Typ: </label>
                    <select id={"markerTypeId"} name={"markerTypeId"} value={formData.markerTypeId} onChange={handleChangeInput}>
                        {props.mapMarkerTypes.map((mapMarkerType: MapMarkerType) => {
                            return (
                                <option key={mapMarkerType.id}
                                        value={mapMarkerType.id}>
                                    {mapMarkerType.name}
                                </option>
                            )
                        })}
                    </select>
                </Sheet>
                <Sheet className={"mapMarkerUpdateDiv"}>
                    <label htmlFor={"Visibility"}>Sichtbarkeit: </label>
                    <IconSwitch
                        data={{
                            tooltipLeft:"Sichtbar für mich",
                            tooltipRight:"Sichtbar für alle",
                            name: "visibility",
                            valueLeft: "OWNER_ONLY",
                            valueRight: "OWNER_AND_OBSERVERS"
                        }}
                        functions={{
                            onClick: setMapMarkerVisibility
                        }}
                        props={{
                            iconLeft:<MdVisibilityOff/>,
                            iconRight:<MdVisibility/>,

                    }}/>
                </Sheet>
                <Sheet>
                    <button type={"submit"}>Speichern</button>
                </Sheet>
            </form>
        </DraggableSubWindow>
    )
}
