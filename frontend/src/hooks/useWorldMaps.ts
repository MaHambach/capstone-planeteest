import {WorldMapDto} from "../types/WorldMapDto.ts";
import {WorldMap} from "../types/WorldMap.ts";
import {useEffect, useState} from "react";
import axios from "axios";

export default function useWorldMaps() {
    const [worldMaps, setWorldMaps] = useState<WorldMap[]>([]);

    function fetchWorldMaps():void {
        axios.get('/api/worldmaps')
            .then(response => {
                setWorldMaps(response.data);
            })
            .catch(error => {
                console.error('Es gab ein Problem beim Abrufen der Weltkarten:', error.message);
            });
    }

    function getWorldMapById(id:string):WorldMap {
        const worldMapWithId:WorldMap[] = worldMaps.filter((worldMap:WorldMap) => worldMap.id === id);

        if(worldMapWithId.length === 0) console.error('Keine Weltkarte mit der ID ' + id + ' gefunden.');
        else return worldMapWithId[0];
        return {id: '', name: '', worldMapUrl: '', xSize: 0, ySize: 0};
    }

    function saveWorldMap(newWorldMap:WorldMapDto):void {
        axios.post('/api/worldmaps', newWorldMap)
            .then((response) => {
                console.log("New world map added with id " + response.data.id + ".");
                fetchWorldMaps();
            })
            .catch(error => {
                console.error("Error creating world map: ", error.message);
            })
    }

    function updateWorldMap(updatedWorldMap: WorldMap):void {
        axios.put(`/api/worldmaps/${updatedWorldMap.id}`, updatedWorldMap)
            .then(() => {
                fetchWorldMaps();
            })
            .catch(error => {
                if (error?.response?.status === 400) {
                    alert('Fehler: ' + error.response.data.errorMsg);
                } else {
                    alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
                }
            });
    }

    function deleteWorldMap(id:string):void{
        axios.delete(`/api/worldmaps/${id}`)
            .then(fetchWorldMaps)
            .catch(error => {
                console.log(error)
            });
    }

    useEffect(()=> fetchWorldMaps(), []);

    return {
        worldMaps,
        getWorldMapById,
        saveWorldMap,
        updateWorldMap,
        deleteWorldMap
    }
}