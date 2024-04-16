import React from "react";
import {WorldMapDto} from "../../../types/WorldMapDto.ts";
import SaveWorldMapForm from "../parts/SaveWorldMapForm.tsx";
import Typography from "@mui/joy/Typography";

type NewWorldMapFormProps = {
    saveWorldMap: (worldMapDto:WorldMapDto) => void;
}
export default function AddWorldMapMain(props:Readonly<NewWorldMapFormProps>):React.ReactElement {

    return (
        <main>
            <Typography level={"h2"}
                        sx={{p:1}}
            >
                Neue Weltkarte anlegen
            </Typography>
            <SaveWorldMapForm
                data={{}}
                functions={{saveWorldMap: props.saveWorldMap}}
                props={{}}
            />
        </main>
    )
}
