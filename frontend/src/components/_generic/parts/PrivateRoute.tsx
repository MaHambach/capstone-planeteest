import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {AppUser} from "../../../types/AppUser.ts";

type PrivateRouteProps = {
    appUser: AppUser | null | undefined;
}
export default function PrivateRoute(props:Readonly<PrivateRouteProps>):React.ReactElement {
    if(props.appUser === null) {
        return <Navigate to={"/login"}/>
    }

    if(props.appUser === undefined) {
        return <h2>Loading...</h2>
    }

    return (
        <Outlet/>
    );
}
