import React, {useEffect, useState} from "react";
import {emptyWorldMapInviteDto, WorldMapInviteDto} from "../../../types/WorldMapInviteDto.ts";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import DraggableSubWindow from "../../_generic/draggable/DraggableSubWindow.tsx";
import useWorldMapInvite from "../../../hooks/useWorldMapInvite.ts";

type Props = {
    ownerId: string;
    worldMapId: string;
}
type Functions = {
    closeAddWorldMapInviteForm: () => void;
    saveWorldMapInvite: (worldMapInviteDto:WorldMapInviteDto) => void;
}
type AddWorldMapInviteForm = {
    props:Props;
    functions:Functions;
}
export default function AddWorldMapInviteForm({props, functions}:Readonly<AddWorldMapInviteForm>):React.ReactElement {
    const [formData, setFormData] = useState<WorldMapInviteDto>(emptyWorldMapInviteDto);
    const [possibleInvitees, setPossibleInvitees] = useState<AppUserMinimal[]>([]);
    const {fetchAllPossibleInviteesForWorldMap} = useWorldMapInvite();

    useEffect(() => {
        fetchAllPossibleInviteesForWorldMap(setPossibleInvitees, props.worldMapId);
        // eslint-disable-next-line
    }, [props]);

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>):void {
        event.preventDefault();
        setFormData(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        )
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        functions.saveWorldMapInvite(formData);
        functions.closeAddWorldMapInviteForm();
    }

    useEffect(() => {
        if (possibleInvitees?.length) {
            setFormData(
                {
                    ...formData,
                    ownerId: props.ownerId,
                    worldMapId: props.worldMapId,
                    inviteeId: possibleInvitees[0].id
                }
            )
        } else {
            setFormData(
                {
                    ...formData,
                    ownerId: props.ownerId,
                    worldMapId: props.worldMapId
                }
            )
        }
        // eslint-disable-next-line
    }, [props, possibleInvitees]);

    return (
        <DraggableSubWindow
            functions={{closeFrame: functions.closeAddWorldMapInviteForm}}
            props={{
                initialPosition: {left:200, top:200, width:200, height:200},
                title: "Einladung erstellen"
            }}
        >
            <form className={"addWorldMapInviteForm"} onSubmit={handleSubmit}>
                <div>
                    <h3>Wen möchtest du einladen?</h3>
                </div>
                <div>
                    { possibleInvitees?.length ?
                        <select id={"inviteeId"} name={"inviteeId"} value={formData.inviteeId} onChange={handleChange}>
                            {possibleInvitees.map((appUser:AppUserMinimal) => {
                                return (
                                    <option key={appUser.id}
                                            value={appUser.id}>
                                        {appUser.username}
                                    </option>
                                );
                            })}
                        </select>
                        :
                        <span>Keine Einladungen möglich</span>
                    }
                </div>
                {possibleInvitees.length ? <button type={"submit"}>Einladen</button> : null}
                <button onClick={functions.closeAddWorldMapInviteForm}>Abbrechen</button>
            </form>
        </DraggableSubWindow>
    );
}
