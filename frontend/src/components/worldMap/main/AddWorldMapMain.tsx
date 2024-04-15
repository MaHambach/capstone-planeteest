import React from "react";
import {WorldMapDto} from "../../../types/WorldMapDto.ts";
import SaveWorldMapForm from "../parts/SaveWorldMapForm.tsx";
import {Paper} from "@mui/material";

type NewWorldMapFormProps = {
    saveWorldMap: (worldMapDto:WorldMapDto) => void;
}
export default function AddWorldMapMain(props:Readonly<NewWorldMapFormProps>):React.ReactElement {

    return (
        <main>
            <Paper sx={{p:2, m:-2}}>
                <h2>Neue Weltkarte anlegen</h2>
                <SaveWorldMapForm
                    data={{}}
                    functions={{saveWorldMap: props.saveWorldMap}}
                    props={{}}
                />
            </Paper>
        </main>
    )
}
