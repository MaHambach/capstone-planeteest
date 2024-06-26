package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.MissMatchingIdsAppUserException;
import com.github.mahambach.backend.exception.NoSuchAppUserException;
import com.github.mahambach.backend.exception.NonOwnerTriesToDeleteWorldMapException;
import com.github.mahambach.backend.exception.UserWithNameAlreadyExistsException;
import com.github.mahambach.backend.model.*;
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

    public List<AppUserResponse> getAllAppUsers(){
        List<AppUser> appUsers = appUserRepo.findAll();
        List<AppUserResponse> appUserResponses = new ArrayList<>();
        for(AppUser appUser : appUsers){
            appUserResponses.add(new AppUserResponse(appUser));
        }
        return appUserResponses;
    }

    public List<AppUserResponse> getAllObserversOfWorldMapById(String worldMapId) {
        return getAllAppUsers().stream().filter(appUser -> appUser.observedWorldMapIds().contains(worldMapId)).toList();
    }

    public AppUserResponse findAppUserByUsername(String username) {
        AppUser appUser = appUserRepo.findAppUserByUsername(username)
                                     .orElseThrow(() -> new NoSuchAppUserException(username));
        return new AppUserResponse(appUser);
    }

    public AppUserResponse createAppUser(AppUserRegister appUserRegister) {
        if (Boolean.TRUE.equals(appUserRepo.existsAppUserByUsername(appUserRegister.username()))) {
            throw new UserWithNameAlreadyExistsException(appUserRegister.username());
        }

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

        List<String> newMyWorldMapIds = new ArrayList<>(appUserUpdateObject.myWorldMapIds());

        newMyWorldMapIds.add(worldMapId);

        return updateAppUser(username, appUserUpdateObject.withMyWorldMapIds(newMyWorldMapIds));
    }

    public AppUserResponse addObservedWorldMapAppUser(String username, String worldMapId) {
        AppUserUpdateObject appUserUpdateObject = new AppUserUpdateObject(findAppUserByUsername(username));
        List<String> newObservedWorldMapIds = new ArrayList<>(appUserUpdateObject.observedWorldMapIds());
        newObservedWorldMapIds.add(worldMapId);

        return updateAppUser(username, appUserUpdateObject.withObservedWorldMapIds(newObservedWorldMapIds));
    }

    public void removeWorldmapFromAllUsers(String username, String worldMapId) {
        AppUserResponse owner = findAppUserByUsername(username);

        if(!owner.myWorldMapIds().contains(worldMapId)) throw new NonOwnerTriesToDeleteWorldMapException(owner.username(), worldMapId);

        List<AppUser> appUsers = appUserRepo.findAll();

        for(AppUser appUser : appUsers){
            List<String> myWorldMapIds = new ArrayList<>(appUser.myWorldMapIds());
            List<String> observedWorldMapIds = new ArrayList<>(appUser.observedWorldMapIds());

            myWorldMapIds.remove(worldMapId);
            observedWorldMapIds.remove(worldMapId);

            appUserRepo.save(appUser
                    .withMyWorldMapIds(myWorldMapIds)
                    .withObservedWorldMapIds(observedWorldMapIds)
            );
        }
    }

    public AppUserResponse removeObservedWorldMapAppUser(String loggedInUsername, String observerName, String worldMapId) {
        AppUserUpdateObject loggedInAppUser = new AppUserUpdateObject(findAppUserByUsername(loggedInUsername));
        AppUserUpdateObject observer = new AppUserUpdateObject(findAppUserByUsername(observerName));

        if(!(loggedInAppUser.myWorldMapIds().contains(worldMapId) || observerName.equals(loggedInUsername))) {
            throw new IllegalArgumentException("You are not allowed to remove this world map from this user.");
        }

        if(!observer.observedWorldMapIds().contains(worldMapId)) {
            throw new IllegalArgumentException("This user does not observe this world map.");
        }

        List<String> newObservedWorldMapIds = new ArrayList<>(observer.observedWorldMapIds());

        newObservedWorldMapIds.remove(worldMapId);

        return updateAppUser(observerName, observer.withObservedWorldMapIds(newObservedWorldMapIds));
    }
}
