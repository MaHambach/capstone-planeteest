import './UpdateMapMarkerButton.css';
import React from "react";
import {BsFillGearFill} from "react-icons/bs";


type UpdateMapMarkerButtonProps = {
    handleMapMarkerUpdate: ()=> void;
}
export default function UpdateMapMarkerButton(props:Readonly<UpdateMapMarkerButtonProps>):React.ReactElement {
    function handleClick(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        props.handleMapMarkerUpdate()
    }

    return (
            <button className={"updateMapMarkerButton"}
                    onClick={handleClick}>
                <BsFillGearFill />
            </button>
    )
}
