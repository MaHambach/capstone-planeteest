package com.github.mahambach.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.util.List;

@With
public record AppUserResponse(
        @Id String id,
        AppUserRole role,
        String username,
        List<String> myWorldMapIds,
        List<String> observedWorldMapIds
) {
    public AppUserResponse(AppUser appUser) {
        this(appUser.id(), appUser.role(), appUser.username(), appUser.myWorldMapIds(), appUser.observedWorldMapIds());
    }

    public AppUserResponse addMyWorldMapId(String worldMapId) {
        this.myWorldMapIds.add(worldMapId);
        return this;
    }

    public AppUserResponse addObservedWorldMapId(String worldMapId) {
        this.observedWorldMapIds.add(worldMapId);
        return this;
    }
}
