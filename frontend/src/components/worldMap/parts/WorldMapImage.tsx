import './WorldMapImage.css';
import {WorldMap} from "../../../types/WorldMap.ts";
import React from "react";

type WorldMapImageProps = {
    worldMap: WorldMap | undefined,
    worldMapClick: (e: React.MouseEvent<HTMLImageElement>) => void
}
export default function WorldMapImage(props: Readonly<WorldMapImageProps>): React.ReactElement {
    return (
        <img
            onClick={props.worldMapClick}
            className={"worldMap"}
            src={props.worldMap?.worldMapUrl}
            alt={props.worldMap?.name}
        />
    )
}