package com.github.mahambach.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.util.List;

@With
public record AppUserUpdateObject(
        @Id String id,
        AppUserRole role,
        List<String> myWorldMapIds,
        List<String> observedWorldMapIds
) {
    public AppUserUpdateObject(AppUserResponse appUserResponse) {
        this(appUserResponse.id(), appUserResponse.role(), appUserResponse.myWorldMapIds(), appUserResponse.observedWorldMapIds());
    }
}
