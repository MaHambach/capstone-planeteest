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

    public List<WorldMap> getAllWorldMaps() {
        return worldMapRepo.findAll();
    }

    public WorldMap getWorldMapById(String worldMapId) {
        return worldMapRepo
                .findById(worldMapId)
                .orElseThrow(() -> new NoSuchWorldMapException(worldMapId));
    }

    public WorldMap createWorldMap(WorldMapDto worldMapDto) {
        return worldMapRepo.save(new WorldMap(worldMapDto));
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

    public WorldMap deleteWorldMapById(String worldMapId) {
        WorldMap worldMap = getWorldMapById(worldMapId);
        worldMapRepo.deleteById(worldMapId);
        return worldMap;
    }

}
