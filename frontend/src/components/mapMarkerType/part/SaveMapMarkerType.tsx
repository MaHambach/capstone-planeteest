import "./SaveMapMarkerType.css";
import MapMarkerTypeIconTile from "./MapMarkerTypeIconTile.tsx";
import MapMarkerTypeIconGallery from "./MapMarkerTypeIconGallery.tsx";
import {mapMarkerTypeIconList} from "../../../data/MapMarkerTypeIconList.ts";
import MapMarkerTypeColorGallery from "./MapMarkerTypeColorGallery.tsx";
import {mapMarkerTypeColorList} from "../../../data/MapMarkerTypeColorList.ts";
import React, {useState} from "react";
import {MapMarkerTypeDto} from "../../../types/MapMarkerTypeDto.ts";
import {Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import {Button, ButtonGroup, Grid} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/joy/Typography";

type ChangeMapMarkerTypeProps = {
    handleSubmit: (mapMarkerTypeDto:MapMarkerTypeDto) => void;
    initialValue: MapMarkerTypeDto;
    isUpdating?: boolean;
    handleDeleteMapMarkerType?: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function SaveMapMarkerType (props:Readonly<ChangeMapMarkerTypeProps>):React.ReactElement {
    const [formData, setFormData] = useState(props.initialValue);
    const navigate = useNavigate();

    function handleChangeIcon(icon:string):void {
        setFormData(
            {
                ...formData,
                icon: icon
            }
        )
    }

    function handleChangeFilterColor(color:string):void {
        setFormData(
            {
                ...formData,
                color: color
            }
        )
    }

    function handleChangeName(event: React.ChangeEvent<HTMLInputElement>):void {
        setFormData(
            {
                ...formData,
                name: event.target.value
            }
        )
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        props.handleSubmit(formData);
    }

    return (
        <div className={"changeMapMarkerType"}>
            <Grid container spacing={1.5}
                  sx={{ flexGrow: 1, m:1.5 }}
                  style={{
                      backgroundColor: "#F5F8FA",
                      width: "100%",
                  }}
            >
                <Grid xs={6}>
                    <form className={"addMapMarkerTypeForm"}
                          onSubmit={handleSubmit}
                          style={{
                              border: "border: 1px solid #CDD7E1",
                          }}
                    >
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
                                            onChange={handleChangeName}
                                            size={"small"}
                                            sx={{width: "100%"}}
                                            style={{backgroundColor: "white"}}
                                            placeholder={"Name"}
                                        />
                                    </TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <ButtonGroup sx={{display: "flex", justifyContent: "flex-end"}}>
                                            <Button color={"neutral"} type={"submit"}>Speichern</Button>
                                            <Button color={"neutral"}
                                                    onClick={() => navigate('/MapMarkerType')}>Abbrechen</Button>
                                            {props.isUpdating &&
                                                <Button color={"danger"} onClick={props.handleDeleteMapMarkerType}
                                                        type={"button"}>Löschen</Button>
                                            }
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </form>
                </Grid>
                <Grid xs={4} justifyContent={"center"}>
                    <Typography level={"h3"} sx={{p:1}}>Vorschau:</Typography>
                    <MapMarkerTypeIconTile
                        iconName={formData.icon}
                        handleClick={function () {
                        }}
                        shadowColor={formData.color}
                        tileSize={50}
                    />
                </Grid>
            </Grid>
            <div>
                <div>
                    <Typography level={"h3"} sx={{p:1}}>Icon:</Typography>
                    <MapMarkerTypeIconGallery iconList={mapMarkerTypeIconList} setIcon={handleChangeIcon}/>
                </div>
                <div>
                    <Typography level={"h3"} sx={{p:1}}>Aura Farbe:</Typography>
                    <MapMarkerTypeColorGallery colorList={mapMarkerTypeColorList} setColor={handleChangeFilterColor}/>
                </div>
            </div>
        </div>
    )
}
