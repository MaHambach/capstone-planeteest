import "./DisplayTileGallery.css";
import React from "react";
import {TileAble} from "../../../types/TileAble.ts";
import DisplayTile from "./DisplayTile.tsx";

type DisplayTileGalleryProps = {
    cantAddNew?: boolean;
    urlPrefix: string;
    tileData: TileAble[];
    addNewName: string;
    addNewUrl: string;
    tileSize:number;
    color?:string;
    updateUrlPrefix?:string;
    updateUrlSuffix?:string;
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
                        backgroundColor={props.color ? props.color : "white"}
                        updateUrl={props.updateUrlPrefix ? props.updateUrlPrefix + tile.id + props.updateUrlSuffix : undefined}
                    />
                );
            })}
            {!props.cantAddNew &&
                <DisplayTile
                    name={props.addNewName}
                    url={props.addNewUrl}
                    tileSize={props.tileSize}
                    backgroundColor={props.color ? props.color : "white"}
                />
            }
        </div>
    );
}
