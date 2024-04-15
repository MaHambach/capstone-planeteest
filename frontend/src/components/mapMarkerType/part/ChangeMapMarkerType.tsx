import "./ChangeMapMarkerType.css";
import MapMarkerTypeIconTile from "./MapMarkerTypeIconTile.tsx";
import MapMarkerTypeIconGallery from "./MapMarkerTypeIconGallery.tsx";
import {mapMarkerTypeIconList} from "../../../data/MapMarkerTypeIconList.ts";
import MapMarkerTypeColorGallery from "./MapMarkerTypeColorGallery.tsx";
import {mapMarkerTypeColorList} from "../../../data/MapMarkerTypeColorList.ts";
import React, {useState} from "react";
import {MapMarkerTypeDto} from "../../../types/MapMarkerTypeDto.ts";

type ChangeMapMarkerTypeProps = {
    handleSubmit: (mapMarkerTypeDto:MapMarkerTypeDto) => void;
    initialValue: MapMarkerTypeDto;
    isUpdating?: boolean;
    handleDeleteMapMarkerType?: (event: React.MouseEvent<HTMLElement>) => void;
    handleCancel: () => void;
}

export default function ChangeMapMarkerType (props:Readonly<ChangeMapMarkerTypeProps>):React.ReactElement {
    const [formData, setFormData] = useState(props.initialValue);

    function handleChangeIcon(icon:string):void {
        setFormData(
            {
                ...formData,
                icon: icon
            }
        )
    }

    function handleChangeFilterColor(color:string):void {
        setFormData(
            {
                ...formData,
                color: color
            }
        )
    }

    function handleChangeName(event: React.ChangeEvent<HTMLInputElement>):void {
        setFormData(
            {
                ...formData,
                name: event.target.value
            }
        )
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        props.handleSubmit(formData);
    }

    return (
        <div className={"changeMapMarkerType"}>
            <div className={"changeMapMarkerTypeTop"}>
                <form className={"addMapMarkerTypeForm"} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor={"name"}>Name:</label>
                        <input id={"name"} name={"name"} type={"text"} value={formData.name}
                               onChange={handleChangeName}/>
                    </div>
                    <p>
                        <button type={"submit"}>Speichern</button>
                    </p>
                    <p>
                        <button onClick={() => props.handleCancel()}>Abbrechen</button>
                    </p>
                    <p>
                        {props.isUpdating && <button className={"deleteButton"} onClick={props.handleDeleteMapMarkerType}>Löschen</button>}
                    </p>
                </form>
                <div>
                    <h2 className={"changeMapMarkerTypeTitle"}>Vorschau:</h2>
                    <MapMarkerTypeIconTile
                        iconName={formData.icon}
                        handleClick={function () {
                        }}
                        shadowColor={formData.color}
                        tileSize={50}
                    />
                </div>
            </div>
            <div className={"changeMapMarkerTypeSelectionGalleries"}>
                <div className={"addMapMarkerTypeIconGallery"}>
                    <h2>Icon: </h2>
                    <MapMarkerTypeIconGallery iconList={mapMarkerTypeIconList} setIcon={handleChangeIcon}/>
                </div>
                <div className={"addMapMarkerTypeColorGallery"}>
                    <h2>Aura Farbe:</h2>
                    <MapMarkerTypeColorGallery colorList={mapMarkerTypeColorList} setColor={handleChangeFilterColor}/>
                </div>
            </div>
        </div>
    )
}
