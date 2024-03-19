package com.github.mahambach.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;

@With
public record WorldMap(
        @Id String id,
        String name,
        String worldMapUrl,
        int xSize,
        int ySize
        ) {
        public WorldMap(WorldMapDto worldMapDto) {
                this(null, worldMapDto.name(), worldMapDto.worldMapUrl(), worldMapDto.xSize(), worldMapDto.ySize());
        }
}
