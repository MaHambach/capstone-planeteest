package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.NoSuchWorldMapInviteException;
import com.github.mahambach.backend.model.AppUserResponse;
import com.github.mahambach.backend.model.WorldMapInvite;
import com.github.mahambach.backend.model.WorldMapInviteDto;
import com.github.mahambach.backend.repository.WorldMapInviteRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorldMapInviteService {
    private final WorldMapInviteRepo worldMapInviteRepo;

    private final AppUserService appUserService;
    private final WorldMapService worldMapService;

    public List<WorldMapInvite> getAllWorldMapInvites() {
        return worldMapInviteRepo.findAll();
    }

    public WorldMapInvite getWorldMapInviteById(String worldMapInviteId) {
        return worldMapInviteRepo
                .findById(worldMapInviteId)
                .orElseThrow(() -> new NoSuchWorldMapInviteException(worldMapInviteId));
    }

    public List<WorldMapInvite> getAllWorldMapInvitesToWorldMap(String worldMapId) {
        worldMapService.getWorldMapById(worldMapId);

        return getAllWorldMapInvites().stream()
                .filter(invite -> invite.worldMapId().equals(worldMapId))
                .toList();
    }

    public WorldMapInvite createWorldMapInvite(WorldMapInviteDto worldMapInviteDto, String username) {
        String appUserId = appUserService.findAppUserByUsername(username).id();
        worldMapService.getWorldMapById(worldMapInviteDto.worldMapId());

        if(!worldMapInviteDto.ownerId().equals(appUserId)){
            throw new IllegalArgumentException("Owner id must be the same as the id of the user creating the invite.");
        }

        if(worldMapInviteDto.ownerId().equals(worldMapInviteDto.inviteeId())){
            throw new IllegalArgumentException("Owner and invitee must be different users.");
        }

        List<WorldMapInvite> worldMapInvites = getAllWorldMapInvites();

        for(WorldMapInvite invite : worldMapInvites){
            if(invite.inviteeId().equals(worldMapInviteDto.inviteeId()) && invite.worldMapId().equals(worldMapInviteDto.worldMapId())){
                throw new IllegalArgumentException("Invitee already has an invite for this world map.");
            }
        }

        return worldMapInviteRepo.save(new WorldMapInvite(worldMapInviteDto));
    }

    public WorldMapInvite deleteWorldMapInviteById(String worldMapInviteId, String username) {
        String appUserId = appUserService.findAppUserByUsername(username).id();
        WorldMapInvite worldMapInvite = getWorldMapInviteById(worldMapInviteId);

        if(!worldMapInvite.ownerId().equals(appUserId) && !worldMapInvite.inviteeId().equals(appUserId)){
            throw new IllegalArgumentException("Only the owner or invitee of the invite can delete a world map invite.");
        }

        worldMapInviteRepo.deleteById(worldMapInviteId);

        return worldMapInvite;
    }

    public WorldMapInvite acceptWorldMapInvite(String worldMapInviteId, String username) {
        String appUserId = appUserService.findAppUserByUsername(username).id();
        WorldMapInvite worldMapInvite = getWorldMapInviteById(worldMapInviteId);

        if(!worldMapInvite.inviteeId().equals(appUserId)){
            throw new IllegalArgumentException("Only the invitee of the invite can accept a world map invite.");
        }

        appUserService.addObservedWorldMapAppUser(username, worldMapInvite.worldMapId());

        worldMapInviteRepo.deleteById(worldMapInviteId);

        return worldMapInvite;
    }


    public List<AppUserResponse> getAllPossibleInviteesToWorldMap(String username, String worldMapId) {
        AppUserResponse owner = appUserService.findAppUserByUsername(username);

        if(!owner.myWorldMapIds().contains(worldMapId)){
            throw new IllegalArgumentException("You are not allowed to see possible observers for this world map.");
        }

        List<AppUserResponse> possibleObserver = new ArrayList<>();
        List<AppUserResponse> appUsers = appUserService.getAllAppUsers();
        for(AppUserResponse appUser : appUsers){
            if(!appUser.myWorldMapIds().contains(worldMapId) && !appUser.observedWorldMapIds().contains(worldMapId)){
                possibleObserver.add(appUser);
            }
        }

        List<WorldMapInvite> worldMapInvites = getAllWorldMapInvitesToWorldMap(worldMapId);
        List<String> alreadyInvited = worldMapInvites.stream()
                .map(WorldMapInvite::inviteeId)
                .toList();

        possibleObserver.removeIf(appUser -> alreadyInvited.contains(appUser.id()));

        return possibleObserver;
    }

    public List<WorldMapInvite> getAllWorldMapInvitesToUser(String username) {
        AppUserResponse user = appUserService.findAppUserByUsername(username);

        return getAllWorldMapInvites().stream()
                .filter(invite -> invite.inviteeId().equals(user.id()))
                .toList();
    }

    public List<WorldMapInvite> getAllWorldMapInvitesFromUser(String username) {
        AppUserResponse user = appUserService.findAppUserByUsername(username);

        return getAllWorldMapInvites().stream()
                .filter(invite -> invite.ownerId().equals(user.id()))
                .toList();
    }
}
