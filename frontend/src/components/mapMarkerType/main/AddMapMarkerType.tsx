import "./AddMapMarkerType.css";
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
        navigate('/mapMarkerType');
    }

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

    return (
        <main className={"addMapMarkerType"}>
            <div className={"addMapMarkerTypeTop"}>
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
                        <button onClick={() => navigate('/mapMarkerType')}>Abbrechen</button>
                    </p>
                </form>
                <div>
                    <h2>Vorschau:</h2>
                    <MapMarkerTypeIconTile
                        iconName={formData.icon}
                        handleClick={function () {}}
                        borderColor={formData.color}
                        tileSize={50}
                    />
                </div>
            </div>
            <div className={"addMapMarkerTypeSelectionGalleries"}>
                <div className={"addMapMarkerTypeIconGallery"}>
                    <h2>Icon: </h2>
                    <MapMarkerTypeIconGallery iconList={mapMarkerTypeIconList} setIcon={handleChangeIcon}/>
                </div>
                <div className={"addMapMarkerTypeColorGallery"}>
                    <h2>Aura Farbe:</h2>
                    <MapMarkerTypeColorGallery colorList={mapMarkerTypeColorList} setColor={handleChangeFilterColor}/>
                </div>
            </div>
        </main>
    )
}