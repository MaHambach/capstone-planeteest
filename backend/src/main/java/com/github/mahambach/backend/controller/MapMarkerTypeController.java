package com.github.mahambach.backend.controller;

import com.github.mahambach.backend.model.MapMarkerType;
import com.github.mahambach.backend.model.MapMarkerTypeDto;
import com.github.mahambach.backend.service.MapMarkerTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mapMarkerTypes")
@RequiredArgsConstructor
public class MapMarkerTypeController {
    private final MapMarkerTypeService mapMarkerTypeService;


    @GetMapping
    public List<MapMarkerType> getAllMapMarkerTypes() {
        return mapMarkerTypeService.getAllMapMarkerTypes();
    }

    @GetMapping("/{mapMarkerTypeId}")
    public MapMarkerType getMapMarkerTypeById(@PathVariable String mapMarkerTypeId) {
        return mapMarkerTypeService.getMapMarkerTypeById(mapMarkerTypeId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MapMarkerType createMapMarkerType(@RequestBody MapMarkerTypeDto mapMarkerTypeDto) {
        return mapMarkerTypeService.createMapMarkerType(mapMarkerTypeDto);
    }

    @PutMapping("/{mapMarkerTypeId}")
    public MapMarkerType updateMapMarkerType(@PathVariable String mapMarkerTypeId, @RequestBody MapMarkerType mapMarkerType) {
        return mapMarkerTypeService.updateMapMarkerType(mapMarkerTypeId, mapMarkerType);
    }

    @DeleteMapping("/{mapMarkerTypeId}")
    public MapMarkerType deleteMapMarkerTypeById(@PathVariable String mapMarkerTypeId) {
        return mapMarkerTypeService.deleteMapMarkerTypeById(mapMarkerTypeId);
    }
}
