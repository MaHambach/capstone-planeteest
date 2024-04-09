package com.github.mahambach.backend.controller;

import com.github.mahambach.backend.model.WorldMap;
import com.github.mahambach.backend.model.WorldMapDto;
import com.github.mahambach.backend.service.WorldMapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/worldmaps")
@RequiredArgsConstructor
public class WorldMapController {
    private final WorldMapService worldMapService;

    @GetMapping
    public List<WorldMap> getAllWorldMaps() {
        return worldMapService.getAllWorldMaps();
    }

    @GetMapping("/{worldMapId}")
    public WorldMap getWorldMapById(@PathVariable String worldMapId) {
        return worldMapService.getWorldMapById(worldMapId);
    }

    @GetMapping("/observer/{worldMapId}")
    public List<AppUserResponse> getAllObserversOfWorldMapById(@PathVariable worldMapId) {
        return worldMapService.getAllObserversOfWorldMapById(worldMapId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorldMap createWorldMap(@RequestBody WorldMapDto worldMapDto) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return worldMapService.createWorldMap(worldMapDto, principal.getUsername());
    }

    @PutMapping("/{worldMapId}")
    public WorldMap updateWorldMap(@PathVariable String worldMapId, @RequestBody WorldMap worldMap) {
        return worldMapService.updateWorldMap(worldMapId, worldMap);
    }

    @DeleteMapping("/{worldMapId}")
    public WorldMap deleteWorldMapById(@PathVariable String worldMapId) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return worldMapService.deleteWorldMapById(worldMapId, principal.getUsername());
    }
}
