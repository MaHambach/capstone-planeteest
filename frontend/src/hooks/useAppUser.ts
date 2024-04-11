import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AppUser} from "../types/AppUser.ts";
import {AppUserRegister} from "../types/AppUserRegister.ts";
import {AppUserMinimal} from "../types/AppUserMinimal.ts";


export function useAppUser() {
    const [appUser, setAppUser] = useState<AppUser | null | undefined>(undefined);
    const [appUsers, setAppUsers] = useState<AppUserMinimal[]>([]);
    const navigate = useNavigate();

    function fetchMe():void {
        axios.get("/api/users/me")
            .then(response => {
                setAppUser(response.data);
            })
            .catch(e => {
                console.error(e)
                setAppUser(null);
            });
    }

    function fetchAllAppUsers():void {
        axios.get("/api/users")
            .then(response => {
                setAppUsers(response.data.map((appUser:AppUser):AppUserMinimal => ({id: appUser.id, username: appUser.username})));
            })
            .catch(e => {
                console.error(e);
            });
    }

    function fetchAllObserversOfWorldmap(worldMapId:string, setObservers:(observers:AppUserMinimal[]) => void):void {
        axios.get("/api/users/observers/" + worldMapId)
            .then(response => {
                setObservers(response.data.map((appUser:AppUser):AppUserMinimal => ({id: appUser.id, username: appUser.username})));
            })
            .catch(e => {
                console.error(e);
            });
    }

    async function loginAppUser(appUserRegister:AppUserRegister):Promise<void> {
        return axios.post("/api/users/login", {}, {
            auth: appUserRegister
        })
            .then((response) => {
                setAppUser(response.data)
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
                fetchAllAppUsers();
                loginAppUser(appUserRegister).then();
            })
            .catch(e => {
                console.error(e);
            });
    }

    function removeObserverFromWorldMap(observerName:string, worldMapId:string):void {
        axios.put("/api/users/remove-observed",
            {
                observerName:observerName,
                worldMapId:worldMapId
            })
            .then(fetchAllAppUsers)
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

    useEffect(() => {
        fetchMe();
        fetchAllAppUsers();
    }, []);

    return {
        appUser,
        appUsers,
        fetchAllObserversOfWorldmap,
        removeObserverFromWorldMap,
        loginAppUser,
        registerAppUser,
        logoutAppUser
    }
}
