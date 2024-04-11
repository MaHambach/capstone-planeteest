package com.github.mahambach.backend.controller;

import com.github.mahambach.backend.model.AppUserResponse;
import com.github.mahambach.backend.model.WorldMapInvite;
import com.github.mahambach.backend.model.WorldMapInviteDto;
import com.github.mahambach.backend.service.WorldMapInviteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/worldMapInvites")
@RequiredArgsConstructor
public class WorldMapInviteController {
    private final WorldMapInviteService worldMapObserveInviteService;

    @GetMapping
    public List<WorldMapInvite> getAllWorldMapInvites() {
        return worldMapObserveInviteService.getAllWorldMapInvites();
    }

    @GetMapping("/possibleInvitees/{worldMapId}")
    public List<AppUserResponse> getAllPossibleInviteesToWorldMap(@PathVariable String worldMapId) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return worldMapObserveInviteService.getAllPossibleInviteesToWorldMap(principal.getUsername(), worldMapId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorldMapInvite createWorldMapInvite(@RequestBody WorldMapInviteDto worldMapInviteDto) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return worldMapObserveInviteService.createWorldMapInvite(worldMapInviteDto, principal.getUsername());
    }

    @PostMapping("/{worldMapInviteId}/accept")
    public WorldMapInvite acceptWorldMapInvite(@PathVariable String worldMapInviteId) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return worldMapObserveInviteService.acceptWorldMapInvite(worldMapInviteId, principal.getUsername());
    }

    @DeleteMapping("/{worldMapObserveInviteId}")
    public WorldMapInvite deleteWorldMapInviteById(@PathVariable String worldMapObserveInviteId) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return worldMapObserveInviteService.deleteWorldMapInviteById(worldMapObserveInviteId, principal.getUsername());
    }
}
