import {Visibility} from "../data/Visibility.ts";
import {MapMarkerStatus} from "../data/MapMarkerStatus.ts";

export type MapMarkerDto = {
    worldMapId: string,
    name: string,
    xPosition: number,
    yPosition: number,
    markerTypeId: string,
    status: MapMarkerStatus,
    visibility: Visibility
};

export const emptyMapMarkerDto:MapMarkerDto = {
    worldMapId: '',
    name: '',
    xPosition: 0,
    yPosition: 0,
    markerTypeId: '',
    status: 'ACTIVE',
    visibility: 'OWNER_ONLY'
};
