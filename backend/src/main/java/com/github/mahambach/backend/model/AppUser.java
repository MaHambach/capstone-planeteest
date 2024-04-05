package com.github.mahambach.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.util.List;

@With
public record AppUser(
        @Id String id,
        AppUserRole role,
        String username,
        String password,
        List<String> myWorldMapIds,
        List<String> observedWorldMapIds
) {
    public AppUser(AppUserRegister appUserRegister) {
        this(null, AppUserRole.USER, appUserRegister.username(), appUserRegister.password(), List.of(), List.of());
    }
}
