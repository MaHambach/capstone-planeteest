package com.github.mahambach.backend.model;

public record WorldMapDto(
        String name,
        String worldMapUrl,
        int xSize,
        int ySize
) {
    public WorldMapDto(WorldMap worldMap) {
        this(worldMap.name(), worldMap.worldMapUrl(), worldMap.xSize(), worldMap.ySize());
    }
}
