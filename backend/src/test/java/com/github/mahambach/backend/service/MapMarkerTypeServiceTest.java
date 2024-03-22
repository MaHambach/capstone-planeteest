package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.MissMatchingIdsMapMarkerTypeException;
import com.github.mahambach.backend.exception.NoSuchMapMarkerTypeException;
import com.github.mahambach.backend.model.MapMarkerType;
import com.github.mahambach.backend.model.MapMarkerTypeDto;
import com.github.mahambach.backend.repository.MapMarkerTypeRepo;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MapMarkerTypeServiceTest {
    private final MapMarkerTypeRepo mapMarkerTypeRepo = mock(MapMarkerTypeRepo.class);

    private final MapMarkerTypeService mapMarkerTypeService = new MapMarkerTypeService(mapMarkerTypeRepo);


    @Test
    void getAllMapMarkerTypes_whenSomething_thenSomething() {
        // Given
        MapMarkerType mapMarkerType = new MapMarkerType("1", "name", "iconUrl");
        List<MapMarkerType> expected = List.of(mapMarkerType);

        // When
        when(mapMarkerTypeRepo.findAll()).thenReturn(expected);
        List<MapMarkerType> actual = mapMarkerTypeService.getAllMapMarkerTypes();

        // Then
        assertEquals(expected, actual);
        verify(mapMarkerTypeRepo).findAll();
        verifyNoMoreInteractions(mapMarkerTypeRepo);
    }

    @Test
    void getAllMapMarkerTypes_whenEmpty_thenEmpty() {
        // Given
        List<MapMarkerType> expected = List.of();

        // When
        when(mapMarkerTypeRepo.findAll()).thenReturn(expected);
        List<MapMarkerType> actual = mapMarkerTypeService.getAllMapMarkerTypes();

        // Then
        assertEquals(expected, actual);
        verify(mapMarkerTypeRepo).findAll();
        verifyNoMoreInteractions(mapMarkerTypeRepo);
    }

    @Test
    void getMapMarkerTypeById_whenNoSuchMapMarkerType_thenThrow() {
        // Given
        String id = "1";

        // When
        when(mapMarkerTypeRepo.findById(id)).thenReturn(java.util.Optional.empty());


        // Then
        assertThrows(NoSuchMapMarkerTypeException.class, () -> mapMarkerTypeService.getMapMarkerTypeById(id));
        verify(mapMarkerTypeRepo).findById(id);
        verifyNoMoreInteractions(mapMarkerTypeRepo);
    }

    @Test
    void getMapMarkerTypeById_whenSuchMapMarkerType_thenReturn()  {
        // Given
        String id = "1";
        MapMarkerType expected = new MapMarkerType("1", "name", "iconUrl");

        // When
        when(mapMarkerTypeRepo.findById(id)).thenReturn(java.util.Optional.of(expected));
        MapMarkerType result = mapMarkerTypeService.getMapMarkerTypeById(id);

        // Then
        assertEquals(expected, result);
        verify(mapMarkerTypeRepo).findById(id);
        verifyNoMoreInteractions(mapMarkerTypeRepo);
    }

    @Test
    void createMapMarkerType_whenSomething_thenCreateAndReturn() {
        // Given
        MapMarkerType expected = new MapMarkerType("1", "name", "iconUrl");
        MapMarkerTypeDto input = new MapMarkerTypeDto("name", "iconUrl");

        // When
        when(mapMarkerTypeRepo.save(new MapMarkerType(input))).thenReturn(expected);
        MapMarkerType result = mapMarkerTypeService.createMapMarkerType(input);

        // Then
        assertEquals(expected, result);
    }

    @Test
    void updateMapMarkerType_whenNoSuchMapMarkerType_thenThrow() {
        // Given
        String id = "1";
        MapMarkerType mapMarkerType = new MapMarkerType("1", "name", "iconUrl");

        // When
        when(mapMarkerTypeRepo.existsById(id)).thenReturn(false);

        // Then
        assertThrows(NoSuchMapMarkerTypeException.class, () -> mapMarkerTypeService.updateMapMarkerType(id, mapMarkerType));
        verify(mapMarkerTypeRepo).existsById(id);
        verifyNoMoreInteractions(mapMarkerTypeRepo);
    }


    @Test
    void updateMapMarkerType_whenPathAndBodyIdDiffer_thenThrow() {
        // Given
        String id = "2";
        MapMarkerType mapMarkerType = new MapMarkerType("1", "name", "iconUrl");

        // When
        // Then
        assertThrows(MissMatchingIdsMapMarkerTypeException.class, () -> mapMarkerTypeService.updateMapMarkerType(id, mapMarkerType));
        verifyNoInteractions(mapMarkerTypeRepo);
    }

    @Test
    void updateMapMarkerType_whenSuchMapMarkerType_thenUpdateAndReturn() {
        // Given
        MapMarkerType mapMarkerTypeOld = new MapMarkerType("1", "name", "iconUrl");
        MapMarkerType expected = mapMarkerTypeOld.withName("newName").withIconUrl("newIconUrl");

        // When
        when(mapMarkerTypeRepo.existsById(mapMarkerTypeOld.id())).thenReturn(true);
        when(mapMarkerTypeRepo.save(expected)).thenReturn(expected);
        MapMarkerType actual = mapMarkerTypeService.updateMapMarkerType(mapMarkerTypeOld.id(), expected);

        // Then
        assertEquals(expected, actual);
        verify(mapMarkerTypeRepo).existsById(mapMarkerTypeOld.id());
        verify(mapMarkerTypeRepo).save(expected);
        verifyNoMoreInteractions(mapMarkerTypeRepo);
    }

    @Test
    void deleteMapMarkerTypeById_whenNoSuchMapMarkerType_thenThrow() {
        // Given
        String id = "1";

        // When
        when(mapMarkerTypeRepo.findById(id)).thenReturn(java.util.Optional.empty());

        // Then
        assertThrows(NoSuchMapMarkerTypeException.class, () -> mapMarkerTypeService.deleteMapMarkerTypeById(id));
        verify(mapMarkerTypeRepo).findById(id);
        verifyNoMoreInteractions(mapMarkerTypeRepo);
    }

    @Test
    void deleteMapMarkerTypeById_whenSuchWorld_thenDeleteAndReturnDeleted() {
        // Given
        MapMarkerType expected = new MapMarkerType("1", "name", "iconUrl");

        // When
        when(mapMarkerTypeRepo.findById(expected.id())).thenReturn(java.util.Optional.of(expected));
        MapMarkerType actual = mapMarkerTypeService.deleteMapMarkerTypeById(expected.id());

        // Then
        assertEquals(expected, actual);
        verify(mapMarkerTypeRepo).findById(expected.id());
        verify(mapMarkerTypeRepo).deleteById(expected.id());
        verifyNoMoreInteractions(mapMarkerTypeRepo);
    }
}