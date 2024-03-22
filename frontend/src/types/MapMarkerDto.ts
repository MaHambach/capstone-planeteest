export type MapMarkerDto = {
    worldMapId: string,
    name: string
    xPosition: number
    yPosition: number
    markerTypeId: string
};

export const emptyMapMarkerDto:MapMarkerDto = {
    worldMapId: '',
    name: '',
    xPosition: 0,
    yPosition: 0,
    markerTypeId: ''
};
