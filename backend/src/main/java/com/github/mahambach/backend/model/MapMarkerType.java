package com.github.mahambach.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;

@With
public record MapMarkerType(
        @Id
        String id,
        String name,
        String iconUrl
) {
        public MapMarkerType (MapMarkerTypeDto mapMarkerTypeDto){
                this(null, mapMarkerTypeDto.name(), mapMarkerTypeDto.iconUrl());
        }
}
