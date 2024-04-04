package com.github.mahambach.backend.service;

import com.github.mahambach.backend.model.AppUser;
import com.github.mahambach.backend.model.AppUserDto;
import com.github.mahambach.backend.repository.AppUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppUserService {
    private final AppUserRepo appUserRepo;

    public AppUser findAppUserByUsername(String username) {
        return appUserRepo.findAppUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public AppUserDto createAppUser(AppUserDto appUserDto) {
        return new AppUserDto(appUserRepo.save(new AppUser(appUserDto)));
    }
}
