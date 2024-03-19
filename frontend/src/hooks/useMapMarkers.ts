import axios from "axios";
import {MapMarker} from "../types/MapMarker.ts";
import {useEffect, useState} from "react";


export default function useMapMarkers() {
    const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]);

    function fetchMapMarkers():void {
        axios.get('/api/map-markers')
            .then(response => {
                setMapMarkers(response.data);
            })
            .catch(error => {
                console.error('Es gab ein Problem beim Abrufen der MapMarker:', error.message);
            });
    }

    useEffect(()=> fetchMapMarkers(), []);

    return {
        mapMarkers
    }
}