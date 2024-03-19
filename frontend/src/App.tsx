import {Route, Routes} from "react-router-dom";
import WorldMapGallery from "./components/worldMap/main/WorldMapGallery.tsx";
import React from 'react'
import './App.css'
import useWorldMaps from "./hooks/useWorldMaps.ts";
import NewWorldMapForm from "./components/worldMap/main/NewWorldMapForm.tsx";

export default function App():React.ReactElement {
    const {worldMaps, getWorldMapById, saveWorldMap, updateWorldMap, deleteWorldMap} = useWorldMaps();

    return (
        <Routes>
            <Route path="/" element={<WorldMapGallery worldMaps={worldMaps}/>}/>
            <Route path={"/worldmap/new"} element={<NewWorldMapForm saveWorldMap={saveWorldMap}/>}/>
        </Routes>
    )
}
