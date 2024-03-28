import {emptyMapMarkerType, MapMarkerType} from "../../../types/MapMarkerType.ts";
import React, {useEffect, useState} from "react";
import MapMarkerTypeIconTile from "../part/MapMarkerTypeIconTile.tsx";
import MapMarkerTypeIconGallery from "../part/MapMarkerTypeIconGallery.tsx";
import {mapMarkerTypeIconList} from "../../../data/MapMarkerTypeIconList.ts";
import MapMarkerTypeColorGallery from "../part/MapMarkerTypeColorGallery.tsx";
import {mapMarkerTypeColorList} from "../../../data/MapMarkerTypeColorList.ts";
import {useNavigate, useParams} from "react-router-dom";

type UpdateMapMarkerTypeProps = {
    updateMapMarkerType: (mapMarkerType:MapMarkerType) => void;
    getMapMarkerType: (id:string) => MapMarkerType;
    deleteMapMarkerType: (id:string) => void;
}
export default function UpdateMapMarkerType(props:Readonly<UpdateMapMarkerTypeProps>): React.ReactElement {
    const {id= ''} = useParams<string>();
    const [formData, setFormData] = useState<MapMarkerType>(emptyMapMarkerType);
    const navigate = useNavigate();

    useEffect(() => setFormData(props.getMapMarkerType(id)), [id, props]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        props.updateMapMarkerType(formData);
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


    function handleDeleteMapMarkerType(event: React.MouseEvent<HTMLElement>):void {
        event.preventDefault();
        if (window.confirm("Möchten Sie diesen MapMarkerType wirklich löschen?")) {
            props.deleteMapMarkerType(formData.id);
            navigate('/mapMarkerType');
        }
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
                    <p>
                        <button onClick={handleDeleteMapMarkerType}>Löschen</button>
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
