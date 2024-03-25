import './UpdateMapMarkerButton.css';
import React from "react";
import {BsFillGearFill} from "react-icons/bs";


type UpdateMapMarkerButtonProps = {
    handleUpdateMapMarker: ()=> void;
}
export default function UpdateMapMarkerButton(props:Readonly<UpdateMapMarkerButtonProps>):React.ReactElement {
    function handleClick(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        props.handleUpdateMapMarker()
    }

    return (
            <button className={"updateMapMarkerButton"}
                    onClick={handleClick}>
                <BsFillGearFill />
            </button>
    )
}
