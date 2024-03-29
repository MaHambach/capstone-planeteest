package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.MissMatchingIdsMapMarkerException;
import com.github.mahambach.backend.exception.NoSuchMapMarkerException;
import com.github.mahambach.backend.model.Article;
import com.github.mahambach.backend.model.ArticleDto;
import com.github.mahambach.backend.model.MapMarker;
import com.github.mahambach.backend.model.MapMarkerDto;
import com.github.mahambach.backend.repository.MapMarkerRepo;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MapMarkerServiceTest {

    private final MapMarkerRepo mapMarkerRepo = mock(MapMarkerRepo.class);
    private final ArticleService articleService = mock(ArticleService.class);

    private final MapMarkerService mapMarkerService = new MapMarkerService(mapMarkerRepo, articleService);


    @Test
    void getAllMapMarkers_whenOneMapMarker_thenReturnListOfMapMarker() {
        // Given
        MapMarker mapMarker = new MapMarker("1", "MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");
        List<MapMarker> expected = List.of(mapMarker);

        // When
        when(mapMarkerRepo.findAll()).thenReturn(expected);
        List<MapMarker> actual = mapMarkerService.getAllMapMarkers();

        // Then
        assertEquals(expected, actual);
        verify(mapMarkerRepo).findAll();
        verifyNoInteractions(articleService);
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
        verifyNoInteractions(articleService);
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
        verifyNoInteractions(articleService);
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
        verifyNoInteractions(articleService);
        verifyNoMoreInteractions(mapMarkerRepo);
    }

    @Test
    void createMapMarker_whenSomething_thenCreateAndReturn() {
        // Given
        String id = "1";
        MapMarker expected = new MapMarker(id, "MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");
        MapMarkerDto input = new MapMarkerDto("MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");
        ArticleDto newArticleDto = new ArticleDto("", List.of());
        String newArticleId = "newArticleId";
        Article newArticle = new Article(newArticleDto).withId(newArticleId);

        // When
        when(mapMarkerRepo.save(new MapMarker(input).withArticleId(newArticleId))).thenReturn(expected);
        when(articleService.createArticle(newArticleDto)).thenReturn(newArticle);
        when(mapMarkerRepo.save(new MapMarker(input).withArticleId(newArticleId))).thenReturn(expected);
        MapMarker result = mapMarkerService.createMapMarker(input);

        // Then
        assertEquals(expected, result);

        verify(articleService).createArticle(newArticleDto);
        verifyNoMoreInteractions(articleService);

        verify(mapMarkerRepo).save(new MapMarker(input).withArticleId(newArticleId));
        verifyNoMoreInteractions(mapMarkerRepo);
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
        verifyNoInteractions(articleService);
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
        verifyNoInteractions(articleService);
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
        verifyNoInteractions(articleService);
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
        verifyNoInteractions(articleService);
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
        verifyNoInteractions(articleService);
        verifyNoMoreInteractions(mapMarkerRepo);
    }
}
