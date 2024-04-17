package com.github.mahambach.backend.model;

import com.github.mahambach.backend.model.enums.AppUserRole;
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
}
