import './UpdateMapMarkerForm.css';
import {emptyMapMarker, MapMarker} from "../../../types/MapMarker.ts";
import React, {useEffect, useState} from "react";
import Draggable from "react-draggable";
import HeaderDraggableFrame from "../../parts/HeaderDraggableFrame.tsx";

type UpdateMapMarkerCardProps = {
    mapMarker: MapMarker;
    updateMapMarker: (mapMarker: MapMarker) => void;
    deleteMapMarker: (id:string) => void;
    closeMapMarkerCard: () => void;
    setChangeMapMarkerPosition: (changeMapMarkerPosition:boolean) => void;
}
export default function UpdateMapMarkerForm(props:Readonly<UpdateMapMarkerCardProps>):React.ReactElement {
    const [formData, setFormData] = useState<MapMarker>(emptyMapMarker);
    const [changingPosition, setChangingPosition] = useState<boolean>(false);
    const nodeRef = React.useRef(null);

    useEffect(():void => {
        setFormData(props.mapMarker);
    }, [props]);

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>):void {
        setFormData(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        )
    }

    function toggleChangingPosition(event: React.MouseEvent<HTMLElement>):void {
        event.preventDefault();
        setChangingPosition(!changingPosition);
        props.setChangeMapMarkerPosition(!changingPosition);
    }

    function handleUpdateMapMarker(event: React.MouseEvent<HTMLElement>):void {
        event.preventDefault();
        props.updateMapMarker(formData);
        props.closeMapMarkerCard();
    }

    function handleDeleteMapMarker():void {
        if (window.confirm("Möchten Sie dieses Produkt wirklich löschen?")) {
            props.deleteMapMarker(formData.id);
            props.closeMapMarkerCard();
        }
    }

    return (
        <Draggable
            handle="strong"
            defaultPosition={{x:100, y:200}}
        >
            <div className={"updateMapMarkerFormFrame"}>
                <HeaderDraggableFrame
                    title={"Marker bearbeiten"}
                    closeWindow={props.closeMapMarkerCard}
                    nodeRef={nodeRef}
                />

                <form className={"updateMapMarkerForm"}>
                    <div>
                    <label htmlFor={"name"}>Name: </label>
                        <input id={"name"} name={"name"}
                               type={"text"}
                               value={formData.name}
                               onChange={handleChangeInput}/>
                    </div>
                    <p><button onClick={toggleChangingPosition}>Marker verschieben</button>
                    {changingPosition &&
                        <button onClick={toggleChangingPosition}>Abbrechen</button>
                    }</p>
                    <p><button onClick={handleUpdateMapMarker}>Übernehmen</button></p>
                    <p><button className={"deleteButton"} onClick={handleDeleteMapMarker}>Löschen</button></p>
                </form>
            </div>
        </Draggable>
    )
}
