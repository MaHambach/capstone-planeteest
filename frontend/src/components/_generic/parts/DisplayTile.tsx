import "./DisplayTile.css";
import React from "react";
import {useNavigate} from "react-router-dom";

type DisplayTileProps = {
    name: string;
    image?: string;
    backgroundColor?: string;
    url: string;
    tileSize:number;
}

export default function DisplayTile(props:Readonly<DisplayTileProps>):React.ReactElement{
    const navigate = useNavigate();

    const displayTileStyle = {
        width: props.tileSize,
        height: props.tileSize,
        backgroundColor: "white"
    }
    if(props.backgroundColor){
        displayTileStyle.backgroundColor = props.backgroundColor;
    }


    return (
        <button
            className={"displayTile"}
            onClick={() => navigate(props.url)}
            style={displayTileStyle}
        >
            <h2 className={"name"}>{props.name}</h2>
            {props.image && <img className={"characterCard_Image"} src={props.image} alt={""}/>}
        </button>
    )
}
