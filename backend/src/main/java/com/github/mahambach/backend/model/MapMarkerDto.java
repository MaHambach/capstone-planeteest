package com.github.mahambach.backend.model;

public record MapMarkerDto(
        String worldMapId,
        String name,
        int xPosition,
        int yPosition,
        String markerTypeId,
        String articleId,
        Visibility visibility
) {
}
