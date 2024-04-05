package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.MissMatchingIdsAppUserException;
import com.github.mahambach.backend.exception.NoSuchAppUserException;
import com.github.mahambach.backend.model.AppUser;
import com.github.mahambach.backend.model.AppUserRegister;
import com.github.mahambach.backend.model.AppUserResponse;
import com.github.mahambach.backend.repository.AppUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppUserService {
    private final AppUserRepo appUserRepo;
    private final PasswordEncoder passwordEncoder;

    public AppUserResponse findAppUserByUsername(String username) {
        AppUser appUser = appUserRepo.findAppUserByUsername(username)
                                     .orElseThrow(() -> new NoSuchAppUserException(username));
        return new AppUserResponse(appUser);
    }

    public AppUserResponse createAppUser(AppUserRegister appUserRegister) {
        String password = passwordEncoder.encode(appUserRegister.password());
        AppUser newAppUser = appUserRepo.save(new AppUser(appUserRegister).withPassword(password));
        return new AppUserResponse(newAppUser);
    }

    public AppUserResponse updateAppUser(String username, String appUserId, AppUserResponse appUserResponse) {
        AppUser appUser = appUserRepo.findAppUserByUsername(username)
                                     .orElseThrow(() -> new NoSuchAppUserException(appUserId));

        if (!appUser.id().equals(appUserId)) {
            throw new MissMatchingIdsAppUserException(appUserId, appUser.id());
        }

        AppUser updatedAppUser = new AppUser(appUserResponse).withPassword(appUser.password());

        updatedAppUser = appUserRepo.save(updatedAppUser);

        return new AppUserResponse(updatedAppUser);
    }

    public AppUserResponse addMyWorldMapAppUser(String username, String appUserId, String worldMapId) {
        AppUserResponse appUserResponse = findAppUserByUsername(username);

        List<String> newMyWorldMapIds = new ArrayList<>(appUserResponse.observedWorldMapIds());

        newMyWorldMapIds.add(worldMapId);

        appUserResponse = appUserResponse.withMyWorldMapIds(newMyWorldMapIds);

        return updateAppUser(username, appUserId, appUserResponse);
    }

    public AppUserResponse addObservedWorldMapAppUser(String username, String appUserId, String worldMapId) {
        AppUserResponse appUserResponse = findAppUserByUsername(username);
        List<String> newObservedWorldMapIds = new ArrayList<>(appUserResponse.observedWorldMapIds());
        newObservedWorldMapIds.add(worldMapId);
        appUserResponse = appUserResponse.withObservedWorldMapIds(newObservedWorldMapIds);

        return updateAppUser(username, appUserId, appUserResponse);
    }
}
