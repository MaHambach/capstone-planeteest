package com.github.mahambach.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mahambach.backend.model.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class MapMarkerControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllMapMarkers_whenSomething_thenSomething() throws Exception {
        // Given
        MapMarkerDto mapMarkerDto = new MapMarkerDto("MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");
        String mapMarkerDtoJson = objectMapper.writeValueAsString(mapMarkerDto);

        MvcResult expectedJson = mvc.perform(post("/api/map-markers")
                        .contentType("application/json")
                        .content(mapMarkerDtoJson))
                .andExpect(status().isCreated())
                .andReturn();

        List<MapMarker> expected = List.of(objectMapper.readValue(expectedJson.getResponse().getContentAsString(), MapMarker.class));
        
        // When
        MvcResult resultJson = mvc.perform(get("/api/map-markers"))
                .andExpect(status().isOk())
                .andReturn();
        List<MapMarker> result = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), MapMarker[].class));

        // Then
        assertEquals(expected, result);
    }
    
    @Test
    void getAllMapMarkers_whenEmpty_thenEmpty() throws Exception {
        // Given
        List<MapMarker> expected = List.of();

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/map-markers"))
                .andExpect(status().isOk())
                .andReturn();
        List<MapMarker> result = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), MapMarker[].class));

        // Then
        assertEquals(expected, result);
    }

    @Test
    void getMapMarkerById_whenNoSuchMapMarker_thenThrow() throws Exception {
        // Given
        String id = "1";

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/map-markers/" + id))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);


        // Then
        assertEquals("Map marker with id " + id + " not found.", result.errorMsg());
    }

    @Test
    void getMapMarkerById_whenSuchMapMarker_thenReturn() throws Exception {
        // Given
        MapMarkerDto mapMarkerDto = new MapMarkerDto("MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");
        String mapMarkerDtoJson = objectMapper.writeValueAsString(mapMarkerDto);

        MvcResult expectedJson = mvc.perform(MockMvcRequestBuilders.post("/api/map-markers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapMarkerDtoJson))
                .andExpect(status().isCreated())
                .andReturn();

        MapMarker expected = objectMapper.readValue(expectedJson.getResponse().getContentAsString(), MapMarker.class);
        String id = expected.id();

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/map-markers/" + id))
                .andExpect(status().isOk())
                .andReturn();

        MapMarker result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), MapMarker.class);

        // Then
        assertEquals(expected, result);
    }

    @Test
    void createMapMarker_whenSomething_thenCreateAndReturn() throws Exception {
        // Given
        MapMarkerDto expectedDto = new MapMarkerDto("MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");
        String mapMarkerDtoJson = objectMapper.writeValueAsString(expectedDto);

        // When
        MvcResult expectedJson = mvc.perform(MockMvcRequestBuilders.post("/api/map-markers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapMarkerDtoJson))
                .andExpect(status().isCreated())
                .andReturn();

        MapMarker actual = objectMapper.readValue(expectedJson.getResponse().getContentAsString(), MapMarker.class);

        // Then
        assertEquals(expectedDto.worldMapId(), actual.worldMapId());
        assertEquals(expectedDto.name(), actual.name());
        assertEquals(expectedDto.xPosition(), actual.xPosition());
        assertEquals(expectedDto.yPosition(), actual.yPosition());
        assertEquals(expectedDto.markerTypeId(), actual.markerTypeId());
        assertNotNull(actual.articleId());
        assertNotNull(actual.id());
    }

    @Test
    void updateMapMarker_whenNoSuchMapMarker_thenThrow() throws Exception{
        // Given
        String id = "1000";
        MapMarker mapMarker = new MapMarker("1000", "MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");
        String mapMarkerJson = objectMapper.writeValueAsString(mapMarker);

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.put("/api/map-markers/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapMarkerJson))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("Map marker with id " + id + " not found.", result.errorMsg());
    }


    @Test
    void updateMapMarker_whenPathAndBodyIdDiffer_thenThrow() throws Exception{
        // Given
        String id = "1";
        MapMarker mapMarker = new MapMarker("2", "MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");
        String mapMarkerJson = objectMapper.writeValueAsString(mapMarker);

        mvc.perform(MockMvcRequestBuilders.post("/api/map-markers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapMarkerJson))
                .andExpect(status().isCreated());

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.put("/api/map-markers/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapMarkerJson))
                .andExpect(status().isBadRequest())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("Map marker with id 1 in path and 2 in body do not match.", result.errorMsg());
    }

    @Test
    void updateMapMarker_whenSuchMapMarker_thenUpdateAndReturn() throws Exception{
        // Given
        MapMarkerDto mapMarkerDto = new MapMarkerDto("WorldMapId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");

        MvcResult mapMarkerOldJson = mvc.perform(MockMvcRequestBuilders.post("/api/map-markers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mapMarkerDto)))
                .andExpect(status().isCreated())
                .andReturn();

        MapMarker mapMarkerOld = objectMapper.readValue(mapMarkerOldJson.getResponse().getContentAsString(), MapMarker.class);

        MapMarker expected = mapMarkerOld.withWorldMapId("WorldMapIdNew").withName("MapMarkerNameNew").withXPosition(1986).withYPosition(768).withMarkerTypeId("MapMarkerTypeIdNew").withArticleId("ArticleIdNew");

        // When
        MvcResult actualJson = mvc.perform(MockMvcRequestBuilders.put("/api/map-markers/" + expected.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(expected)))
                .andExpect(status().isOk())
                .andReturn();

        MapMarker actual = objectMapper.readValue(actualJson.getResponse().getContentAsString(), MapMarker.class);

        // Then
        assertEquals(expected, actual);
    }

    @Test
    void deleteMapMarkerById_whenNoSuchMapMarker_thenThrow() throws Exception {
        // Given
        String id = "1";

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.delete("/api/map-markers/" + id))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("Map marker with id " + id + " not found.", result.errorMsg());
    }

    @Test
    void deleteMapMarkerById_whenSuchWorld_thenDeletAndReturnDeleted() throws Exception {
        // Given
        MapMarkerDto mapMarkerDto = new MapMarkerDto("MapMarkerId", "MapMarkerName", 128, 64, "MapMarkerTypeId", "ArticleId");

        MvcResult mapMarkerJson = mvc.perform(MockMvcRequestBuilders.post("/api/map-markers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mapMarkerDto)))
                .andExpect(status().isCreated())
                .andReturn();

        MapMarker expectedMapMarker = objectMapper.readValue(mapMarkerJson.getResponse().getContentAsString(), MapMarker.class);

        // When
        MvcResult resultMapMarkerJson = mvc.perform(MockMvcRequestBuilders.delete("/api/map-markers/" + expectedMapMarker.id()))
                .andExpect(status().isOk())
                .andReturn();

        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/map-markers/" + expectedMapMarker.id()))
                .andExpect(status().isNotFound())
                .andReturn();

        MapMarker resultMapMarker = objectMapper.readValue(resultMapMarkerJson.getResponse().getContentAsString(), MapMarker.class);
        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals(expectedMapMarker, resultMapMarker);
        assertEquals("Map marker with id " + expectedMapMarker.id() + " not found.", result.errorMsg());
    }
}