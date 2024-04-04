package com.github.mahambach.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;

@With
public record AppUser(
        @Id String id,
        String gitHubId,
        String username,
        String password

) {
    public AppUser(AppUserDto appUserDto) {
        this(null, appUserDto.gitHubId(), appUserDto.username(), appUserDto.password());
    }
}
