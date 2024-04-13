import './MapMarkerUpdateWindow.css';
import {emptyMapMarker, MapMarker} from "../../../types/MapMarker.ts";
import React, {useEffect, useState} from "react";
import DraggableSubWindow from "../../_generic/draggable/DraggableSubWindow.tsx";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import {GiPadlock, GiPadlockOpen} from "react-icons/gi";

type Data = {
    mapMarkerTypes: MapMarkerType[];
}
type Functions = {
    updateMapMarker: () => void;
    deleteMapMarker: (id:string) => void;
    closeMapMarkerCard: () => void;
    setSelectedMapMarker: (mapMarker:MapMarker) => void;
    setChangeMapMarkerPosition: (changeMapMarkerPosition:boolean) => void;
}
type Props = {
    mapMarker: MapMarker;
}
type MapMarkerUpdateWindowProps = {
    data: Data;
    functions: Functions;
    props: Props;
}
export default function MapMarkerUpdateWindow({data, functions, props}:Readonly<MapMarkerUpdateWindowProps>):React.ReactElement {
    const [formData, setFormData] = useState<MapMarker>(emptyMapMarker);
    const [changingPosition, setChangingPosition] = useState<boolean>(false);

    useEffect(():void => {
        setFormData(props.mapMarker);
    }, [props]);

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>):void {
        functions.setSelectedMapMarker(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        )
    }

    function toggleChangingPosition(event: React.MouseEvent<HTMLElement>):void {
        event.preventDefault();
        setChangingPosition(!changingPosition);
        functions.setChangeMapMarkerPosition(!changingPosition);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        functions.updateMapMarker();
        functions.closeMapMarkerCard();
    }

    function handleDeleteMapMarker():void {
        if (window.confirm("Möchten Sie diesen MapMarker und seine zugehörigen Artikel wirklich löschen?")) {
            functions.deleteMapMarker(formData.id);
            functions.closeMapMarkerCard();
        }
    }

    return (
        <DraggableSubWindow
            functions={{closeFrame: functions.closeMapMarkerCard}}
            props={{
                title: "Update MapMarker",
                initialPosition: {
                    left:props.mapMarker.xPosition - 250,
                    top:props.mapMarker.yPosition,
                    width:300,
                    height:300
                }
            }}
        >
            <form className={"mapMarkerUpdateWindow"} onSubmit={handleSubmit}>
                <div className={"mapMarkerUpdateDiv"}>
                    <label htmlFor={"name"}>Name: </label>
                    <input id={"name"} name={"name"}
                           type={"text"}
                           value={formData.name}
                           onChange={handleChangeInput}/>
                </div>
                <div className={"mapMarkerUpdateDiv"}>
                    <label htmlFor={"markerTypeId"}>Typ: </label>
                    <select id={"markerTypeId"} name={"markerTypeId"} value={formData.markerTypeId}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => functions.setSelectedMapMarker({
                                ...formData,
                                markerTypeId: e.target.value
                            })}>
                        {data.mapMarkerTypes.map((mapMarkerType: MapMarkerType) => {
                            return <option key={mapMarkerType.id}
                                           value={mapMarkerType.id}>
                                {mapMarkerType.name}
                            </option>
                        })}
                    </select>
                </div>
                <div className={"mapMarkerUpdateDiv"}>
                    <button
                        className={changingPosition ?
                            "mapMarkerPositionDivMarkerPositionButton_changeable" :
                            "mapMarkerPositionDivMarkerPositionButton"}
                        onClick={toggleChangingPosition}>Marker Position
                    </button>
                    <div
                        className={changingPosition ?
                            "mapMarkerPositionDivPadlockClosed_changeable" :
                            "mapMarkerPositionDivPadlockClosed"}><GiPadlock/></div>
                    <div
                        className={changingPosition ?
                            "mapMarkerPositionDivPadlockOpen_changeable" :
                            "mapMarkerPositionDivPadlockOpen"}><GiPadlockOpen/></div>
                </div>
                <div className={"mapMarkerUpdateDiv"}>
                    <label htmlFor={"Visibility"}>Sichtbarkeit: </label>
                    <select id={"visibility"} name={"visibility"} value={formData.visibility} onChange={handleChangeInput}>
                        <option value={"OWNER_ONLY"}>OWNER_ONLY</option>
                        <option value={"OWNER_AND_OBSERVERS"}>OWNER_AND_OBSERVERS</option>
                    </select>
                </div>
                <div className={"mapMarkerUpdateDiv"}>
                    <button type={"submit"}>Übernehmen</button>
                </div>
                <div className={"mapMarkerUpdateDiv"}>
                    <button className={"deleteButton"} onClick={handleDeleteMapMarker}>Löschen</button>
                </div>
            </form>
        </DraggableSubWindow>
    )
}
