import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {AppUser} from "../types/AppUser.ts";
import {AppUserRegister} from "../types/AppUserRegister.ts";


export function useAppUser() {
    const [appUser, setAppUser] = useState<AppUser | null | undefined>(undefined);

    const navigate = useNavigate();

    function fetchMe() {
        axios.get("/api/users/me")
            .then(response => {
                setAppUser(response.data);
            })
            .catch(e => {
                console.error(e)
            });
    }

    function loginAppUser(appUserRegister:AppUserRegister):void {
        axios.post("/api/users/login", {}, {
            auth: appUserRegister
        })
            .then(() => {
                console.log("Login successful");
                fetchMe();
            })
            .catch(e => {
                console.error(e);
                setAppUser(null);
            })
            .finally(() => {
                    navigate("/")
            });
    }

    function registerAppUser(appUserRegister:AppUserRegister):void {
        axios.post("/api/users/register", appUserRegister)
            .then(() => {
                console.log("User registered successfully");
            })
            .catch(e => {
                console.error(e);
            })
            .finally(() => {
                loginAppUser(appUserRegister);
            });
    }

    function logoutAppUser():void {
        axios.post("/api/users/logout")
            .then(() => {
                console.log("User logged out successfully")
                navigate("/login");
            })
            .catch(e => {
                console.error(e)
            })
            .finally(() => {
                    setAppUser(null);
            });
    }

    return {
        appUser,
        fetchMe,
        loginAppUser,
        registerAppUser,
        logoutAppUser
    }
}
