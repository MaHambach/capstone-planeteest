import {WorldMapDto} from "../types/WorldMapDto.ts";
import {WorldMap} from "../types/WorldMap.ts";
import {useState} from "react";
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

    function deleteWorldMap(worldMapId:string):void{
        axios.delete(`/api/worldmaps/${worldMapId}`)
            .then(fetchWorldMaps)
            .catch(error => {
                console.log(error)
            });
    }

    return {
        worldMaps,
        fetchWorldMaps,
        saveWorldMap,
        updateWorldMap,
        deleteWorldMap
    }
}
