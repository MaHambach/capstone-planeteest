import React, {useEffect, useState} from "react";
import {emptyWorldMapInviteDto, WorldMapInviteDto} from "../../../types/WorldMapInviteDto.ts";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import DraggableSubWindow from "../../_generic/parts/DraggableSubWindow.tsx";

type AddWorldMapInviteForm = {
    ownerId: string;
    possibleInvitees?: AppUserMinimal[];
    worldMapId: string;
    closeAddWorldMapInviteForm: () => void;
    saveWorldMapInvite: (worldMapInviteDto:WorldMapInviteDto) => void;
}
export default function AddWorldMapInviteForm(props:Readonly<AddWorldMapInviteForm>):React.ReactElement {
    const [formData, setFormData] = useState<WorldMapInviteDto>(emptyWorldMapInviteDto);

    function handleCancel(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        props.closeAddWorldMapInviteForm();
    }

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
        props.saveWorldMapInvite(formData);
    }

    useEffect(() => {
        if (props.possibleInvitees?.length) {
            setFormData(
                {
                    ...formData,
                    ownerId: props.ownerId,
                    worldMapId: props.worldMapId,
                    inviteeId: props.possibleInvitees[0].id
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
    }, [props]);

    return (
        <DraggableSubWindow
            closeFrame={props.closeAddWorldMapInviteForm}
            initialPosition={{
                left:200,
                top:200,
                width:200,
                height:200
            }}
        >
            <form className={"addWorldMapInviteForm"} onSubmit={handleSubmit}>
                <div>
                    <h3>Wen möchtest du einladen?</h3>
                </div>
                <div>
                    { props.possibleInvitees?.length ?
                        <select id={"inviteeId"} name={"inviteeId"} value={formData.inviteeId} onChange={handleChange}>
                            {props.possibleInvitees.map((appUser:AppUserMinimal) => {
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
                {props.possibleInvitees?.length && <button type={"submit"}>Save</button>}
                <button onClick={handleCancel}>Abbrechen</button>
            </form>
        </DraggableSubWindow>
    );
}
