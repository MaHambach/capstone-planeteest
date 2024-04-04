import axios from "axios";


export function useAppUser() {
    function loginAppUser(username:string, password:string):void {
        axios.post("/api/users/login", {}, {
            auth: {
                username: username,
                password: password
            }
        })
            .then(() => {
                console.log("Login successful");
            })
            .catch(e => {
                console.error(e)
            });
    }

    function registerAppUser(username:string, password:string):void {
        axios.post("/api/users/register", {
            "username": username,
            "password": password
        })
            .then(() => {
                console.log("User registered successfully")
            })
            .catch(e => {
                console.error(e)
            });
    }

    function logoutAppUser():void {
        axios.post("/api/users/logout")
            .then(() => {
                console.log("User logged out successfully")
            })
            .catch(e => {
                console.error(e)
            });
    }

    return {
        loginAppUser,
        registerAppUser,
        logoutAppUser
    }
}
