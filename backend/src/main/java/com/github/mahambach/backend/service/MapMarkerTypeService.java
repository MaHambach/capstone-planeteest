package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.MissMatchingIdsMapMarkerTypeException;
import com.github.mahambach.backend.exception.NoSuchMapMarkerTypeException;
import com.github.mahambach.backend.model.MapMarkerType;
import com.github.mahambach.backend.model.MapMarkerTypeDto;
import com.github.mahambach.backend.repository.MapMarkerTypeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MapMarkerTypeService {
    private final MapMarkerTypeRepo mapMarkerTypeRepo;

    public List<MapMarkerType> getAllMapMarkerTypes() {
        return mapMarkerTypeRepo.findAll();
    }

    public MapMarkerType getMapMarkerTypeById(String mapMarkerTypeId) {
        return mapMarkerTypeRepo
                .findById(mapMarkerTypeId)
                .orElseThrow(() -> new NoSuchMapMarkerTypeException(mapMarkerTypeId));
    }

    public MapMarkerType createMapMarkerType(MapMarkerTypeDto mapMarkerTypeDto) {
        return mapMarkerTypeRepo.save(new MapMarkerType(mapMarkerTypeDto));
    }

    public MapMarkerType updateMapMarkerType(String mapMarkerTypeId, MapMarkerType mapMarkerType) {
        if(!mapMarkerTypeId.equals(mapMarkerType.id())){
            throw new MissMatchingIdsMapMarkerTypeException(mapMarkerTypeId, mapMarkerType.id());
        }
        if(!mapMarkerTypeRepo.existsById(mapMarkerType.id())) {
            throw new NoSuchMapMarkerTypeException(mapMarkerType.id());
        }

        return mapMarkerTypeRepo.save(mapMarkerType);
    }

    public MapMarkerType deleteMapMarkerTypeById(String mapMarkerTypeId) {
        MapMarkerType mapMarkerType = getMapMarkerTypeById(mapMarkerTypeId);
        mapMarkerTypeRepo.deleteById(mapMarkerTypeId);
        return mapMarkerType;
    }
}
