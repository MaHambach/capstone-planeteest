package com.github.mahambach.backend.model;

import com.github.mahambach.backend.model.enums.MapMarkerStatus;
import com.github.mahambach.backend.model.enums.Visibility;

public record MapMarkerDto(
        String worldMapId,
        String name,
        int xPosition,
        int yPosition,
        String markerTypeId,
        String playerArticleId,
        String gmArticleId,
        MapMarkerStatus status,
        Visibility visibility
) {
}
