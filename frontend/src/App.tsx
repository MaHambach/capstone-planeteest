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

export default function App():React.ReactElement {
    const {worldMaps, getWorldMapById, saveWorldMap, updateWorldMap, deleteWorldMap} = useWorldMaps();
    const {mapMarkers, saveMapMarker, updateMapMarker, deleteMapMarker} = useMapMarkers();
    const {mapMarkerTypes, saveMapMarkerType, getMapMarkerTypeById} = useMapMarkerTypes();
    const {articles, fetchArticles, getArticleById, updateArticle, deleteArticle} = useArticles();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(fetchArticles, [mapMarkers]);

    return (
        <Routes>
            <Route path="/" element={
                <WorldMapGallery
                    worldMaps={worldMaps}
            />}/>
            <Route path={"/worldmap/add"} element={
                <NewWorldMapForm
                    saveWorldMap={saveWorldMap}
            />}/>
            <Route path={"/worldmap/:id"} element={
                <WorldMapMain
                    getWorldMap={getWorldMapById}
                    getMapMarkerType={getMapMarkerTypeById}
                    mapMarkers={mapMarkers}
                    saveMapMarker={saveMapMarker}
                    updateMapMarker={updateMapMarker}
                    deleteMapMarker={deleteMapMarker}
                    articles={articles}
                    getArticleById={getArticleById}
                    updateArticle={updateArticle}
                    deleteArticle={deleteArticle}
            />}/>
            <Route path={"/worldmap/:id/edit"} element={
                <UpdateWorldMapForm
                    updateWorldMap={updateWorldMap}
                    deleteWorldMap={deleteWorldMap}
                    getWorldMap={getWorldMapById}
            />}/>

            <Route path={"/mapMarkerType"} element={
                <MapMarkerTypeGallery
                    mapMarkerTypes={mapMarkerTypes}
            />}/>
            <Route path={"/mapMarkerType/add"} element={
                <AddMapMarkerType
                    saveMapMarkerType={saveMapMarkerType}
            />}/>

        </Routes>
    )
}
