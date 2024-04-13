import "./AddMapMarkerForm.css";
import React, {FormEvent, useEffect, useState} from "react";
import {emptyMapMarkerDto, MapMarkerDto} from "../../../types/MapMarkerDto.ts";
import DraggableSubWindow from "../../_generic/draggable/DraggableSubWindow.tsx";
import {MapMarkerType} from "../../../types/MapMarkerType.ts";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import IconSwitch from "../../_generic/parts/IconSwitch.tsx";
import MapMarkerTypeSelect from "../../mapMarkerType/part/MapMarkerTypeSelect.tsx";
import {Button, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {Input, Sheet, styled} from "@mui/joy";

type AddMapMarkerFormProps = {
    saveMapMarker: (mapMarkerDto:MapMarkerDto) => void;
    worldMapId: string;
    xPosition: number;
    yPosition: number;
    closeAddMapMarkerForm: () => void;
    mapMarkerTypes: MapMarkerType[];
}

const StyledTableCell = styled(TableCell)({
    padding: "4px 8px 4px 8px",
})

export default function AddMapMarkerForm(props:Readonly<AddMapMarkerFormProps>):React.ReactElement {
    const [formData, setFormData] = useState(emptyMapMarkerDto);

    function handleSubmit(event: FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        props.saveMapMarker(formData);
        props.closeAddMapMarkerForm();
    }

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>):void {
        setFormData(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        );
    }

    function setMapMarkerVisibility(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        setFormData(
            {
                ...formData,
                visibility: formData.visibility === "OWNER_ONLY" ? "OWNER_AND_OBSERVERS" : "OWNER_ONLY"
            }
        )
    }

    function setMapMarkerTypeId(mapMarkerTypeId:string):void {
        console.log(mapMarkerTypeId);
        setFormData(
            {
                ...formData,
                markerTypeId: mapMarkerTypeId
            }
        );

    }

    useEffect(() => {
        setFormData(
            {
                ...formData,
                worldMapId: props.worldMapId,
                xPosition: props.xPosition,
                yPosition: props.yPosition,
                markerTypeId: props.mapMarkerTypes[0].id,
            }
        );
        // eslint-disable-next-line
    }, [props]);

    return (
        <DraggableSubWindow
            functions={{closeFrame: props.closeAddMapMarkerForm}}
            props={{
                initialPosition: {left:100, top:100, width:250, height:186},
                title: "Neuer MapMarker"
            }}
        >
            <form className={"addMapMarkerForm"} onSubmit={handleSubmit}>
                <TableContainer component={Sheet}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <StyledTableCell align={"center"} colSpan={2}>
                                    <Input
                                        id={"name"}
                                        name={"name"}
                                        type={"text"}
                                        value={formData.name}
                                        onChange={handleChangeInput}
                                        placeholder={"Name"}
                                    />
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align={"center"}>
                                    <MapMarkerTypeSelect
                                        data={{mapMarkerTypes: props.mapMarkerTypes}}
                                        functions={{onClick: setMapMarkerTypeId}}
                                        props={{value: props.mapMarkerTypes[0].id}}
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
                            </TableRow>
                            <TableRow>
                                <StyledTableCell>
                                </StyledTableCell>
                                <StyledTableCell align={"right"}>
                                    <Button type={"submit"}>Speichern</Button>
                                </StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
        </DraggableSubWindow>
    )
}
