package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.MissMatchingIdsAppUserException;
import com.github.mahambach.backend.exception.NoSuchAppUserException;
import com.github.mahambach.backend.model.AppUser;
import com.github.mahambach.backend.model.AppUserRegister;
import com.github.mahambach.backend.model.AppUserResponse;
import com.github.mahambach.backend.model.AppUserUpdateObject;
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

    public AppUserResponse updateAppUser(String username, AppUserUpdateObject appUserUpdateObject) {
        AppUser appUser = appUserRepo.findAppUserByUsername(username)
                                     .orElseThrow(() -> new NoSuchAppUserException(username));

        if (!appUser.id().equals(appUserUpdateObject.id())) {
            throw new MissMatchingIdsAppUserException(appUser.id(), appUserUpdateObject.id());
        }

        AppUser updatedAppUser = new AppUser(appUserUpdateObject)
                .withPassword(appUser.password())
                .withUsername(appUser.username());

        updatedAppUser = appUserRepo.save(updatedAppUser);

        return new AppUserResponse(updatedAppUser);
    }

    public AppUserResponse addMyWorldMapAppUser(String username, String worldMapId) {
        AppUserUpdateObject appUserUpdateObject = new AppUserUpdateObject(findAppUserByUsername(username));

        List<String> newMyWorldMapIds = new ArrayList<>(appUserUpdateObject.observedWorldMapIds());

        newMyWorldMapIds.add(worldMapId);

        return updateAppUser(username, appUserUpdateObject.withMyWorldMapIds(newMyWorldMapIds));
    }

    public AppUserResponse addObservedWorldMapAppUser(String username, String worldMapId) {
        AppUserUpdateObject appUserUpdateObject = new AppUserUpdateObject(findAppUserByUsername(username));
        List<String> newObservedWorldMapIds = new ArrayList<>(appUserUpdateObject.observedWorldMapIds());
        newObservedWorldMapIds.add(worldMapId);

        return updateAppUser(username, appUserUpdateObject.withObservedWorldMapIds(newObservedWorldMapIds));
    }
}
