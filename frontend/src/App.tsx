import {Route, Routes} from "react-router-dom";
import WorldMapGallery from "./components/worldMap/main/WorldMapGallery.tsx";
import React from 'react'
import useWorldMaps from "./hooks/useWorldMaps.ts";
import NewWorldMapForm from "./components/worldMap/main/NewWorldMapForm.tsx";
import WorldMapMain from "./components/worldMap/main/WorldMapMain.tsx";
import UpdateWorldMapForm from "./components/worldMap/main/UpdateWorldMapForm.tsx";

export default function App():React.ReactElement {
    const {worldMaps, getWorldMapById, saveWorldMap, updateWorldMap, deleteWorldMap} = useWorldMaps();

    return (
        <Routes>
            <Route path="/" element={<WorldMapGallery worldMaps={worldMaps}/>}/>
            <Route path={"/worldmap/new"} element={<NewWorldMapForm saveWorldMap={saveWorldMap}/>}/>
            <Route path={"/worldmap/:id"} element={<WorldMapMain getWorldMap={getWorldMapById}/>}/>
            <Route path={"/worldmap/:id/edit"} element={<UpdateWorldMapForm updateWorldMap={updateWorldMap} deleteWorldMap={deleteWorldMap} getWorldMap={getWorldMapById}/>}/>
        </Routes>
    )
}
