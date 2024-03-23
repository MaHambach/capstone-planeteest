import './UpdateMapMarkerButton.css';
import React, {useState} from "react";
import {BsFillGearFill} from "react-icons/bs";


type UpdateMapMarkerButtonProps = {
    handleUpdateMapMarker: ()=> void;
}
export default function UpdateMapMarkerButton(props:Readonly<UpdateMapMarkerButtonProps>):React.ReactElement {
    const [isActive, setIsActive] = useState<boolean>(false);
    function handleClick(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        props.handleUpdateMapMarker()
        setIsActive(!isActive);
    }

    return (
            <button className={isActive ? "updateMapMarkerButtonActive" : "updateMapMarkerButton"}
                    onClick={handleClick}>
                <BsFillGearFill />
            </button>
    )
}
