import RegisterUserForm from "../parts/RegisterUserForm.tsx";
import LoginUserForm from "../parts/LoginUserForm.tsx";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function LoginUserMain():React.ReactElement {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const alreadyRegistered:boolean = false;

    const navigate = useNavigate();

    function handleChangeUsername(event: React.ChangeEvent<HTMLInputElement>):void {
        event.preventDefault()
        setUsername(event.target.value);
    }

    function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>):void {
        event.preventDefault()
        setPassword(event.target.value);
    }

    return (
        <main>
            {alreadyRegistered ?
                <LoginUserForm handleChangeUsername={handleChangeUsername}
                               handleChangePassword={handleChangePassword}
                />
                :
                <RegisterUserForm handleChangeUsername={handleChangeUsername}
                                  handleChangePassword={handleChangePassword}
                /> }
        </main>
    );
}
