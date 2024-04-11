package com.github.mahambach.backend.model;

public record RemoveObservedRequest(
        String observerName,
        String worldMapId
) {
}
