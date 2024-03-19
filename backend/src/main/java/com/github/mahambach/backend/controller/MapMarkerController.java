package com.github.mahambach.backend.controller;

import com.github.mahambach.backend.model.MapMarker;
import com.github.mahambach.backend.model.MapMarkerDto;
import com.github.mahambach.backend.service.MapMarkerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/map-markers")
@RequiredArgsConstructor
public class MapMarkerController {
    private final MapMarkerService mapMarkerService;


    @GetMapping
    public List<MapMarker> getAllMapMarkers() {
        return mapMarkerService.getAllMapMarkers();
    }

    @GetMapping("/{mapMarkerId}")
    public MapMarker getMapMarkerById(@PathVariable String mapMarkerId) {
        return mapMarkerService.getMapMarkerById(mapMarkerId);
    }

    @PostMapping
    public MapMarker createMapMarker(MapMarkerDto mapMarkerDto) {
        return mapMarkerService.createMapMarker(mapMarkerDto);
    }

    @PutMapping("/{mapMarkerId}")
    public MapMarker updateMapMarker(@PathVariable String mapMarkerId, @RequestBody MapMarker mapMarker) {
        return mapMarkerService.updateMapMarker(mapMarkerId, mapMarker);
    }

    @DeleteMapping("/{mapMarkerId}")
    public MapMarker deleteMapMarkerById(@PathVariable String mapMarkerId) {
        return mapMarkerService.deleteMapMarkerById(mapMarkerId);
    }
}
