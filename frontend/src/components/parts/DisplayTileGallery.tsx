import "./DisplayTileGallery.css";
import React from "react";
import {TileAble} from "../../types/TileAble.ts";
import DisplayTile from "./DisplayTile.tsx";

type DisplayTileGalleryProps = {
    urlPrefix: string;
    tileData: TileAble[];
    addNewName: string;
    addNewUrl: string;
    width:number;
    height:number;
}
export default function DisplayTileGallery(props:Readonly<DisplayTileGalleryProps>): React.ReactElement {
    return (
        <div className="displayTileGallery">
            {props.tileData.map((tile) => {
                return (
                    <DisplayTile
                        key={tile.id}
                        name={tile.name}
                        url={props.urlPrefix + tile.id}
                        width={props.width}
                        height={props.height}
                    />
                );
            })}
            <DisplayTile
                name={props.addNewName}
                url={props.addNewUrl}
                width={props.width}
                height={props.height}
            />
        </div>
    );
}