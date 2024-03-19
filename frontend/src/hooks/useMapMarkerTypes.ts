import axios from "axios";
import {MapMarkerType} from "../types/MapMarkerType.ts";
import {useEffect, useState} from "react";

export function useMapMarkerTypes() {
    const [mapMarkerTypes, setMapMarkerTypes] = useState<MapMarkerType[]>([]);

    function fetchMapMarkerTypes():void {
        axios.get('/api/worldmaps')
            .then(response => {
                setMapMarkerTypes(response.data);
            })
            .catch(error => {
                console.error('Es gab ein Problem beim Abrufen der MapMarker Typen:', error.message);
            });
    }

    function getMapMarkerTypeById(id:string):MapMarkerType {
        const mapMarkerTypeWithId:MapMarkerType[] = mapMarkerTypes.filter((mapMarkerType:MapMarkerType) => mapMarkerType.id === id)

        if(mapMarkerTypeWithId.length === 0) console.error('Kein MapMarker Typ mit der ID ' + id + ' gefunden.');
        else return mapMarkerTypeWithId[0];
        return {id:'', name:'', icon:''};
    }

    useEffect(()=> fetchMapMarkerTypes(), []);

    return {
        getMapMarkerTypeById
    }
}