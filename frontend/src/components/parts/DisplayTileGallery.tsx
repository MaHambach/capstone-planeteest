import "./DisplayTileGallery.css";
import React from "react";
import {TileAble} from "../../types/TileAble.ts";
import DisplayTile from "./DisplayTile.tsx";

type DisplayTileGalleryProps = {
    urlPrefix: string;
    tileData: TileAble[];
    addNewName: string;
    addNewUrl: string;
    tileSize:number;
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
                        tileSize={props.tileSize}
                    />
                );
            })}
            <DisplayTile
                name={props.addNewName}
                url={props.addNewUrl}
                tileSize={props.tileSize}
            />
        </div>
    );
}
