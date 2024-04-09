import React, {useState} from "react";
import {emptyWorldMapInviteDto, WorldMapInviteDto} from "../../../types/WorldMapInviteDto.ts";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import DraggableSubWindow from "../../_generic/parts/DraggableSubWindow.tsx";

type AddWorldMapInviteForm = {
    ownerId: string;
    appUsersWithoutObservers: AppUserMinimal[];
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
                ownerId: props.ownerId,
                inviteeId: event.target.value,
                worldMapId: props.worldMapId
            }
        )
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        console.log(formData);
    }

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
                <select id={"inviteeId"} name={"inviteeId"} value={formData.inviteeId} onChange={handleChange}>
                    {props.appUsersWithoutObservers.map((appUser:AppUserMinimal) => {
                        return (
                            <option key={appUser.id} value={formData.inviteeId}>{appUser.username}</option>
                        );
                    })}
                </select>
                </div>
                <button type={"submit"}>Save</button>
                <button onClick={handleCancel}>Abbrechen</button>
            </form>
        </DraggableSubWindow>
    );
}
