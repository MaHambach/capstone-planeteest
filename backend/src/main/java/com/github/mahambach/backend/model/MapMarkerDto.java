package com.github.mahambach.backend.model;

import org.springframework.data.annotation.Id;

public record MapMarkerDto(
        String worldMapId,
        String name,
        int xPosition,
        int yPosition,
        String markerTypeId,
        String articleId
) {
    public MapMarkerDto(MapMarker mapMarker) {
        this(mapMarker.worldMapId(), mapMarker.name(), mapMarker.xPosition(), mapMarker.yPosition(), mapMarker.markerTypeId(), mapMarker.articleId());
    }
}
