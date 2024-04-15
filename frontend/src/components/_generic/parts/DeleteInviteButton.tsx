import React from "react";
import {ImCross} from "react-icons/im";
import {Button} from "@mui/joy";

type Functions = {
    onClick: (event:React.MouseEvent<HTMLButtonElement>, username:string) => void;
}
type Props = {
    target: string;
}
type DeleteInviteButtonProps = {
    functions: Functions,
    props: Props,
}
export default function DeleteInviteButton({functions, props}:Readonly<DeleteInviteButtonProps>): React.ReactElement {
    return (
        <Button color="danger"
                variant="solid"
                size="sm"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => functions.onClick(event, props.target)}
        >
            <ImCross/>
        </Button>
    )
}
