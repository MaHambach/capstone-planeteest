import "./DisplayTile.css";
import React from "react";
import {Link} from "react-router-dom";

type DisplayTileProps = {
    name: string;
    url: string;
}

export default function DisplayTile(props:Readonly<DisplayTileProps>):React.ReactElement{

    return (
        <form className={"displayTile"}>
            <Link className={"displayTile_Link"} to={props.url}>
                <h2 className={"name"}>{props.name}</h2>
            </Link>
        </form>
)
}