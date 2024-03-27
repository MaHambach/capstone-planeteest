import React, {useState} from "react";
import MapMarkerTypeIconGallery from "../part/MapMarkerTypeIconGallery.tsx";
import {mapMarkerTypeIconList} from "../../../data/MapMarkerTypeIconList.ts";
import MapMarkerTypeColorGallery from "../part/MapMarkerTypeColorGallery.tsx";
import {mapMarkerTypeColorList} from "../../../data/MapMarkerTypeColorList.ts";
import MapMarkerTypeIconTile from "../part/MapMarkerTypeIconTile.tsx";
import {emptyMapMarkerTypeDto, MapMarkerTypeDto} from "../../../types/MapMarkerTypeDto.ts";
import {useNavigate} from "react-router-dom";

type AddMapMarkerTypeProps = {
    saveMapMarkerType: (mapMarkerTypeDto:MapMarkerTypeDto) => void;
}
export default function AddMapMarkerType(props:Readonly<AddMapMarkerTypeProps>):React.ReactElement {
    const [formData, setFormData] = useState(emptyMapMarkerTypeDto);
    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        props.saveMapMarkerType(formData);
    }

    function handleChangeIcon(icon:string):void {
        setFormData(
            {
                ...formData,
                icon: icon
            }
        )
    }

    function handleChangeColor(color:string):void {
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



    return (
        <main className={"addMapMarkerType"}>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor={"name"}>Name:</label>
                <input id={"name"} name={"name"} type={"text"} value={formData.name} onChange={handleChangeName}/>
                </div>
                <p><button type={"submit"}>Speichern</button></p>
                <p><button onClick={() => navigate('/mapMarkerType')}>Abbrechen</button></p>
            </form>
            <div>
                <h2>Vorschau:</h2>
                <MapMarkerTypeIconTile iconName={formData.icon} handleClick={function () { }} color={formData.color} tileSize={220}/>
            </div>
            <div className={"addMapMarkerTypeIconGallery"}>
                <MapMarkerTypeIconGallery iconList={mapMarkerTypeIconList} setIcon={handleChangeIcon}/>
            </div>
            <div className={"addMapMarkerTypeColorGallery"}>
                <MapMarkerTypeColorGallery colorList={mapMarkerTypeColorList} setColor={handleChangeColor}/>
            </div>
        </main>
    )
}