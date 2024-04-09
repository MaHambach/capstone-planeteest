export type WorldMapInvite = {
    id: string;
    ownerId: string;
    inviteeId: string;
    worldMapId: string;
}

export const emptyWorldMapInvite:WorldMapInvite = {
    id: '',
    ownerId: '',
    inviteeId: '',
    worldMapId: ''
}
