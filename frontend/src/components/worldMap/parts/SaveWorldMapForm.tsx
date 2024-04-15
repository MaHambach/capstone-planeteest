import "./SaveWorldMapForm.css";
import {Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import {Button, ButtonGroup, Grid, Sheet} from "@mui/joy";
import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {emptyWorldMap, WorldMap} from "../../../types/WorldMap.ts";
import {getWorldMapById} from "../../../utility/getById.ts";


type Data={
    worldMaps?:WorldMap[];
}
type Functions = {
    deleteWorldMap?:(id:string) => void;
    saveWorldMap:(worldMap:WorldMap) => void;
}
type Props = {
    worldMapId?:string;
}
type SaveWorldMapFormProps = {
    data:Data;
    functions:Functions;
    props:Props;
}
export default function SaveWorldMapForm({data, functions, props}:Readonly<SaveWorldMapFormProps>):React.ReactElement {
    const [formData, setFormData] = useState<WorldMap>(emptyWorldMap);
    const navigate = useNavigate();
    const img = new Image();

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>):void {
        if(event.target.name === "worldMapUrl") img.src = event.target.value;

        setFormData(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        )
    }

    useEffect(() => {
        if(props.worldMapId && data.worldMaps) setFormData(getWorldMapById(props.worldMapId, data.worldMaps));
        // eslint-disable-next-line
    }, [data]);

    img.onload = function() {
        formData.xSize = img.width;
        formData.ySize = img.height;
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        functions.saveWorldMap({...formData});
        navigate('/')
    }

    function handleDeleteWorldMap(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        if(props.worldMapId && functions.deleteWorldMap){
            if (window.confirm("Möchten Sie die Weltkarte" + formData.name + " wirklich löschen?")) {
                functions.deleteWorldMap(props.worldMapId);
                navigate("/");
            }
        }
    }

    return (
        <Grid container spacing={1.5} sx={{ flexGrow: 1 }}>
            <Grid xs={6}>
                <form onSubmit={handleSubmit}
                      className={"SaveWorldMapForm_Form"}>
                    <Table size={"small"}>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <label htmlFor={"name"}><b>Name:</b></label>
                                </TableCell>
                                <TableCell colSpan={2}>
                                    <TextField
                                        id={"name"} name={"name"}
                                        type={"text"}
                                        value={formData.name}
                                        onChange={handleChangeInput}
                                        size={"small"}
                                        sx={{width: "100%"}}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <label htmlFor={"worldMapUrl"}><b>URL:</b></label>
                                </TableCell>
                                <TableCell colSpan={2}>
                                    <TextField
                                        id={"worldMapUrl"}
                                        name={"worldMapUrl"}
                                        type={"text"}
                                        value={formData.worldMapUrl}
                                        onChange={handleChangeInput}
                                        size={"small"}
                                        sx={{width: "100%"}}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <label htmlFor={"xSize"}><b>Breite:</b></label>
                                </TableCell>
                                <TableCell colSpan={2}>
                                    <span>{formData.xSize}</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <label htmlFor={"ySize"}><b>Höhe:</b></label>
                                </TableCell>
                                <TableCell colSpan={2}>
                                    <span>{formData.ySize}</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <ButtonGroup sx={{display: "flex", justifyContent: "flex-end"}}>
                                        <Button color={"neutral"} type={"submit"}>Speichern</Button>
                                        <Button color={"neutral"}
                                                onClick={() => navigate('/')}>Abbrechen</Button>
                                        {functions.deleteWorldMap &&
                                            <Button color={"danger"} onClick={handleDeleteWorldMap}
                                                 type={"button"}>Löschen</Button>
                                        }
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </form>
            </Grid>
            <Grid xs={6}>
                <Sheet sx={{p: 1, display: "flex", flexDirection: "row", height: "205px"}} variant="outlined">
                    <b>Vorschau:</b>
                    <img src={formData.worldMapUrl}
                         alt={"Weltkarte"}
                         className={"SaveWorldMapForm_worldMapImage"}
                    />
                </Sheet>
            </Grid>
        </Grid>
    )
}
