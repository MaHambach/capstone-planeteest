import "./DisplayTile.css";
import React from "react";
import {useNavigate} from "react-router-dom";
import {BsFillGearFill} from "react-icons/bs";

type DisplayTileProps = {
    name: string;
    image?: string;
    backgroundColor?: string;
    url: string;
    tileSize:number;
    updateUrl?: string;
}

export default function DisplayTile(props:Readonly<DisplayTileProps>):React.ReactElement{
    const [isHovered, setIsHovered] = React.useState(false);
    function handleMouseOver(event:React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>):void {
        event.preventDefault();
        setIsHovered(true)
    }

    function handleMouseOut(event:React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>):void {
        event.preventDefault();
        setIsHovered(false)
    }

    const navigate = useNavigate();

    const displayTileStyle = {
        width: props.tileSize,
        height: props.tileSize,
        backgroundColor: "white"
    }

    if(props.backgroundColor){
        displayTileStyle.backgroundColor = props.backgroundColor;
    }


    const propertiesButtonStyle = {
        width: props.tileSize/5,
        height: props.tileSize/5,
        top: 4 * props.tileSize / 5 -5,
        left: 4 * props.tileSize / 5 -5,
        backgroundColor: "white"
    }

    return (
        <div className={"displayTile"}
             style={displayTileStyle}
             onMouseOver={handleMouseOver}
             onMouseOut={handleMouseOut}
             onFocus={handleMouseOver}
             onBlur={handleMouseOut}
        >
            <button
                className={"displayTileButton"}
                onClick={() => navigate(props.url)}
                style={displayTileStyle}
            >
                <h2 className={"name"}>{props.name}</h2>
                {props.image && <img className={"characterCard_Image"} src={props.image} alt={""}/>}
                <div className={"overlay"}></div>

            </button>
            {(isHovered && props.updateUrl) &&
                <button className={"propertiesButton"}
                        style={propertiesButtonStyle}
                        onClick={() => {if(props.updateUrl) navigate(props.updateUrl)}}>
                    <BsFillGearFill />
                </button>}
        </div>
    )
}
