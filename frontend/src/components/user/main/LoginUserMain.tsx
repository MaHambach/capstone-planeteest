import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {emptyAppUserDto} from "../../../types/AppUserDto.ts";

type LoginUserMainProps = {
    loginAppUser: (username:string, password:string) => void;
    registerAppUser: (username:string, password:string) => void;
}

export default function LoginUserMain(props:Readonly<LoginUserMainProps>):React.ReactElement {
    const [appUserDto, setAppUserDto] = useState(emptyAppUserDto);

    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>):void {
        event.preventDefault()
        setAppUserDto({...appUserDto, [event.target.name]: event.target.value});
    }

    function handleLogin(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault()
        props.loginAppUser(appUserDto.username, appUserDto.password);
        navigate("/");
    }

    function handleRegister(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault()
        props.registerAppUser(appUserDto.username, appUserDto.password);
        navigate("/");
    }

    return (
        <main className={"loginUserMain"}>
            <form className={"inputFormForm"}>
                <input placeholder={"Username"} value={"username"} onChange={handleChange}/>
                <input placeholder={"Password"} value={"password"} onChange={handleChange}/>
                <div>
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleRegister}>Register</button>
                </div>
            </form>
        </main>
    );
}
