package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.MissMatchingIdsWorldMapException;
import com.github.mahambach.backend.exception.NoSuchWorldMapException;
import com.github.mahambach.backend.model.WorldMap;
import com.github.mahambach.backend.model.WorldMapDto;
import com.github.mahambach.backend.repository.WorldMapRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorldMapService {
    private final WorldMapRepo worldMapRepo;

    private final AppUserService appUserService;
    private final MapMarkerService mapMarkerService;

    public List<WorldMap> getAllWorldMaps() {
        return worldMapRepo.findAll();
    }

    public WorldMap getWorldMapById(String worldMapId) {
        return worldMapRepo
                .findById(worldMapId)
                .orElseThrow(() -> new NoSuchWorldMapException(worldMapId));
    }

    public WorldMap createWorldMap(WorldMapDto worldMapDto, String username) {
        WorldMap worldMap = worldMapRepo.save(new WorldMap(worldMapDto));

        appUserService.addMyWorldMapAppUser(username, worldMap.id());

        return worldMap;
    }

    public WorldMap updateWorldMap(String worldMapId, WorldMap worldMap) {
        if(!worldMapId.equals(worldMap.id())){
            throw new MissMatchingIdsWorldMapException(worldMapId, worldMap.id());
        }
        if(!worldMapRepo.existsById(worldMap.id())){
            throw new NoSuchWorldMapException(worldMap.id());
        }
        return worldMapRepo.save(worldMap);
    }

    public WorldMap deleteWorldMapById(String worldMapId, String ownerId) {
        WorldMap worldMap = getWorldMapById(worldMapId);
        appUserService.removeWorldmapFromAllUsers(ownerId, worldMapId);
        worldMapRepo.deleteById(worldMapId);
        mapMarkerService.deleteAllMapMarkersByWorldMapId(worldMapId);
        return worldMap;
    }

}
