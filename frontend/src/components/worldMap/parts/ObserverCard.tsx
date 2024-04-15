import React from "react";
import {AppUserMinimal} from "../../../types/AppUserMinimal.ts";
import {TableCell, TableRow} from "@mui/material";
import DeleteInviteButton from "../../_generic/parts/DeleteInviteButton.tsx";

type Functions = {
    handleRemoveObserver: (event:React.MouseEvent<HTMLButtonElement>, username:string) => void;
}
type Props = {
    appUser: AppUserMinimal;
}
type ObserverCardProps = {
    functions: Functions,
    props: Props,
}
export default function ObserverCard({functions, props}:Readonly<ObserverCardProps>):React.ReactElement {
    return (

            <TableRow>
                <TableCell>
                    <span>{props.appUser.username}</span>
                </TableCell>
                <TableCell>
                    <DeleteInviteButton
                        functions={{onClick: functions.handleRemoveObserver}}
                        props={{target: props.appUser.username}}
                    />
                </TableCell>
            </TableRow>
    )
}
