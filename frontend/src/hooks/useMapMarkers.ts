import axios from "axios";
import {MapMarker} from "../types/MapMarker.ts";
import {useState} from "react";
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

    function updateMapMarker(updatedMapMarker: MapMarker):void {
        axios.put(`/api/map-markers/${updatedMapMarker.id}`, updatedMapMarker)
            .then(fetchMapMarkers)
            .catch(error => {
                if (error?.response?.status === 400) {
                    alert('Fehler: ' + error.response.data.errorMsg);
                } else {
                    alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
                }
            });
    }

    function deleteMapMarker(id:string):void{
        axios.delete(`/api/map-markers/${id}`)
            .then(fetchMapMarkers)
            .catch(error => {
                console.log(error)
            });
    }

    return {
        mapMarkers,
        fetchMapMarkers,
        saveMapMarker,
        updateMapMarker,
        deleteMapMarker
    }
}
