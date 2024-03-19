package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.MissMatchingIdsMapMarkerException;
import com.github.mahambach.backend.exception.NoSuchMapMarkerException;
import com.github.mahambach.backend.model.MapMarker;
import com.github.mahambach.backend.model.MapMarkerDto;
import com.github.mahambach.backend.repository.MapMarkerRepo;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MapMarkerServiceTest {

    private final MapMarkerRepo mapMarkerRepo = mock(MapMarkerRepo.class);

    private final MapMarkerService mapMarkerService = new MapMarkerService(mapMarkerRepo);


    @Test
    void getAllMapMarkers_whenSomething_thenSomething() {
        // Given
        MapMarker mapMarker = new MapMarker("1", "MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");
        List<MapMarker> expected = List.of(mapMarker);

        // When
        when(mapMarkerRepo.findAll()).thenReturn(expected);
        List<MapMarker> actual = mapMarkerService.getAllMapMarkers();

        // Then
        assertEquals(expected, actual);
        verify(mapMarkerRepo).findAll();
        verifyNoMoreInteractions(mapMarkerRepo);
    }

    @Test
    void getAllMapMarkers_whenEmpty_thenEmpty() {
        // Given
        List<MapMarker> expected = List.of();

        // When
        when(mapMarkerRepo.findAll()).thenReturn(expected);
        List<MapMarker> actual = mapMarkerService.getAllMapMarkers();

        // Then
        assertEquals(expected, actual);
        verify(mapMarkerRepo).findAll();
        verifyNoMoreInteractions(mapMarkerRepo);
    }

    @Test
    void getMapMarkerById_whenNoSuchMapMarker_thenThrow() {
        // Given
        String id = "1";

        // When
        when(mapMarkerRepo.findById(id)).thenReturn(java.util.Optional.empty());


        // Then
        assertThrows(NoSuchMapMarkerException.class, () -> mapMarkerService.getMapMarkerById(id));
        verify(mapMarkerRepo).findById(id);
        verifyNoMoreInteractions(mapMarkerRepo);
    }

    @Test
    void getMapMarkerById_whenSuchMapMarker_thenReturn() {
        // Given
        String id = "1";
        MapMarker expected = new MapMarker("1", "MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");


        // When
        when(mapMarkerRepo.findById(id)).thenReturn(java.util.Optional.of(expected));
        MapMarker result = mapMarkerService.getMapMarkerById(id);

        // Then
        assertEquals(expected, result);
        verify(mapMarkerRepo).findById(id);
        verifyNoMoreInteractions(mapMarkerRepo);
    }

    @Test
    void createMapMarker_whenSomething_thenCreateAndReturn() {
        // Given
        String id = "1";
        MapMarker expected = new MapMarker(id, "MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");
        MapMarkerDto input = new MapMarkerDto("MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");

        // When
        when(mapMarkerRepo.save(new MapMarker(input))).thenReturn(expected);
        MapMarker result = mapMarkerService.createMapMarker(input);

        // Then
        assertEquals(expected, result);
    }

    @Test
    void updateMapMarker_whenNoSuchMapMarker_thenThrow() {
        // Given
        String id = "1";
        MapMarker mapMarker = new MapMarker(id, "MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");

        // When
        when(mapMarkerRepo.existsById(id)).thenReturn(false);

        // Then
        assertThrows(NoSuchMapMarkerException.class, () -> mapMarkerService.updateMapMarker(id, mapMarker));
        verify(mapMarkerRepo).existsById(id);
        verifyNoMoreInteractions(mapMarkerRepo);
    }


    @Test
    void updateMapMarker_whenPathAndBodyIdDiffer_thenThrow() {
        // Given
        String id = "1";
        MapMarker mapMarker = new MapMarker("2", "MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");

        // When
        // Then
        assertThrows(MissMatchingIdsMapMarkerException.class, () -> mapMarkerService.updateMapMarker(id, mapMarker));
        verifyNoInteractions(mapMarkerRepo);
    }

    @Test
    void updateMapMarker_whenSuchMapMarker_thenUpdateAndReturn() {
        // Given
        MapMarker mapMarkerOld = new MapMarker("1", "MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");

        MapMarker expected = mapMarkerOld.withWorldMapId("WorldMapIdNew").withName("MapMarkerNameNew").withXPosition(1986).withYPosition(768).withMarkerTypeId("MapMarkerTypeIdNew").withArticleId("ArticleIdNew");

        // When
        when(mapMarkerRepo.existsById(mapMarkerOld.id())).thenReturn(true);
        when(mapMarkerRepo.save(expected)).thenReturn(expected);
        MapMarker actual = mapMarkerService.updateMapMarker(mapMarkerOld.id(), expected);

        // Then
        assertEquals(expected, actual);
        verify(mapMarkerRepo).existsById(mapMarkerOld.id());
        verify(mapMarkerRepo).save(expected);
        verifyNoMoreInteractions(mapMarkerRepo);
    }

    @Test
    void deleteMapMarkerById_whenNoSuchMapMarker_thenThrow() {
        // Given
        String id = "1";

        // When
        when(mapMarkerRepo.findById(id)).thenReturn(java.util.Optional.empty());

        // Then
        assertThrows(NoSuchMapMarkerException.class, () -> mapMarkerService.deleteMapMarkerById(id));
        verify(mapMarkerRepo).findById(id);
        verifyNoMoreInteractions(mapMarkerRepo);
    }

    @Test
    void deleteMapMarkerById_whenSuchWorld_thenDeleteAndReturnDeleted() {
        // Given
        MapMarker expected = new MapMarker("1", "MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");

        // When
        when(mapMarkerRepo.findById(expected.id())).thenReturn(java.util.Optional.of(expected));
        MapMarker actual = mapMarkerService.deleteMapMarkerById(expected.id());

        // Then
        assertEquals(expected, actual);
        verify(mapMarkerRepo).findById(expected.id());
        verify(mapMarkerRepo).deleteById(expected.id());
        verifyNoMoreInteractions(mapMarkerRepo);
    }
}