import React from "react";
import {emptyMapMarkerTypeDto, MapMarkerTypeDto} from "../../../types/MapMarkerTypeDto.ts";
import {useNavigate} from "react-router-dom";
import SaveMapMarkerType from "../part/SaveMapMarkerType.tsx";

type AddMapMarkerTypeProps = {
    saveMapMarkerType: (mapMarkerTypeDto:MapMarkerTypeDto) => void;
}
export default function AddMapMarkerType(props:Readonly<AddMapMarkerTypeProps>):React.ReactElement {
    const navigate = useNavigate();

    function handleSubmit(mapMarkerTypeDto:MapMarkerTypeDto):void {
        props.saveMapMarkerType(mapMarkerTypeDto);
        navigate('/mapMarkerType');
    }

    return (
        <main>
            <SaveMapMarkerType
                handleSubmit={handleSubmit}
                initialValue={emptyMapMarkerTypeDto}
                isUpdating={false}
                handleDeleteMapMarkerType={() => {}}
            />
        </main>
    )
}
