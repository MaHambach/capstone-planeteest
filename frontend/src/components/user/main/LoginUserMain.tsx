import './LoginUserMain.css';
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {AppUserRegister, emptyAppUserRegister} from "../../../types/AppUserRegister.ts";

type LoginUserMainProps = {
    loginAppUser: (username:string, password:string) => void;
    registerAppUser: (appUserRegister:AppUserRegister) => void;
}

export default function LoginUserMain(props:Readonly<LoginUserMainProps>):React.ReactElement {
    const [formData, setFormData] = useState(emptyAppUserRegister);

    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>):void {
        setFormData(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        );
    }

    function handleLogin(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault()
        props.loginAppUser(formData.username, formData.password);
        navigate("/");
    }

    function handleRegister(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault()
        props.registerAppUser(formData);
        navigate("/");
    }

    return (
        <main className={"loginUserMain"}>
            <form className={"inputFormForm"}>
                <div>
                    <input name={"username"} placeholder={"Username"} type={"text"} value={formData.username} onChange={handleChange}/>
                </div>
                <div>
                    <input name={"password"} placeholder={"Password"} type={"password"} value={formData.password} onChange={handleChange}/>
                </div>
                <div>
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleRegister}>Register</button>
                </div>
            </form>
        </main>
    );
}
