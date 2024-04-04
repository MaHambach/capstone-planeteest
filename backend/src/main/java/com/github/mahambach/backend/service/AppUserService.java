package com.github.mahambach.backend.service;

import com.github.mahambach.backend.model.AppUser;
import com.github.mahambach.backend.model.AppUserRegister;
import com.github.mahambach.backend.model.AppUserResponse;
import com.github.mahambach.backend.repository.AppUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppUserService {
    private final AppUserRepo appUserRepo;

    public AppUserResponse findAppUserByUsername(String username) {
        return new AppUserResponse(appUserRepo.findAppUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found")));
    }

    public AppUserResponse createAppUser(AppUserRegister appUserRegister) {
        return new AppUserResponse(appUserRepo.save(new AppUser(appUserRegister)));
    }
}
