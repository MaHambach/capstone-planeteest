import axios from "axios";
import {MapMarker} from "../types/MapMarker.ts";
import {useEffect, useState} from "react";
import {MapMarkerDto} from "../types/MapMarkerDto.ts";

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

    function saveMapMarker(newMapMarker:MapMarkerDto):void {
        axios.post('/api/map-markers', newMapMarker)
            .then((response) => {
                console.log("New map marker added with id " + response.data.id + ".");
                fetchMapMarkers();
            })
            .catch(error => {
                console.error("Error creating map marker: ", error.message);
            })
    }

    useEffect(()=> fetchMapMarkers(), []);

    return {
        mapMarkers,
        saveMapMarker
    }
}

/*
* 65fc6c1b61c9ee65bcf96d7e
* 65fc6c1b61c9ee65bcf96d7f
* */