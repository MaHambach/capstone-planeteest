import React from "react";
import axios from "axios";

type LoginUserFormProps = {
    handleChangeUsername: (username:string) => void;
    handleChangePassword: (password:string) => void;
}

export default function LoginUserForm(props:Readonly<LoginUserFormProps>):React.ReactElement{


    function login():void {
        axios.post("/api/users/login", {}, {
            auth: {
                username: username,
                password: password
            }
        })
            .then(() => {
                setUsername("");
                setPassword("");
                navigate("/");
            })
            .catch(e => {
                setPassword("");
                console.error(e)
            });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        login();
    }

    return (
        <form className={"loginForm"} onSubmit={handleSubmit}>
            <input placeholder={"Username"} value={username} onChange={handleChangeUsername}/>
            <input placeholder={"Password"} value={password} onChange={handleChangePassword}/>
            <button type={"submit"}>Login</button>
        </form>
    )
}
