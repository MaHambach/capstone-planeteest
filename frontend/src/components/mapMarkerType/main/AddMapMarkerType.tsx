import React from "react";
import {emptyMapMarkerTypeDto, MapMarkerTypeDto} from "../../../types/MapMarkerTypeDto.ts";
import {useNavigate} from "react-router-dom";
import ChangeMapMarkerType from "../part/ChangeMapMarkerType.tsx";

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
            <ChangeMapMarkerType
                handleSubmit={handleSubmit}
                initialValue={emptyMapMarkerTypeDto}
                isDeleteAble={false}
                handleDeleteMapMarkerType={() => {}}
                handleCancel={() => navigate('/mapMarkerType')}
            />
        </main>
    )
}
