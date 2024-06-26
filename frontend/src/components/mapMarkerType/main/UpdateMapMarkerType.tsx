import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import SaveMapMarkerType from "../part/SaveMapMarkerType.tsx";
import {MapMarkerTypeDto} from "../../../types/MapMarkerTypeDto.ts";

type UpdateMapMarkerTypeProps = {
    updateMapMarkerType: (mapMarkerType:MapMarkerType) => void;
    getMapMarkerType: (id:string) => MapMarkerType;
    deleteMapMarkerType: (id:string) => void;
}
export default function UpdateMapMarkerType(props:Readonly<UpdateMapMarkerTypeProps>): React.ReactElement {
    const {id= ''} = useParams<string>();
    const navigate = useNavigate();

    function handleSubmit(mapMarkerTypeDto:MapMarkerTypeDto):void {
        props.updateMapMarkerType({
            id: id,
            ...mapMarkerTypeDto        });
        navigate('/mapMarkerType');
    }

    function handleDeleteMapMarkerType(event: React.MouseEvent<HTMLElement>):void {
        event.preventDefault();
        if (window.confirm("Möchten Sie diesen MapMarkerType wirklich löschen?")) {
            props.deleteMapMarkerType(id);
            navigate('/mapMarkerType');
        }
    }

    return (
        <main>
            <SaveMapMarkerType
                handleSubmit={handleSubmit}
                initialValue={props.getMapMarkerType(id)}
                isUpdating={true}
                handleDeleteMapMarkerType={handleDeleteMapMarkerType}
            />
        </main>
    )
}
