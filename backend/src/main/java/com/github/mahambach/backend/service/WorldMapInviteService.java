package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.NoSuchWorldMapInviteException;
import com.github.mahambach.backend.model.WorldMapInvite;
import com.github.mahambach.backend.repository.WorldMapInviteRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorldMapInviteService {
    private final WorldMapInviteRepo worldMapInviteRepo;

    private final AppUserService appUserService;

    public List<WorldMapInvite> getAllWorldMapInvites() {
        return worldMapInviteRepo.findAll();
    }

    public WorldMapInvite getWorldMapInviteById(String worldMapId) {
        return worldMapInviteRepo
                .findById(worldMapId)
                .orElseThrow(() -> new NoSuchWorldMapInviteException(worldMapId));
    }

    public WorldMapInvite createWorldMapInvite(WorldMapInvite worldMapInvite, String username) {
        String appUserId = appUserService.findAppUserByUsername(username).id();

        if(!worldMapInvite.ownerId().equals(appUserId)){
            throw new IllegalArgumentException("Owner id must be the same as the id of the user creating the invite.");
        }

        List<WorldMapInvite> worldMapInvites = getAllWorldMapInvites();

        for(WorldMapInvite invite : worldMapInvites){
            if(invite.inviteeId().equals(worldMapInvite.inviteeId()) && invite.worldMapId().equals(worldMapInvite.worldMapId())){
                throw new IllegalArgumentException("Invitee already has an invite for this world map.");
            }
        }

        return worldMapInviteRepo.save(worldMapInvite);
    }

    public WorldMapInvite deleteWorldMapInviteById(String worldMapInviteId, String username) {
        String appUserId = appUserService.findAppUserByUsername(username).id();
        WorldMapInvite worldMapInvite = getWorldMapInviteById(worldMapInviteId);

        if(!worldMapInvite.ownerId().equals(appUserId) || !worldMapInvite.inviteeId().equals(appUserId)){
            throw new IllegalArgumentException("Only the owner of the invite can delete a world map invite.");
        }

        worldMapInviteRepo.deleteById(worldMapInviteId);

        return worldMapInvite;
    }

}
