import React from "react";
import {FaCheck } from "react-icons/fa";
import {Button} from "@mui/joy";

type Functions = {
    onClick: (event:React.MouseEvent<HTMLButtonElement>, username:string) => void;
}
type Props = {
    target: string;
}
type AcceptInviteButtonProps = {
    functions: Functions,
    props: Props,
}
export default function AcceptInviteButton({functions, props}:Readonly<AcceptInviteButtonProps>): React.ReactElement {
    return (
        <Button color="success"
                variant="solid"
                size="sm"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => functions.onClick(event, props.target)}
        >
            <FaCheck />
        </Button>
    )
}
