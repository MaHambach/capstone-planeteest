package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.NoSuchMapMarkerException;
import com.github.mahambach.backend.model.MapMarker;
import com.github.mahambach.backend.model.MapMarkerDto;
import com.github.mahambach.backend.repository.MapMarkerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MapMarkerService {
    private final MapMarkerRepo mapMarkerRepo;

    public List<MapMarker> getAllMapMarkers() {
        return mapMarkerRepo.findAll();
    }

    public MapMarker getMapMarkerById(String mapMarkerId) {
        return mapMarkerRepo
                .findById(mapMarkerId)
                .orElseThrow(() -> new NoSuchMapMarkerException(mapMarkerId));
    }

    public MapMarker createMapMarker(MapMarkerDto mapMarkerDto) {
        return mapMarkerRepo.save(new MapMarker(mapMarkerDto));
    }

    public MapMarker updateMapMarker(String mapMarkerId, MapMarker mapMarker) {
        if(mapMarkerRepo.existsById(mapMarker.id()) && !mapMarkerId.equals(mapMarker.id())) {
            throw new NoSuchMapMarkerException(mapMarker.id());
        }
        return mapMarkerRepo.save(mapMarker);
    }

    public MapMarker deleteMapMarkerById(String mapMarkerId) {
        MapMarker mapMarker = getMapMarkerById(mapMarkerId);
        mapMarkerRepo.deleteById(mapMarkerId);
        return mapMarker;
    }

}
