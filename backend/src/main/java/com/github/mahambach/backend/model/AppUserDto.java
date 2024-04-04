package com.github.mahambach.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;

@With
public record AppUserDto(
        String gitHubId,
        String username,
        String password
) {
    public AppUserDto(AppUser appUser) {
        this(appUser.gitHubId(), appUser.username(), appUser.password());
    }
}
