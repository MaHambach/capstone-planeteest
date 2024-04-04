package com.github.mahambach.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;

@With
public record AppUserResponse(
        @Id String id,
        AppUserRole role,
        String username
) {
    public AppUserResponse(AppUser appUser) {
        this(appUser.id(), appUser.role(), appUser.username());
    }
}
