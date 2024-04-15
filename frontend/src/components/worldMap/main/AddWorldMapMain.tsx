import React from "react";
import {WorldMapDto} from "../../../types/WorldMapDto.ts";
import SaveWorldMapForm from "../parts/SaveWorldMapForm.tsx";

type NewWorldMapFormProps = {
    saveWorldMap: (worldMapDto:WorldMapDto) => void;
}
export default function AddWorldMapMain(props:Readonly<NewWorldMapFormProps>):React.ReactElement {

    return (
        <main>
            <h2>Neue Weltkarte anlegen</h2>
            <SaveWorldMapForm
                data={{}}
                functions={{saveWorldMap: props.saveWorldMap}}
                props={{}}
            />
        </main>
    )
}
