import axios from "axios";
import {MapMarkerType} from "../types/MapMarkerType.ts";
import {useEffect, useState} from "react";
import {MapMarkerTypeDto} from "../types/MapMarkerTypeDto.ts";

export function useMapMarkerTypes() {
    const [mapMarkerTypes, setMapMarkerTypes] = useState<MapMarkerType[]>([]);

    function fetchMapMarkerTypes():void {
        axios.get('/api/mapMarkerTypes')
            .then(response => {
                setMapMarkerTypes(response.data);
            })
            .catch(error => {
                console.error('Es gab ein Problem beim Abrufen der MapMarker Typen:', error.message);
            });
    }

    function saveMapMarkerType(newMapMarkerType:MapMarkerTypeDto):void {
        axios.post('/api/mapMarkerTypes', newMapMarkerType)
            .then((response) => {
                console.log("New map marker type added with id " + response.data.id + ".");
                fetchMapMarkerTypes();
            })
            .catch(error => {
                console.error("Error creating map marker type: ", error.message);
            })
    }

    function updateMapMarkerType(updatedMapMarkerType: MapMarkerType):void {
        axios.put(`/api/mapMarkerTypes/${updatedMapMarkerType.id}`, updatedMapMarkerType)
            .then(fetchMapMarkerTypes)
            .catch(error => {
                if (error?.response?.status === 400) {
                    alert('Fehler: ' + error.response.data.errorMsg);
                } else {
                    alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
                }
            });
    }

    function getMapMarkerTypeById(id:string):MapMarkerType {
        const mapMarkerTypeWithId:MapMarkerType[] = mapMarkerTypes.filter((mapMarkerType:MapMarkerType) => mapMarkerType.id === id)

        if(mapMarkerTypeWithId.length === 0) console.error('Keine MapMarkerType mit der ID ' + id + ' gefunden.');
        else return mapMarkerTypeWithId[0];
        return {id:'', name:'', icon:'', color: ''};
    }

    function deleteMapMarkerType(id:string):void{
        axios.delete(`/api/mapMarkerTypes/${id}`)
            .then(fetchMapMarkerTypes)
            .catch(error => {
                console.log(error)
            });
    }

    useEffect(()=> fetchMapMarkerTypes(), []);

    return {
        mapMarkerTypes,
        saveMapMarkerType,
        updateMapMarkerType,
        getMapMarkerTypeById,
        deleteMapMarkerType
    }
}
