import "./DisplayTile.css";
import React from "react";
import {useNavigate} from "react-router-dom";

type DisplayTileProps = {
    name: string;
    image: string;
    url: string;
}

export default function DisplayTile(props:Readonly<DisplayTileProps>):React.ReactElement{
    const navigate = useNavigate();

    return (
        <button className={"displayTile"} onClick={() => navigate(props.url)}>
            <h2 className={"name"}>{props.name}</h2>
            <img className={"characterCard_Image"} src={props.image} alt={""}/>
        </button>
    )
}