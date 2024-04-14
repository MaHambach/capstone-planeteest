package com.github.mahambach.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;

@With
public record MapMarker(
        @Id
        String id,
        String worldMapId,
        String name,
        int xPosition,
        int yPosition,
        String markerTypeId,
        String playerArticleId,
        String gmArticleId,
        Visibility visibility
) {
    public MapMarker(MapMarkerDto mapMarkerDto) {
        this(null,
                mapMarkerDto.worldMapId(),
                mapMarkerDto.name(),
                mapMarkerDto.xPosition(),
                mapMarkerDto.yPosition(),
                mapMarkerDto.markerTypeId(),
                mapMarkerDto.playerArticleId(),
                mapMarkerDto.gmArticleId(),
                mapMarkerDto.visibility()
        );
    }
}
