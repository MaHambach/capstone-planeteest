package com.github.mahambach.backend.model;

import org.springframework.data.annotation.Id;

public record WorldMapInvite(
        @Id
        String id,
        String ownerId,
        String inviteeId,
        String worldMapId) {

        public WorldMapInvite (WorldMapInviteDto worldMapInviteDto) {
                this(null, worldMapInviteDto.ownerId(), worldMapInviteDto.inviteeId(), worldMapInviteDto.worldMapId());
        }
}
