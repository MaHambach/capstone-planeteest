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
import PrivateRoute from "./components/_generic/parts/PrivateRoute.tsx";

export default function App():React.ReactElement {
    const {appUser, loginAppUser, registerAppUser, logoutAppUser} = useAppUser();
    const {articles, fetchArticles, getArticleById, updateArticle, deleteArticle} = useArticles();
    const {mapMarkers, fetchMapMarkers, saveMapMarker, updateMapMarker, deleteMapMarker} = useMapMarkers();
    const {mapMarkerTypes, fetchMapMarkerTypes, saveMapMarkerType, updateMapMarkerType, getMapMarkerTypeById, deleteMapMarkerType} = useMapMarkerTypes();
    const {worldMaps, fetchWorldMaps, getWorldMapById, saveWorldMap, updateWorldMap, deleteWorldMap} = useWorldMaps();

    useEffect(() => {
        appUser && fetchArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapMarkers]);

    useEffect(() => {
        if(appUser) {
            fetchArticles();
            fetchWorldMaps();
            fetchMapMarkers();
            fetchMapMarkerTypes();
        }
    }, [appUser]);

    return (
        <Routes>
            <Route path={"/login"} element={
                <LoginUserMain loginAppUser={loginAppUser} registerAppUser={registerAppUser}/>
            }/>
            <Route element={<PrivateRoute appUser={appUser}/>}>
                <Route path="/" element={
                    <WorldMapGallery
                        appUser={appUser}
                        worldMaps={worldMaps}
                        logoutAppUser={logoutAppUser}
                    />
                }/>
                <Route path={"/worldmap/add"} element={
                    <NewWorldMapForm
                        saveWorldMap={saveWorldMap}
                    />
                }/>
                <Route path={"/worldmap/:id"} element={
                    <WorldMapMain
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
                        updateWorldMap={updateWorldMap}
                        deleteWorldMap={deleteWorldMap}
                        getWorldMap={getWorldMapById}
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
            </Route>
        </Routes>
    )
}
