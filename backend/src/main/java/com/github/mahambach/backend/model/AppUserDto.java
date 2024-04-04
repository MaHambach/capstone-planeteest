package com.github.mahambach.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;

@With
public record AppUserDto(
        AppUserRole role,
        String username,
        String password
) {
    public AppUserDto(AppUser appUser) {
        this(appUser.role(), appUser.username(), appUser.password());
    }
}
