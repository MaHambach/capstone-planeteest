import './MapMarkerUpdateWindow.css';
import {emptyMapMarker, MapMarker} from "../../../types/MapMarker.ts";
import React, {useEffect, useState} from "react";
import DraggableSubWindow from "../../_generic/parts/DraggableSubWindow.tsx";

type MapMarkerUpdateWindowProps = {
    mapMarker: MapMarker;
    updateMapMarker: () => void;
    deleteMapMarker: (id:string) => void;
    closeMapMarkerCard: () => void;
    setSelectedMapMarker: (mapMarker:MapMarker) => void;
    setChangeMapMarkerPosition: (changeMapMarkerPosition:boolean) => void;
    deleteArticle: (id:string) => void;
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

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        props.updateMapMarker();
        props.closeMapMarkerCard();
    }

    function handleDeleteMapMarker():void {
        if (window.confirm("Möchten Sie diesen MapMarker und seinen zugehörigen Artikel wirklich löschen?")) {
            props.deleteMapMarker(formData.id);
            props.deleteArticle(formData.articleId);
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
            <form className={"mapMarkerUpdateWindow"} onSubmit={handleSubmit}>
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
                <p><button type={"submit"}>Übernehmen</button></p>
                <p><button className={"deleteButton"} onClick={handleDeleteMapMarker}>Löschen</button></p>
            </form>
        </DraggableSubWindow>
    )
}
