import {Route, Routes} from "react-router-dom";
import WorldMapGallery from "./components/worldMap/main/WorldMapGallery.tsx";
import React, {useEffect} from 'react'
import useWorldMaps from "./hooks/useWorldMaps.ts";
import NewWorldMapForm from "./components/worldMap/main/NewWorldMapForm.tsx";
import WorldMapMain from "./components/worldMap/main/WorldMapMain.tsx";
import UpdateWorldMapForm from "./components/worldMap/main/UpdateWorldMapForm.tsx";
import useMapMarkers from "./hooks/useMapMarkers.ts";
import {useMapMarkerTypes} from "./hooks/useMapMarkerTypes.ts";
import {useArticles} from "./hooks/useArticles.ts";
import MapMarkerTypeGallery from "./components/mapMarkerType/main/MapMarkerTypeGallery.tsx";
import AddMapMarkerType from "./components/mapMarkerType/main/AddMapMarkerType.tsx";
import UpdateMapMarkerType from "./components/mapMarkerType/main/UpdateMapMarkerType.tsx";
import LoginUserMain from "./components/user/main/LoginUserMain.tsx";
import {useAppUser} from "./hooks/useAppUser.ts";
import PrivateRoute from "./components/_generic/privateRoute/PrivateRoute.tsx";
import useWorldMapInvite from "./hooks/useWorldMapInvite.ts";
import UserDetails from "./components/user/main/UserDetails.tsx";
import {useObservedWorldMapIds} from "./hooks/useObservedWorldMaps.ts";

export default function App():React.ReactElement {
    const {appUser, appUsers, fetchAllObserversOfWorldmap, removeObserverFromWorldMap, loginAppUser, registerAppUser, logoutAppUser} = useAppUser();
    const {articles, fetchArticles, getArticleById, updateArticle, deleteArticle} = useArticles();
    const {mapMarkers, fetchMapMarkers, saveMapMarker, updateMapMarker, deleteMapMarker} = useMapMarkers();
    const {mapMarkerTypes, fetchMapMarkerTypes, saveMapMarkerType, updateMapMarkerType, getMapMarkerTypeById, deleteMapMarkerType} = useMapMarkerTypes();
    const {observedWorldMapIds, fetchObservedWorldMapIds} = useObservedWorldMapIds();
    const {worldMapInvites, fetchWorldMapInvites, saveWorldMapInvite, acceptWorldMapInvite, deleteWorldMapInvite} = useWorldMapInvite();
    const {worldMaps, fetchWorldMaps, getWorldMapById, saveWorldMap, updateWorldMap, deleteWorldMap} = useWorldMaps();

    useEffect(() => {
        appUser && fetchArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapMarkers]);

    useEffect(() => {
        appUser && fetchObservedWorldMapIds();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [worldMapInvites])

    useEffect(() => {
        if(appUser) {
            fetchArticles();
            fetchWorldMaps();
            fetchMapMarkers();
            fetchMapMarkerTypes();
            fetchObservedWorldMapIds();
            fetchWorldMapInvites();
        }
        // eslint-disable-next-line
    }, [appUser]);

    return (
        <Routes>
            <Route path={"/login"} element={
                <LoginUserMain loginAppUser={loginAppUser} registerAppUser={registerAppUser}/>
            }/>
            <Route element={<PrivateRoute appUser={appUser}/>}>
                <Route path="/" element={
                    <WorldMapGallery
                        data={{
                            // @ts-expect-error "appUser can't be null or undefined here, since this is checked for in PrivateRoute."
                            appUser: appUser,
                            worldMaps: worldMaps
                        }}
                        functions={{
                            logoutAppUser: logoutAppUser
                        }}
                        props={{
                            observedWorldMapIds: observedWorldMapIds
                        }}
                    />
                }/>
                <Route path={"/worldmap/add"} element={
                    <NewWorldMapForm
                        saveWorldMap={saveWorldMap}
                    />
                }/>
                <Route path={"/worldmap/:id"} element={
                    <WorldMapMain
                        // @ts-expect-error "appUser can't be null or undefined here, since this is checked for in PrivateRoute."
                        appUser={appUser}
                        getWorldMap={getWorldMapById}
                        mapMarkers={mapMarkers}
                        saveMapMarker={saveMapMarker}
                        updateMapMarker={updateMapMarker}
                        deleteMapMarker={deleteMapMarker}
                        mapMarkerTypes={mapMarkerTypes}
                        getMapMarkerType={getMapMarkerTypeById}
                        articles={articles}
                        getArticleById={getArticleById}
                        updateArticle={updateArticle}
                        deleteArticle={deleteArticle}
                    />
                }/>
                <Route path={"/worldmap/:id/edit"} element={
                    <UpdateWorldMapForm
                        data={{
                            // @ts-expect-error "appUser can't be null or undefined here, since this is checked for in PrivateRoute."
                            appUser: appUser,
                            appUsers: appUsers,
                            worldMaps: worldMaps,
                            worldMapInvites: worldMapInvites
                        }}
                        functions={{
                            updateWorldMap: updateWorldMap,
                            deleteWorldMap: deleteWorldMap,
                            acceptWorldMapInvite: acceptWorldMapInvite,
                            saveWorldMapInvite: saveWorldMapInvite,
                            deleteWorldMapInvite: deleteWorldMapInvite,
                            removeObserverFromWorldMap: removeObserverFromWorldMap,
                            fetchAllObserversOfWorldmap: fetchAllObserversOfWorldmap
                        }}
                    />
                }/>

                <Route path={"/mapMarkerType"} element={
                    <MapMarkerTypeGallery
                        mapMarkerTypes={mapMarkerTypes}
                    />
                }/>
                <Route path={"/mapMarkerType/add"} element={
                    <AddMapMarkerType
                        saveMapMarkerType={saveMapMarkerType}
                    />
                }/>
                <Route path={"/mapMarkerType/:id/edit"} element={
                    <UpdateMapMarkerType
                        updateMapMarkerType={updateMapMarkerType}
                        getMapMarkerType={getMapMarkerTypeById}
                        deleteMapMarkerType={deleteMapMarkerType}
                    />
                }/>
                <Route path={"/user/:id"} element={
                    <UserDetails
                        data={{
                            // @ts-expect-error "appUser can't be null or undefined here, since this is checked for in PrivateRoute."
                            appUser: appUser,
                            appUsers: appUsers,
                            worldMapInvites: worldMapInvites,
                            worldMaps: worldMaps
                        }}
                        functions={{
                            acceptWorldMapInvite: acceptWorldMapInvite,
                            deleteWorldMapInvite: deleteWorldMapInvite
                        }}
                    />
                }/>
            </Route>
        </Routes>
    )
}
