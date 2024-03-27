import './MapMarkerUpdateWindow.css';
import {emptyMapMarker, MapMarker} from "../../../types/MapMarker.ts";
import React, {useEffect, useState} from "react";
import DraggableSubWindow from "../../parts/DraggableSubWindow.tsx";

type MapMarkerUpdateWindowProps = {
    mapMarker: MapMarker;
    updateMapMarker: () => void;
    deleteMapMarker: (id:string) => void;
    closeMapMarkerCard: () => void;
    setSelectedMapMarker: (mapMarker:MapMarker) => void;
    setChangeMapMarkerPosition: (changeMapMarkerPosition:boolean) => void;
}
export default function MapMarkerUpdateWindow(props:Readonly<MapMarkerUpdateWindowProps>):React.ReactElement {
    const [formData, setFormData] = useState<MapMarker>(emptyMapMarker);
    const [changingPosition, setChangingPosition] = useState<boolean>(false);

    useEffect(():void => {
        setFormData(props.mapMarker);
    }, [props]);

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>):void {
        props.setSelectedMapMarker(
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
        props.updateMapMarker();
        props.closeMapMarkerCard();
    }

    function handleDeleteMapMarker():void {
        if (window.confirm("Möchten Sie dieses Produkt wirklich löschen?")) {
            props.deleteMapMarker(formData.id);
            props.closeMapMarkerCard();
        }
    }

    return (
        <DraggableSubWindow
            closeFrame={props.closeMapMarkerCard}
            initialPosition={{
                left:props.mapMarker.xPosition - 200,
                top:props.mapMarker.yPosition,
                width:200,
                height:200
            }}
        >
            <form className={"mapMarkerUpdateWindow"}>
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
        </DraggableSubWindow>
    )
}