import './LoginUserMain.css';
import React, {useState} from "react";
import {AppUserRegister, emptyAppUserRegister} from "../../../types/AppUserRegister.ts";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/joy/Typography";
import {MdMenuBook} from "react-icons/md";
import {IconContext} from "react-icons";
import {GiAnvil} from "react-icons/gi";

const style = {
    button: {
        width: 64,
        height: 64,
        top: 10,
        right: 10,
        padding: 0,
        border: "1px solid black",
        zIndex: 1000
    },
    iconContext: {
        "size": "64px",
    },
    icon: {
        "color": "#B87333",
        filter: "drop-shadow(0 0 8px white)"
    }
};

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

            IoPin

            <Typography level={"h1"}
                        sx={{ textShadow: '2px 2px 8px rgba(255, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)' }}
            >
                Plane
                <IconContext.Provider value={style.iconContext}>
                    <div>
                        <GiAnvil style={style.icon}/>
                    </div>
                </IconContext.Provider>
                Teest
            </Typography>

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
