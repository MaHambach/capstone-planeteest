import "./DisplayTile.css";
import React from "react";
import {useNavigate} from "react-router-dom";

type DisplayTileProps = {
    name: string;
    image?: string;
    url: string;
    width:number;
    height:number;
}

export default function DisplayTile(props:Readonly<DisplayTileProps>):React.ReactElement{
    const navigate = useNavigate();

    return (
        <button className={"displayTile"} onClick={() => navigate(props.url)} style={{width: props.width, height:props.height}}>
            <h2 className={"name"}>{props.name}</h2>
            {props.image && <img className={"characterCard_Image"} src={props.image} alt={""}/>}
        </button>
    )
}
