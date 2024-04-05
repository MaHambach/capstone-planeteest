import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {AppUser} from "../../../types/AppUser.ts";

type PrivateRouteProps = {
    appUser: AppUser | null | undefined;
}
export default function PrivateRoute(props:Readonly<PrivateRouteProps>):React.ReactElement {
    return (
        <>
            {
                props.appUser ?
                    <Outlet/>
                    :
                    <Navigate to={"/login"}/>
            }
        </>
    );
}
