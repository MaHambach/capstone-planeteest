import './WorldMapMain.css';
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {WorldMap} from "../../../types/WorldMap.ts";
import WorldMapImage from "../parts/WorldMapImage.tsx";

type WorldMapMainProps = {
    getWorldMap: (id:string) => WorldMap;
}

export default function WorldMapMain(props:Readonly<WorldMapMainProps>):React.ReactElement{
    const {id= ''} = useParams<string>();
    const [worldMap, setWorldMap] = useState<WorldMap>();

    useEffect(() => setWorldMap(props.getWorldMap(id)), [id, props]);

    function worldMapClick(e: React.MouseEvent):void {
        console.log("World map clicked at x: " + e.nativeEvent.offsetX + ", y: " + e.nativeEvent.offsetY);

    }

    return (
        <main className={"worldMapMain"}>
            <WorldMapImage worldMap={worldMap} worldMapClick={worldMapClick}/>
        </main>
    )
}