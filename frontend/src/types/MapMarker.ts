import {Visibility} from "../data/Visibility.ts";

export type MapMarker = {
    id: string,
    worldMapId: string,
    name: string,
    xPosition: number,
    yPosition: number,
    markerTypeId: string,
    playerArticleId: string,
    gmArticleId: string,
    visibility: Visibility
};

export const emptyMapMarker:MapMarker = {
    id: '',
    name: '',
    xPosition: 0,
    yPosition: 0,
    worldMapId: '',
    markerTypeId: '',
    playerArticleId: '',
    gmArticleId: '',
    visibility: 'OWNER_ONLY'
};
