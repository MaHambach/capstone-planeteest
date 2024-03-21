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

export default function App():React.ReactElement {
    const {worldMaps, getWorldMapById, saveWorldMap, updateWorldMap, deleteWorldMap} = useWorldMaps();
    const {mapMarkers, saveMapMarker} = useMapMarkers();
    const {articles, fetchArticles, getArticleById} = useArticles();
    const {getMapMarkerTypeById} = useMapMarkerTypes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(fetchArticles, [mapMarkers]);

    return (
        <Routes>
            <Route path="/" element={
                <WorldMapGallery
                    worldMaps={worldMaps}
            />}/>
            <Route path={"/worldmap/new"} element={
                <NewWorldMapForm
                    saveWorldMap={saveWorldMap}
            />}/>
            <Route path={"/worldmap/:id"} element={
                <WorldMapMain
                    getWorldMap={getWorldMapById}
                    getMapMarkerType={getMapMarkerTypeById}
                    mapMarkers={mapMarkers}
                    saveMapMarker={saveMapMarker}
                    articles={articles}
                    getArticleById={getArticleById}
            />}/>
            <Route path={"/worldmap/:id/edit"} element={
                <UpdateWorldMapForm
                    updateWorldMap={updateWorldMap}
                    deleteWorldMap={deleteWorldMap}
                    getWorldMap={getWorldMapById}
            />}/>

        </Routes>
    )
}
