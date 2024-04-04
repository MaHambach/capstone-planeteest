import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function RegisterUserForm():React.ReactElement{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleChangeUsername(event: React.ChangeEvent<HTMLInputElement>):void {
        event.preventDefault()
        setUsername(event.target.value);
    }

    function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>):void {
        event.preventDefault()
        setPassword(event.target.value);
    }

    function register():void {
        axios.post("/api/users/register", {
            "username": username,
            "password": password
        })
            .then(() => {
                setUsername("");
                setPassword("");
                console.log("User registered successfully")
                navigate("/");
            })
            .catch(e => {
                setPassword("");
                console.error(e)
            });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        register();
    }

    return (
        <form className={"loginForm"} onSubmit={handleSubmit}>
            <input placeholder={"Username"} value={username} onChange={handleChangeUsername}/>
            <input placeholder={"Password"} value={password} onChange={handleChangePassword}/>
            <button type={"submit"}>Register Now!</button>
        </form>
    )
}
