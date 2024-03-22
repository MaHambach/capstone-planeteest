import './UpdateMapMarkerForm.css';
import {emptyMapMarker, MapMarker} from "../../../types/MapMarker.ts";
import React, {useEffect, useState} from "react";

type UpdateMapMarkerCardProps = {
    mapMarker: MapMarker;
    updateMapMarker: (mapMarker: MapMarker) => void;
    closeMapMarkerCard: () => void;
    setChangeMapMarkerPosition: (changeMapMarkerPosition:boolean) => void;
}
export default function UpdateMapMarkerForm(props:Readonly<UpdateMapMarkerCardProps>):React.ReactElement {
    const [formData, setFormData] = useState<MapMarker>(emptyMapMarker);
    const [changingPosition, setChangingPosition] = useState<boolean>(false);

    useEffect(() => {
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

    function handleUpdateMarker(event: React.MouseEvent<HTMLElement>):void {
        event.preventDefault();
        props.updateMapMarker(formData);
    }

    return (
        <form className={"updateMapMarkerForm"}>
            <div>
                <label htmlFor={"name"}>Name: </label>
                <input id={"name"} name={"name"}
                       type={"text"}
                       value={formData.name}
                       onChange={handleChangeInput}/>
            </div>
            <button onClick={toggleChangingPosition}>Marker verschieben</button>
            {changingPosition &&
                <button onClick={toggleChangingPosition}>Abbrechen</button>
            }
            <button onClick={handleUpdateMarker}>Übernehmen</button>
            <button onClick={props.closeMapMarkerCard}>Schließen</button>
        </form>
    )
}
