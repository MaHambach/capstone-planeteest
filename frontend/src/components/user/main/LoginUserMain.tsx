import './LoginUserMain.css';
import React, {useState} from "react";
import {AppUserRegister, emptyAppUserRegister} from "../../../types/AppUserRegister.ts";
import {useNavigate} from "react-router-dom";

type LoginUserMainProps = {
    loginAppUser: (appUserRegister:AppUserRegister) => Promise<void>;
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

    function handleLogin(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault()
        props.loginAppUser(formData).then(
            () => {
                navigate("/");
            }
        );
    }

    function handleRegister(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault()
        props.registerAppUser(formData);
    }

    return (
        <main className={"loginUserMain"}>
            <h1>PlaneTeest</h1>
            <form className={"inputFormForm"} onSubmit={handleLogin}>
                <div>
                    <input name={"username"} placeholder={"Username"} type={"text"} value={formData.username} onChange={handleChange}/>
                </div>
                <div>
                    <input name={"password"} placeholder={"Password"} type={"password"} value={formData.password} onChange={handleChange}/>
                </div>
                <div>
                    <button type={"submit"}>Login</button>
                    <button onClick={handleRegister}>Register</button>
                </div>
            </form>
        </main>
    );
}
