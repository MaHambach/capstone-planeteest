import {Visibility} from "../data/Visibility.ts";

export type MapMarker = {
    id: string,
    worldMapId: string,
    name: string,
    xPosition: number,
    yPosition: number,
    markerTypeId: string,
    articleId: string,
    visibility: Visibility
};

export const emptyMapMarker:MapMarker = {
    id: '',
    name: '',
    xPosition: 0,
    yPosition: 0,
    worldMapId: '',
    markerTypeId: '',
    articleId: '',
    visibility: 'OWNER_ONLY'
};
