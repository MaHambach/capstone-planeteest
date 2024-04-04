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
    public AppUser(AppUserRegister appUserRegister) {
        this(null, AppUserRole.USER, appUserRegister.username(), appUserRegister.password());
    }
}
