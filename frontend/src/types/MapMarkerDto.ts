import {Visibility} from "../data/Visibility.ts";

export type MapMarkerDto = {
    worldMapId: string,
    name: string,
    xPosition: number,
    yPosition: number,
    markerTypeId: string,
    visibility: Visibility
};

export const emptyMapMarkerDto:MapMarkerDto = {
    worldMapId: '',
    name: '',
    xPosition: 0,
    yPosition: 0,
    markerTypeId: '',
    visibility: 'OWNER_ONLY'
};
