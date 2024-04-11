package com.github.mahambach.backend.model;

public record WorldMapInviteDto(
        String ownerId,
        String inviteeId,
        String worldMapId) {
}
