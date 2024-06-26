package com.github.mahambach.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mahambach.backend.model.AppUserRegister;
import com.github.mahambach.backend.model.ErrorMessage;
import com.github.mahambach.backend.model.WorldMap;
import com.github.mahambach.backend.model.WorldMapDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class WorldMapControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    // @GetMapping
    @Test
    @WithMockUser(username = "username")
    void getAllWorldMaps_whenOneWorldMap_thenReturnListOfWorldMap() throws Exception {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        mvc.perform(post("/api/users/register")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(appUserRegister)))
                .andExpect(status().isCreated());

        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult expectedJson = mvc.perform(post("/api/worldmaps")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();

        List<WorldMap> expected = List.of(objectMapper.readValue(expectedJson.getResponse().getContentAsString(), WorldMap.class));
        // When
        MvcResult resultJson = mvc.perform(get("/api/worldmaps"))
                .andExpect(status().isOk())
                .andReturn();
        List<WorldMap> result = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), WorldMap[].class));

        // Then
        assertEquals(expected, result);
    }

    @Test
    @WithMockUser
    void getAllWorldMaps_whenEmpty_thenEmpty() throws Exception {
        // Given
        List<WorldMap> expected = List.of();

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/worldmaps"))
                .andExpect(status().isOk())
                .andReturn();
        List<WorldMap> result = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), WorldMap[].class));

        // Then
        assertEquals(expected, result);
    }

    // @GetMapping("/{worldMapId}")
    @Test
    @WithMockUser
    void getWorldMapById_whenNoSuchWorldMap_thenThrow() throws Exception {
        // Given
        String id = "1";

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/worldmaps/" + id))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);


        // Then
        assertEquals("World map with id " + id + " not found.", result.errorMsg());
    }

    @Test
    @WithMockUser(username = "username")
    void getWorldMapById_whenSuchWorldMap_thenReturn() throws Exception {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);
        mvc.perform(post("/api/users/register")
                        .contentType("application/json")
                        .content(appUserRegisterJson))
                .andExpect(status().isCreated());

        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        String worldMapDtoJson = objectMapper.writeValueAsString(worldMapDto);

        MvcResult expectedJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(worldMapDtoJson))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMap expected = objectMapper.readValue(expectedJson.getResponse().getContentAsString(), WorldMap.class);
        String id = expected.id();

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/worldmaps/" + id))
                .andExpect(status().isOk())
                .andReturn();

        WorldMap result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), WorldMap.class);

        // Then
        assertEquals(expected, result);
    }

    // @PostMapping
    @Test
    @WithMockUser(username = "username")
    void createWorldMap_whenValidInput_thenCreateAndReturn() throws Exception {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);
        mvc.perform(post("/api/users/register")
                        .contentType("application/json")
                        .content(appUserRegisterJson))
                .andExpect(status().isCreated());

        WorldMapDto expectedDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        String worldMapDtoJson = objectMapper.writeValueAsString(expectedDto);

        // When
        MvcResult expectedJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(worldMapDtoJson))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMap actual = objectMapper.readValue(expectedJson.getResponse().getContentAsString(), WorldMap.class);

        // Then
        assertEquals(expectedDto.name(), actual.name());
        assertEquals(expectedDto.worldMapUrl(), actual.worldMapUrl());
        assertEquals(expectedDto.xSize(), actual.xSize());
        assertEquals(expectedDto.ySize(), actual.ySize());
        assertNotNull(actual.id());
    }

    // @PutMapping("/{worldMapId}")
    @Test
    @WithMockUser
    void updateWorldMap_whenNoSuchWorldMap_thenThrow() throws Exception{
        // Given
        String id = "1000";
        WorldMap worldMap = new WorldMap("1000", "WorldMapName", "WorldMapUrl", 1024, 768);
        String worldMapJson = objectMapper.writeValueAsString(worldMap);

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.put("/api/worldmaps/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(worldMapJson))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("World map with id " + id + " not found.", result.errorMsg());
    }

    @Test
    @WithMockUser(username = "username")
    void updateWorldMap_whenPathAndBodyIdDiffer_thenThrow() throws Exception{
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);
        mvc.perform(post("/api/users/register")
                        .contentType("application/json")
                        .content(appUserRegisterJson))
                .andExpect(status().isCreated());

        String id = "1";
        WorldMap worldMap = new WorldMap("2", "WorldMapName", "WorldMapUrl", 1024, 768);
        String worldMapJson = objectMapper.writeValueAsString(worldMap);

        mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                .contentType(MediaType.APPLICATION_JSON)
                .content(worldMapJson))
                .andExpect(status().isCreated());

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.put("/api/worldmaps/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(worldMapJson))
                .andExpect(status().isBadRequest())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("World map with id 1 in path and 2 in body do not match.", result.errorMsg());
    }

    @Test
    @WithMockUser(username = "username")
    void updateWorldMap_whenSuchWorldMap_thenUpdateAndReturn() throws Exception{
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);
        mvc.perform(post("/api/users/register")
                        .contentType("application/json")
                        .content(appUserRegisterJson))
                .andExpect(status().isCreated());

        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);

        MvcResult worldMapOldJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMap worldMapOld = objectMapper.readValue(worldMapOldJson.getResponse().getContentAsString(), WorldMap.class);

        WorldMap expected = worldMapOld.withName("WorldMapNameNew").withWorldMapUrl("WorldMapUrlNew").withXSize(1986).withYSize(768);

        // When
        MvcResult actualJson = mvc.perform(MockMvcRequestBuilders.put("/api/worldmaps/" + expected.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(expected)))
                .andExpect(status().isOk())
                .andReturn();

        WorldMap actual = objectMapper.readValue(actualJson.getResponse().getContentAsString(), WorldMap.class);

        // Then
        assertEquals(expected, actual);
    }

    // @DeleteMapping("/{worldMapId}")
    @Test
    @WithMockUser
    void deleteWorldMapById_whenNoSuchWorldMap_thenThrow() throws Exception {
        // Given
        String id = "1";

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.delete("/api/worldmaps/" + id))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("World map with id " + id + " not found.", result.errorMsg());
    }

    @Test
    @WithMockUser(username = "username")
    void deleteWorldMapById_whenSuchWorld_thenDeleteAndReturnDeleted() throws Exception {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);
        mvc.perform(post("/api/users/register")
                        .contentType("application/json")
                        .content(appUserRegisterJson))
                .andExpect(status().isCreated());

        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMapJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMap expectedWorldMap = objectMapper.readValue(worldMapJson.getResponse().getContentAsString(), WorldMap.class);

        // When
        MvcResult resultWorldMapJson = mvc.perform(MockMvcRequestBuilders.delete("/api/worldmaps/" + expectedWorldMap.id()))
                .andExpect(status().isOk())
                .andReturn();

        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/worldmaps/" + expectedWorldMap.id()))
                .andExpect(status().isNotFound())
                .andReturn();

        WorldMap resultWorldMap = objectMapper.readValue(resultWorldMapJson.getResponse().getContentAsString(), WorldMap.class);
        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals(expectedWorldMap, resultWorldMap);
        assertEquals("World map with id " + expectedWorldMap.id() + " not found.", result.errorMsg());
    }
}
