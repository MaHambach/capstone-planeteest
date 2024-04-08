import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
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
                setAppUser(null);
            });
    }

    async function loginAppUser(appUserRegister:AppUserRegister):Promise<void> {
        return axios.post("/api/users/login", {}, {
            auth: appUserRegister
        })
            .then((r) => {
                setAppUser(r.data)
                console.log("Login successful");
            })
            .catch(e => {
                console.error(e);
            });
    }

    function registerAppUser(appUserRegister:AppUserRegister):void {
        axios.post("/api/users/register", appUserRegister)
            .then(() => {
                console.log("User registered successfully");
                loginAppUser(appUserRegister);
            })
            .catch(e => {
                console.error(e);
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

    useEffect(fetchMe, []);

    return {
        appUser,
        loginAppUser,
        registerAppUser,
        logoutAppUser
    }
}
