package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.MissMatchingIdsWorldMapException;
import com.github.mahambach.backend.exception.NoSuchWorldMapException;
import com.github.mahambach.backend.model.WorldMap;
import com.github.mahambach.backend.model.WorldMapDto;
import com.github.mahambach.backend.repository.WorldMapRepo;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WorldMapServiceTest {

    private final WorldMapRepo worldMapRepo = mock(WorldMapRepo.class);
    private final AppUserService appUserService = mock(AppUserService.class);
    private final MapMarkerService mapMarkerService = mock(MapMarkerService.class);

    private final WorldMapService worldMapService = new WorldMapService(worldMapRepo, appUserService, mapMarkerService);


    @Test
    void getAllWorldMaps_whenOneWorldMap_thenReturnListOfWorldMap() {
        // Given
        WorldMap worldMap = new WorldMap("1", "WorldMapName", "WorldMapUrl", 1024, 768);
        List<WorldMap> expected = List.of(worldMap);

        // When
        when(worldMapRepo.findAll()).thenReturn(expected);
        List<WorldMap> actual = worldMapService.getAllWorldMaps();

        // Then
        assertEquals(expected, actual);
        verify(worldMapRepo).findAll();
        verifyNoMoreInteractions(worldMapRepo);
        verifyNoInteractions(appUserService);
        verifyNoInteractions(mapMarkerService);
    }

    @Test
    void getAllWorldMaps_whenEmpty_thenEmpty() {
        // Given
        List<WorldMap> expected = List.of();

        // When
        when(worldMapRepo.findAll()).thenReturn(expected);
        List<WorldMap> actual = worldMapService.getAllWorldMaps();

        // Then
        assertEquals(expected, actual);
        verify(worldMapRepo).findAll();
        verifyNoMoreInteractions(worldMapRepo);
        verifyNoInteractions(appUserService);
        verifyNoInteractions(mapMarkerService);
    }

    @Test
    void getWorldMapById_whenNoSuchWorldMap_thenThrow() {
        // Given
        String id = "1";

        // When
        when(worldMapRepo.findById(id)).thenReturn(java.util.Optional.empty());


        // Then
        assertThrows(NoSuchWorldMapException.class, () -> worldMapService.getWorldMapById(id));
        verify(worldMapRepo).findById(id);
        verifyNoMoreInteractions(worldMapRepo);
        verifyNoInteractions(appUserService);
        verifyNoInteractions(mapMarkerService);
    }

    @Test
    void getWorldMapById_whenSuchWorldMap_thenReturn() {
        // Given
        String id = "1";
        WorldMap expected = new WorldMap("1", "WorldMapName", "WorldMapUrl", 1024, 768);


        // When
        when(worldMapRepo.findById(id)).thenReturn(java.util.Optional.of(expected));
        WorldMap result = worldMapService.getWorldMapById(id);

        // Then
        assertEquals(expected, result);
        verify(worldMapRepo).findById(id);
        verifyNoMoreInteractions(worldMapRepo);
        verifyNoInteractions(appUserService);
        verifyNoInteractions(mapMarkerService);
    }

    @Test
    void createWorldMap_whenValidInput_thenCreateAndReturn() {
        // Given
        String username = "username";
        WorldMap expected = new WorldMap("1", "WorldMapName", "WorldMapUrl", 1024, 768);
        WorldMapDto input = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);

        // When
        when(worldMapRepo.save(new WorldMap(input))).thenReturn(expected);
        WorldMap result = worldMapService.createWorldMap(input, username);

        // Then
        assertEquals(expected, result);
        verify(worldMapRepo).save(new WorldMap(input));
        verify(appUserService).addMyWorldMapAppUser(username, expected.id());
        verifyNoMoreInteractions(appUserService);
        verifyNoInteractions(mapMarkerService);
    }

    @Test
    void updateWorldMap_whenNoSuchWorldMap_thenThrow() {
        // Given
        String id = "1";
        WorldMap worldMap = new WorldMap("1", "WorldMapName", "WorldMapUrl", 1024, 768);

        // When
        when(worldMapRepo.existsById(id)).thenReturn(false);

        // Then
        assertThrows(NoSuchWorldMapException.class, () -> worldMapService.updateWorldMap(id, worldMap));
        verify(worldMapRepo).existsById(id);
        verifyNoMoreInteractions(worldMapRepo);
        verifyNoInteractions(appUserService);
        verifyNoInteractions(mapMarkerService);
    }


    @Test
    void updateWorldMap_whenPathAndBodyIdDiffer_thenThrow() {
        // Given
        String id = "1";
        WorldMap worldMap = new WorldMap("2", "WorldMapName", "WorldMapUrl", 1024, 768);

        // When
        // Then
        assertThrows(MissMatchingIdsWorldMapException.class, () -> worldMapService.updateWorldMap(id, worldMap));
        verifyNoInteractions(worldMapRepo);
        verifyNoInteractions(appUserService);
        verifyNoInteractions(mapMarkerService);
    }

    @Test
    void updateWorldMap_whenSuchWorldMap_thenUpdateAndReturn() {
        // Given
        WorldMap worldMapOld = new WorldMap("1", "WorldMapName", "WorldMapUrl", 1024, 768);

        WorldMap expected = worldMapOld.withName("WorldMapNameNew").withWorldMapUrl("WorldMapUrlNew").withXSize(1986).withYSize(768);

        // When
        when(worldMapRepo.existsById(worldMapOld.id())).thenReturn(true);
        when(worldMapRepo.save(expected)).thenReturn(expected);
        WorldMap actual = worldMapService.updateWorldMap(worldMapOld.id(), expected);

        // Then
        assertEquals(expected, actual);
        verify(worldMapRepo).existsById(worldMapOld.id());
        verify(worldMapRepo).save(expected);
        verifyNoMoreInteractions(worldMapRepo);
        verifyNoInteractions(appUserService);
        verifyNoInteractions(mapMarkerService);
    }

    @Test
    void deleteWorldMapById_whenNoSuchWorldMap_thenThrow() {
        // Given
        String username = "username";
        String id = "1";

        // When
        when(worldMapRepo.findById(id)).thenReturn(java.util.Optional.empty());

        // Then
        assertThrows(NoSuchWorldMapException.class, () -> worldMapService.deleteWorldMapById(id,username));
        verify(worldMapRepo).findById(id);
        verifyNoMoreInteractions(worldMapRepo);
        verifyNoInteractions(appUserService);
        verifyNoInteractions(mapMarkerService);
    }

    @Test
    void deleteWorldMapById_whenSuchWorld_thenDeleteAndReturnDeleted() {
        // Given
        String username = "username";
        WorldMap expected = new WorldMap("1", "WorldMapName", "WorldMapUrl", 1024, 768);

        // When
        when(worldMapRepo.findById(expected.id())).thenReturn(java.util.Optional.of(expected));
        WorldMap actual = worldMapService.deleteWorldMapById(expected.id(), username);

        // Then
        assertEquals(expected, actual);
        verify(worldMapRepo).findById(expected.id());
        verify(worldMapRepo).deleteById(expected.id());
        verifyNoMoreInteractions(worldMapRepo);
        verify(appUserService).removeWorldmapFromAllUsers(username, expected.id());
        verifyNoMoreInteractions(appUserService);
        verify(mapMarkerService).deleteAllMapMarkersByWorldMapId(expected.id());
        verifyNoMoreInteractions(mapMarkerService);
    }
}
