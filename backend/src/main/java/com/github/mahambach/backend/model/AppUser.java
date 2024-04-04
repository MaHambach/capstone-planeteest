package com.github.mahambach.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;

@With
public record AppUser(
        @Id String id,
        AppUserRole role,
        String username,
        String password

) {
    public AppUser(AppUserDto appUserDto) {
        this(null, appUserDto.role(), appUserDto.username(), appUserDto.password());
    }
}
