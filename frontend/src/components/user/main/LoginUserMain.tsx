import './LoginUserMain.css';
import React, {useState} from "react";
import {AppUserRegister, emptyAppUserRegister} from "../../../types/AppUserRegister.ts";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/joy/Typography";
import {IconContext} from "react-icons";
import {GiAnvil} from "react-icons/gi";
import {Button} from "@mui/joy";

const style = {
    iconContext: {
        "size": "48px",
    },
    icon: {
        "color": "#B87333",
        filter: "drop-shadow(0 0 8px yellow) drop-shadow(0 0 8px white) drop-shadow(0 0 8px white)"
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
            <Typography level={"h1"}
                        sx={{
                            textShadow: "0px 0px 8px white, 0px 0px 8px white, 0px 0px 8px white",
                            display: "flex",
                            flexDirection: "row",
            }}
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
                    <Button type={"submit"}>Login</Button>
                    <Button onClick={handleRegister} disabled={true}>Register</Button>
                </div>
            </form>
        </main>
    );
}
