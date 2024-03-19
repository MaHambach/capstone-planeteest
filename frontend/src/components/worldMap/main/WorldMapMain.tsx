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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const rect = e.target.getBoundingClientRect();
        console.log("Left? : " + (e.clientX - rect.left) + " ; Top? : " + (e.clientY - rect.top) + ".");
    }

    return (
        <main className={"worldMapMain"}>
            <WorldMapImage worldMap={worldMap} worldMapClick={worldMapClick}/>
        </main>
    )
}