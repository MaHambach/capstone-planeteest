export type WorldMap = {
    id: string,
    name: string,
    worldMapUrl: string,
    xSize: number,
    ySize: number
};

export const emptyWorldMap:WorldMap = {
    id: '',
    name: '',
    worldMapUrl: '',
    xSize: 0,
    ySize: 0
};
