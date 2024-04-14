import './MapMarkerUpdateWindow.css';
import {emptyMapMarker, MapMarker} from "../../../types/MapMarker.ts";
import React, {useEffect, useState} from "react";
import DraggableSubWindow from "../../_generic/draggable/DraggableSubWindow.tsx";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import {GiPadlock, GiPadlockOpen} from "react-icons/gi";
import {Button, Table, TableBody, TableContainer, TableRow, TextField} from "@mui/material";
import {Sheet} from "@mui/joy";
import {StyledTableCell} from "../../_generic/parts/StyledTableCell.tsx";
import MapMarkerTypeSelect from "../../mapMarkerType/part/MapMarkerTypeSelect.tsx";
import IconSwitch from "../../_generic/parts/IconSwitch.tsx";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";

type Data = {
    mapMarkerTypes: MapMarkerType[];
}
type Functions = {
    updateMapMarker: () => void;
    deleteMapMarker: (id:string) => void;
    closeMapMarkerCard: () => void;
    setSelectedMapMarker: (mapMarker:MapMarker) => void;
    setChangeMapMarkerPosition: (changeMapMarkerPosition:boolean) => void;
}
type Props = {
    mapMarker: MapMarker;
}
type MapMarkerUpdateWindowProps = {
    data: Data;
    functions: Functions;
    props: Props;
}
export default function MapMarkerUpdateWindow({data, functions, props}:Readonly<MapMarkerUpdateWindowProps>):React.ReactElement {
    const [formData, setFormData] = useState<MapMarker>(emptyMapMarker);
    const [changingPosition, setChangingPosition] = useState<boolean>(false);

    useEffect(():void => {
        setFormData(props.mapMarker);
    }, [props]);

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement> |
                                      React.ChangeEvent<HTMLSelectElement> |
                                      React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void {
        functions.setSelectedMapMarker(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        )
    }

    function setMapMarkerTypeId(mapMarkerTypeId:string):void {
        functions.setSelectedMapMarker(
            {
                ...formData,
                markerTypeId: mapMarkerTypeId
            }
        )
    }

    function setMapMarkerVisibility(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        functions.setSelectedMapMarker(
            {
                ...formData,
                visibility: formData.visibility === "OWNER_ONLY" ? "OWNER_AND_OBSERVERS" : "OWNER_ONLY"
            }
        )
    }

    function toggleChangingPosition(event: React.MouseEvent<HTMLElement>):void {
        event.preventDefault();
        setChangingPosition(!changingPosition);
        functions.setChangeMapMarkerPosition(!changingPosition);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        functions.updateMapMarker();
        functions.closeMapMarkerCard();
    }

    function handleDeleteMapMarker():void {
        if (window.confirm("Möchten Sie diesen MapMarker und seine zugehörigen Artikel wirklich löschen?")) {
            functions.deleteMapMarker(formData.id);
            functions.closeMapMarkerCard();
        }
    }

    return (
        <DraggableSubWindow
            functions={{closeFrame: functions.closeMapMarkerCard}}
            props={{
                title: "Update MapMarker",
                initialPosition: {
                    left:props.mapMarker.xPosition - 250,
                    top:props.mapMarker.yPosition,
                    width:250,
                    height:245
                }
            }}
        >
            <form className={"mapMarkerUpdateWindow"} onSubmit={handleSubmit}>
                <TableContainer component={Sheet}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <StyledTableCell align={"center"} colSpan={3}>
                                    <TextField
                                        id={"name"}
                                        name={"name"}
                                        type={"text"}
                                        label={"Name"}
                                        value={formData.name}
                                        onChange={handleChangeInput}
                                        placeholder={"Name"}
                                        size={"small"}
                                    />
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align={"center"}>
                                    <MapMarkerTypeSelect
                                        data={{mapMarkerTypes: data.mapMarkerTypes}}
                                        functions={{onClick: setMapMarkerTypeId}}
                                        props={{value: props.mapMarker.markerTypeId}}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align={"center"}>
                                    <IconSwitch
                                        data={{
                                            tooltipLeft:"Sichtbar für mich",
                                            tooltipRight:"Sichtbar für alle",
                                            name: "visibility",
                                            valueLeft: "OWNER_ONLY",
                                            valueRight: "OWNER_AND_OBSERVERS"
                                        }}
                                        functions={{
                                            onClick: setMapMarkerVisibility
                                        }}
                                        props={{
                                            iconLeft:<MdVisibilityOff/>,
                                            iconRight:<MdVisibility/>,
                                        }}/>
                                </StyledTableCell>
                                <StyledTableCell align={"center"}>
                                    <IconSwitch
                                        data={{
                                            tooltipLeft:"MapMarker ist fest",
                                            tooltipRight:"MapMarker lässt sich bewegen",
                                            name: "visibility",
                                            valueLeft: "OWNER_ONLY",
                                            valueRight: "OWNER_AND_OBSERVERS"
                                        }}
                                        functions={{
                                            onClick: toggleChangingPosition
                                        }}
                                        props={{
                                            iconLeft:<GiPadlock/>,
                                            iconRight:<GiPadlockOpen/>,
                                        }}/>
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell>
                                </StyledTableCell>
                                <StyledTableCell align={"right"} colSpan={2}>
                                    <Button type={"submit"}>Übernehmen</Button>
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell>
                                </StyledTableCell>
                                <StyledTableCell align={"right"} colSpan={2}>
                                    <Button color={"error"} onClick={handleDeleteMapMarker}>Löschen</Button>
                                </StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
        </DraggableSubWindow>
    )
}
