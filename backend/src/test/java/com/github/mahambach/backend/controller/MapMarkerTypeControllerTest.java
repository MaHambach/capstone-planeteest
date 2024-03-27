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
class MapMarkerTypeControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllMapMarkerTypes_whenSomething_thenSomething() throws Exception {
        // Given
        MapMarkerTypeDto mapMarkerTypeDto = new MapMarkerTypeDto("name", "iconUrl", "#000000");
        String mapMarkerTypeDtoJson = objectMapper.writeValueAsString(mapMarkerTypeDto);

        MvcResult expectedJson = mvc.perform(post("/api/mapMarkerTypes")
                        .contentType("application/json")
                        .content(mapMarkerTypeDtoJson))
                .andExpect(status().isCreated())
                .andReturn();

        List<MapMarkerType> expected = List.of(objectMapper.readValue(expectedJson.getResponse().getContentAsString(), MapMarkerType.class));

        // When
        MvcResult resultJson = mvc.perform(get("/api/mapMarkerTypes"))
                .andExpect(status().isOk())
                .andReturn();
        List<MapMarkerType> result = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), MapMarkerType[].class));

        // Then
        assertEquals(expected, result);
    }

    @Test
    void getAllMapMarkerTypes_whenEmpty_thenEmpty() throws Exception {
        // Given
        List<MapMarkerType> expected = List.of();

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/mapMarkerTypes"))
                .andExpect(status().isOk())
                .andReturn();
        List<MapMarkerType> result = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), MapMarkerType[].class));

        // Then
        assertEquals(expected, result);
    }

    @Test
    void getMapMarkerTypeById_whenNoSuchMapMarkerType_thenThrow() throws Exception {
        // Given
        String id = "1";

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/mapMarkerTypes/" + id))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);


        // Then
        assertEquals("Map marker type with id " + id + " not found.", result.errorMsg());
    }

    @Test
    void getMapMarkerTypeById_whenSuchMapMarkerType_thenReturn() throws Exception {
        // Given
        MapMarkerTypeDto mapMarkerTypeDto = new MapMarkerTypeDto("name", "iconUrl", "#000000");

        String mapMarkerTypeDtoJson = objectMapper.writeValueAsString(mapMarkerTypeDto);

        MvcResult expectedJson = mvc.perform(MockMvcRequestBuilders.post("/api/mapMarkerTypes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapMarkerTypeDtoJson))
                .andExpect(status().isCreated())
                .andReturn();

        MapMarkerType expected = objectMapper.readValue(expectedJson.getResponse().getContentAsString(), MapMarkerType.class);
        String id = expected.id();

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/mapMarkerTypes/" + id))
                .andExpect(status().isOk())
                .andReturn();

        MapMarkerType result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), MapMarkerType.class);

        // Then
        assertEquals(expected, result);
    }

    @Test
    void createMapMarkerType_whenSomething_thenCreateAndReturn() throws Exception {
        // Given
        MapMarkerTypeDto expectedDto = new MapMarkerTypeDto("name", "iconUrl", "#000000");

        String mapMarkerTypeDtoJson = objectMapper.writeValueAsString(expectedDto);

        // When
        MvcResult expectedJson = mvc.perform(MockMvcRequestBuilders.post("/api/mapMarkerTypes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapMarkerTypeDtoJson))
                .andExpect(status().isCreated())
                .andReturn();

        MapMarkerType actual = objectMapper.readValue(expectedJson.getResponse().getContentAsString(), MapMarkerType.class);

        // Then
        assertEquals(expectedDto.name(), actual.name());
        assertEquals(expectedDto.iconUrl(), actual.iconUrl());
        assertNotNull(actual.id());
    }

    @Test
    void updateMapMarkerType_whenNoSuchMapMarkerType_thenThrow() throws Exception{
        // Given
        String id = "1";
        MapMarkerType mapMarkerType = new MapMarkerType("1", "name", "iconUrl", "#000000");

        String mapMarkerTypeJson = objectMapper.writeValueAsString(mapMarkerType);

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.put("/api/mapMarkerTypes/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapMarkerTypeJson))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("Map marker type with id " + id + " not found.", result.errorMsg());
    }


    @Test
    void updateMapMarkerType_whenPathAndBodyIdDiffer_thenThrow() throws Exception{
        // Given
        String id = "2";
        MapMarkerType mapMarkerType = new MapMarkerType("1", "name", "iconUrl", "#000000");

        String mapMarkerTypeJson = objectMapper.writeValueAsString(mapMarkerType);

        mvc.perform(MockMvcRequestBuilders.post("/api/mapMarkerTypes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapMarkerTypeJson))
                .andExpect(status().isCreated());

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.put("/api/mapMarkerTypes/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapMarkerTypeJson))
                .andExpect(status().isBadRequest())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("Map marker type with id " + id + " in path and " + mapMarkerType.id() + " in body do not match.", result.errorMsg());
    }

    @Test
    void updateMapMarkerType_whenSuchMapMarkerType_thenUpdateAndReturn() throws Exception{
        // Given
        MapMarkerTypeDto mapMarkerTypeDto = new MapMarkerTypeDto("name", "iconUrl", "#000000");

        MvcResult mapMarkerTypeOldJson = mvc.perform(MockMvcRequestBuilders.post("/api/mapMarkerTypes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mapMarkerTypeDto)))
                .andExpect(status().isCreated())
                .andReturn();

        MapMarkerType mapMarkerTypeOld = objectMapper.readValue(mapMarkerTypeOldJson.getResponse().getContentAsString(), MapMarkerType.class);

        MapMarkerType expected = mapMarkerTypeOld.withName("newName").withIconUrl("newIconUrl");

        // When
        MvcResult actualJson = mvc.perform(MockMvcRequestBuilders.put("/api/mapMarkerTypes/" + expected.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(expected)))
                .andExpect(status().isOk())
                .andReturn();

        MapMarkerType actual = objectMapper.readValue(actualJson.getResponse().getContentAsString(), MapMarkerType.class);

        // Then
        assertEquals(expected, actual);
    }

    @Test
    void deleteMapMarkerTypeById_whenNoSuchMapMarkerType_thenThrow() throws Exception {
        // Given
        String id = "1";

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.delete("/api/mapMarkerTypes/" + id))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("Map marker type with id " + id + " not found.", result.errorMsg());
    }

    @Test
    void deleteMapMarkerTypeById_whenSuchWorld_thenDeleteAndReturnDeleted() throws Exception {
        // Given
        MapMarkerTypeDto mapMarkerTypeDto = new MapMarkerTypeDto("name", "iconUrl", "#000000");

        MvcResult mapMarkerTypeJson = mvc.perform(MockMvcRequestBuilders.post("/api/mapMarkerTypes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mapMarkerTypeDto)))
                .andExpect(status().isCreated())
                .andReturn();

        MapMarkerType expectedMapMarkerType = objectMapper.readValue(mapMarkerTypeJson.getResponse().getContentAsString(), MapMarkerType.class);

        // When
        MvcResult resultMapMarkerTypeJson = mvc.perform(MockMvcRequestBuilders.delete("/api/mapMarkerTypes/" + expectedMapMarkerType.id()))
                .andExpect(status().isOk())
                .andReturn();

        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/mapMarkerTypes/" + expectedMapMarkerType.id()))
                .andExpect(status().isNotFound())
                .andReturn();

        MapMarkerType resultMapMarkerType = objectMapper.readValue(resultMapMarkerTypeJson.getResponse().getContentAsString(), MapMarkerType.class);
        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals(expectedMapMarkerType, resultMapMarkerType);
        assertEquals("Map marker type with id " + expectedMapMarkerType.id() + " not found.", result.errorMsg());
    }
}