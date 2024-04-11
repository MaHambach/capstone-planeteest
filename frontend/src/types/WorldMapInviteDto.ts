export type WorldMapInviteDto = {
    ownerId: string;
    inviteeId: string;
    worldMapId: string;
}

export const emptyWorldMapInviteDto:WorldMapInviteDto = {
    ownerId: '',
    inviteeId: '',
    worldMapId: ''
}
