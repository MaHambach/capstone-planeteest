package com.github.mahambach.backend.model;

public record WorldMapDto(
        String name,
        String worldMapUrl,
        int xSize,
        int ySize
) {
}
