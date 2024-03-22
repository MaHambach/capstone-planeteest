import {WorldMap} from "../../../types/WorldMap.ts";
import React from "react";

type WorldMapImageProps = {
    worldMap: WorldMap;
    handleWorldMapClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function WorldMapImage(props: Readonly<WorldMapImageProps>): React.ReactElement {

    return (
        <div className={"worldMapImage"}>
            <img
                onClick={props.handleWorldMapClick}
                role={"presentation"} /* Suppresses sonarLint protests. */
                src={props.worldMap.worldMapUrl}
                alt={props.worldMap.name}
            />
        </div>
    )
}
