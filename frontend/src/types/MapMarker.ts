import {Visibility} from "../data/Visibility.ts";
import {MapMarkerStatus} from "../data/MapMarkerStatus.ts";

export type MapMarker = {
    id: string,
    worldMapId: string,
    name: string,
    xPosition: number,
    yPosition: number,
    markerTypeId: string,
    playerArticleId: string,
    gmArticleId: string,
    status: MapMarkerStatus,
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
    status: 'ACTIVE',
    visibility: 'OWNER_ONLY'
};
