import React, {useState} from "react";
import axios from "axios";

export default function LoginForm():React.ReactElement{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleChangeUsername(event: React.ChangeEvent<HTMLInputElement>):void {
        event.preventDefault()
        setUsername(event.target.value);
    }

    function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>):void {
        event.preventDefault()
        setPassword(event.target.value);
    }

    function login():void {
        axios.post("/api/users/login", {}, {
            auth: {
                username: username,
                password: password
            }
        })
            .then(() => console.log("Logged in"))
            .catch(e => console.error(e));
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
