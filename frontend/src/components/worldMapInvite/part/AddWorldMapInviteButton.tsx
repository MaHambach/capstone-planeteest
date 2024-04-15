import {Button, Tooltip} from "@mui/joy";
import React, {useEffect, useState} from "react";
import {ImEyePlus} from "react-icons/im";
import {ListItemText, Menu, MenuItem} from "@mui/material";
import {WorldMapInviteDto} from "../../../types/WorldMapInviteDto.ts";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import useWorldMapInvite from "../../../hooks/useWorldMapInvite.ts";

type Functions = {
    saveWorldMapInvite: (worldMapInviteDto:WorldMapInviteDto) => void;
}
type Props = {
    ownerId: string;
    worldMapId: string;
}
type AddWorldMapInviteButtonProps = {
    functions: Functions,
    props: Props,
}
export default function AddWorldMapInviteButton({functions, props}:Readonly<AddWorldMapInviteButtonProps>): React.ReactElement {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [possibleInvitees, setPossibleInvitees] = useState<AppUserMinimal[] | null>(null);
    const {fetchAllPossibleInviteesForWorldMap} = useWorldMapInvite();
    const open = Boolean(anchorEl);

    useEffect(() => {
        fetchAllPossibleInviteesForWorldMap(setPossibleInvitees, props.worldMapId);
        // eslint-disable-next-line
    }, [props]);

    function handleClick(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    }

    function handleClose(event:React.MouseEvent):void {
        event.preventDefault();
        setAnchorEl(null);
    }

    function handleSubmit(event: React.MouseEvent, inviteeId:string):void {
        event.preventDefault();
        functions.saveWorldMapInvite({ownerId:props.ownerId, worldMapId: props.worldMapId, inviteeId: inviteeId});
        handleClose(event);
    }

    return (
        <>
            <Tooltip title={"Beobachter einladen"} arrow placement={"bottom"}>
                <Button color="success"
                        size="sm"
                        variant="solid"
                        loading={!possibleInvitees}
                        disabled={!possibleInvitees?.length}
                        id={"AddWorldMapInviteButton"}
                        onClick={handleClick}
                        aria-controls={open ? "AddWorldMapInviteButtonMenu" : undefined}
                        aria-haspopup={"true"}
                        aria-expanded={open ? "true" : undefined}
                >
                    <ImEyePlus  />
                </Button>
            </Tooltip>
            <Menu
                id={"AddWorldMapInviteButtonMenu"}
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{'aria-labelledby': 'AddWorldMapInviteButton'}}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                disableScrollLock={true}
            >
                {possibleInvitees?.length ?
                    possibleInvitees.map((invitee:AppUserMinimal) => (
                        <MenuItem key={invitee.id} onClick={(event) => handleSubmit(event, invitee.id)}>
                            <ListItemText primary={invitee.username} />
                        </MenuItem>
                    ))
                    :
                    <MenuItem>
                        <ListItemText primary={"Keine Beobachter verfügbar"} />
                    </MenuItem>
                }
            </Menu>
        </>
    )
}
