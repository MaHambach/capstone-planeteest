import './LoginUserMain.css';
import React, {useState} from "react";
import {AppUserRegister, emptyAppUserRegister} from "../../../types/AppUserRegister.ts";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/joy/Typography";
import {IconContext} from "react-icons";
import {GiAnvil} from "react-icons/gi";
import {Button, Tooltip} from "@mui/joy";
import {Box, InputLabel, TextField} from "@mui/material";
import {AppUserRegisterDataSchema, AppUserRegisterFormError} from "../../../data/AppUserRegisterDataSchema.ts";
import * as yup from "yup";

const loginWidth:number = 330;
const loginHeight:number = 231;

const style = {
    iconContext: {
        "size": "48px",
    },
    icon: {
        "color": "#B87333",
        filter: "drop-shadow(0 0 8px yellow) drop-shadow(0 0 8px white) drop-shadow(0 0 8px white)"
    },
    header: {
        textShadow: "0px 0px 8px white, 0px 0px 8px white, 0px 0px 8px white",
        display: "flex",
        flexDirection: "row"
    },
    box: {
        borderRadius: "10px",
        backgroundColor: "#c6c9d0",
        width: loginWidth,
        height: loginHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        boxShadow: "0 0 10px 5px white",
    },
    label: {
        fontWeight: "bold",
        pr: 1,
    },
    textField: {
        backgroundColor: "white",
        borderRadius: "10px",
    },
    buttonGroup: {
        borderRadius: "10px",
        backgroundColor: "#F0F4F8",
        border: "none",
    },
    tabButton: {
        width: loginWidth/2,
        fontWeight: "bold",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0",
        backgroundColor: "#F0F4F8",
        color: "#9FA6AD",
        border: "none",
        borderBottom: "2px solid black",
        "&.Mui-disabled": {
            backgroundColor: "#C6C9D0",
            color: "#4F5053",
            borderBottom: "2px solid #C6C9D0",
            borderRight: "2px solid black",
            borderLeft: "2px solid black",
            borderTop: "2px solid black",
        }
    },
    submitButton: {
        mt: 1,
    }
};

type LoginUserMainProps = {
    loginAppUser: (appUserRegister:AppUserRegister) => Promise<void>;
    registerAppUser: (appUserRegister:AppUserRegister) => void;
}
export default function LoginUserMain(props:Readonly<LoginUserMainProps>):React.ReactElement {
    const [formData, setFormData] = useState(emptyAppUserRegister);
    const [appUserFormError, setAppUserFormError] = useState<AppUserRegisterFormError>({});
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const navigate = useNavigate();

    function triggerTabChange(event: React.MouseEvent):void {
        event.preventDefault();
        setFormData(emptyAppUserRegister);
        setAppUserFormError({});
        setIsRegister(!isRegister);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>):void {
        setFormData(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        );
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        if(isRegister){
            handleRegister(formData);
        } else {
            handleLogin(formData);
        }
    }

    function handleRegister(formData:AppUserRegister):void {
        AppUserRegisterDataSchema.validate(formData, {abortEarly: false})
            .then(() => {
                props.registerAppUser(formData);
                setAppUserFormError({});
            }).catch((validationErrors: yup.ValidationError) => {
            // Validation failed
            const errors = validationErrors.inner.reduce<{ [key: string]: string }>((acc, currentError) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                acc[currentError.path] = currentError.message;
                return acc;
            }, {});
            setAppUserFormError(errors);
        });
    }

    function handleLogin(formData:AppUserRegister):void {
        props.loginAppUser(formData).then(
            () => {
                navigate("/");
            }
        );
    }

    return (
        <main className={"loginUserMain"}>
            <Typography level={"h1"} sx={style.header}>
                Plane
                <IconContext.Provider value={style.iconContext}>
                    <div>
                        <GiAnvil style={style.icon}/>
                    </div>
                </IconContext.Provider>
                Teest
            </Typography>

            <Box sx={style.box}>
                <div style={style.buttonGroup}>
                    <Button onClick = {triggerTabChange}
                            sx={style.tabButton}
                            variant = {!isRegister ? "solid" : "outlined"}
                            disabled = {!isRegister}
                    >
                        Login
                    </Button>
                    <Button onClick = {triggerTabChange}
                            sx={style.tabButton}
                            variant = {isRegister ? "solid" : "outlined"}
                            disabled = {isRegister}
                    >
                        Register
                    </Button>
                </div>
                <form onSubmit={handleSubmit} className={"loginUserMainFormBody"}>
                    <div className={"LoginUserMain_inputDiv"}>
                        <InputLabel sx={style.label} htmlFor="username">Username</InputLabel>
                        <Tooltip title={appUserFormError.username} color={"danger"} arrow>
                            <TextField id="username"
                                       type="text"
                                       name="username"
                                       placeholder={"Username"}
                                       error={appUserFormError.username !== undefined}
                                       label={appUserFormError.username}
                                       value={formData.username}
                                       sx={style.textField}
                                       onChange={handleChange}
                                       required
                            />
                        </Tooltip>
                    </div>
                    <div className={"LoginUserMain_inputDiv"}>
                        <InputLabel sx={style.label} htmlFor="password">Password</InputLabel>
                        <Tooltip title={appUserFormError.password} color={"danger"} arrow>
                            <TextField id="password"
                                       type="password"
                                       name="password"
                                       placeholder={"Password"}
                                       error={appUserFormError.password !== undefined}
                                       label={appUserFormError.password}
                                       value={formData.password}
                                       sx={style.textField}
                                       onChange={handleChange}
                                       required
                            />
                        </Tooltip>
                    </div>
                    <div className={isRegister ? "submitButtonDiv_register" : "submitButtonDiv_login"}>
                        <Button type={"submit"}
                                variant={"solid"}
                                color={"neutral"}
                                size={"lg"}
                                sx={style.submitButton}
                        >
                            {isRegister ? "Register" : "Login"}
                        </Button>
                    </div>
                </form>
            </Box>
        </main>
    );
}
