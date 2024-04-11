package com.github.mahambach.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mahambach.backend.model.*;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class WorldMapInviteControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    // @GetMapping
    @Test
    @WithMockUser(username = "owner")
    void getAllWorldMapInvites_whenOneWorldMapInvite_thenReturnListOfOne() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inviteeRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMapJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();

        String ownerId = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String inviteeId = objectMapper.readValue(inviteeJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String worldMapId = objectMapper.readValue(worldMapJson.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto(ownerId, inviteeId, worldMapId);

        MvcResult worldMapInviteJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInviteDto)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapInvite worldMapInvite = objectMapper.readValue(worldMapInviteJson.getResponse().getContentAsString(), WorldMapInvite.class);

        // When
        MvcResult worldMapInvitesJson = mvc.perform(get("/api/worldMapInvites"))
                .andExpect(status().isOk())
                .andReturn();

        List<WorldMapInvite> worldMapInvites = List.of(objectMapper.readValue(worldMapInvitesJson.getResponse().getContentAsString(), WorldMapInvite[].class));

        // Then
        assertEquals(worldMapInvite.ownerId(), worldMapInvites.getFirst().ownerId());
        assertEquals(worldMapInvite.inviteeId(), worldMapInvites.getFirst().inviteeId());
        assertEquals(worldMapInvite.worldMapId(), worldMapInvites.getFirst().worldMapId());
        assertEquals(worldMapInvite.id(), worldMapInvites.getFirst().id());
        assertEquals(1, worldMapInvites.size());
    }

    // @GetMapping("/{worldMapObserveInviteId}")
    @Test
    @WithMockUser(username = "owner")
    void getWorldMapInviteById_whenSuchWorldMapInvite_thenReturnWorldMapInvite() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inviteeRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMapJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();

        String ownerId = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String inviteeId = objectMapper.readValue(inviteeJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String worldMapId = objectMapper.readValue(worldMapJson.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto(ownerId, inviteeId, worldMapId);

        MvcResult worldMapInviteJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInviteDto)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapInvite expected = objectMapper.readValue(worldMapInviteJson.getResponse().getContentAsString(), WorldMapInvite.class);

        // When
        MvcResult resultJson = mvc.perform(get("/api/worldMapInvites/" + expected.id()))
                .andExpect(status().isOk())
                .andReturn();

        WorldMapInvite result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),WorldMapInvite.class);

        // Then
        assertEquals(expected, result);
    }

    @Test
    @WithMockUser(username = "owner")
    void getWorldMapInviteById_whenNoSuchWorldMapInvite_thenThrowNoSuchWorldMapInviteException() throws Exception {
        // Given
        String worldMapInviteId = "1";
        // When
        MvcResult resultJson = mvc.perform(get("/api/worldMapInvites/" + worldMapInviteId))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);

        // Then
        assertEquals("World map invite with id " + worldMapInviteId + " not found.", result.errorMsg());
    }

    // @GetMapping("/worldMap/{worldMapId}")
    @Test
    @WithMockUser(username = "owner")
    void getAllsWorldMapInvitesToWorldMap_whenMultipleExist_thenReturnThoseFitting() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();
        String ownerId = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class).id();

        AppUserRegister user1Register = new AppUserRegister("user1", "password");
        MvcResult user1ResponseJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user1Register)))
                .andExpect(status().isCreated())
                .andReturn();
        String user1Id = objectMapper.readValue(user1ResponseJson.getResponse().getContentAsString(), AppUserResponse.class).id();

        AppUserRegister user2Register = new AppUserRegister("user2", "password");
        MvcResult user2ResponseJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user2Register)))
                .andExpect(status().isCreated())
                .andReturn();
        String user2Id = objectMapper.readValue(user2ResponseJson.getResponse().getContentAsString(), AppUserResponse.class).id();

        WorldMapDto worldMap1Dto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMap1Json = mvc.perform(post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMap1Dto)))
                .andExpect(status().isCreated())
                .andReturn();
        String worldMap1Id = objectMapper.readValue(worldMap1Json.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapDto worldMap2Dto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMap2Json = mvc.perform(post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMap2Dto)))
                .andExpect(status().isCreated())
                .andReturn();
        String worldMap2Id = objectMapper.readValue(worldMap2Json.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapInviteDto worldMapInvite1Dto = new WorldMapInviteDto(ownerId, user1Id, worldMap1Id);
        WorldMapInviteDto worldMapInvite2Dto = new WorldMapInviteDto(ownerId, user1Id, worldMap2Id);
        WorldMapInviteDto worldMapInvite3Dto = new WorldMapInviteDto(ownerId, user2Id, worldMap2Id);

        MvcResult worldMapInvite1Json = mvc.perform(post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInvite1Dto)))
                .andExpect(status().isCreated())
                .andReturn();

        mvc.perform(post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInvite2Dto)))
                .andExpect(status().isCreated())
                .andReturn();

        mvc.perform(post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInvite3Dto)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapInvite worldMapInvite1 = objectMapper.readValue(worldMapInvite1Json.getResponse().getContentAsString(), WorldMapInvite.class);

        // When
        MvcResult resultJson = mvc.perform(get("/api/worldMapInvites/worldMap/" + worldMap1Id))
                .andExpect(status().isOk())
                .andReturn();
        List<WorldMapInvite> result = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), WorldMapInvite[].class));

        // Then
        assertEquals(1, result.size());
        assertEquals(worldMapInvite1, result.getFirst());
    }

    // @GetMapping("/to")
    @Test
    @WithMockUser(username = "owner")
    void getAllWorldMapInvitesToUser_whenMultipleExist_thenReturnThoseFitting() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();
        String ownerId = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class).id();

        AppUserRegister user1Register = new AppUserRegister("user1", "password");
        MvcResult user1ResponseJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user1Register)))
                .andExpect(status().isCreated())
                .andReturn();
        String user1Id = objectMapper.readValue(user1ResponseJson.getResponse().getContentAsString(), AppUserResponse.class).id();

        AppUserRegister user2Register = new AppUserRegister("user2", "password");
        MvcResult user2ResponseJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user2Register)))
                .andExpect(status().isCreated())
                .andReturn();
        String user2Id = objectMapper.readValue(user2ResponseJson.getResponse().getContentAsString(), AppUserResponse.class).id();

        WorldMapDto worldMap1Dto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMap1Json = mvc.perform(post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMap1Dto)))
                .andExpect(status().isCreated())
                .andReturn();
        String worldMap1Id = objectMapper.readValue(worldMap1Json.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapDto worldMap2Dto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMap2Json = mvc.perform(post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMap2Dto)))
                .andExpect(status().isCreated())
                .andReturn();
        String worldMap2Id = objectMapper.readValue(worldMap2Json.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapInviteDto worldMapInvite1Dto = new WorldMapInviteDto(ownerId, user1Id, worldMap1Id);
        WorldMapInviteDto worldMapInvite2Dto = new WorldMapInviteDto(ownerId, user1Id, worldMap2Id);
        WorldMapInviteDto worldMapInvite3Dto = new WorldMapInviteDto(ownerId, user2Id, worldMap2Id);

        mvc.perform(post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInvite1Dto)))
                .andExpect(status().isCreated())
                .andReturn();

        mvc.perform(post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInvite2Dto)))
                .andExpect(status().isCreated())
                .andReturn();

        MvcResult worldMapInvite3Json = mvc.perform(post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInvite3Dto)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapInvite worldMapInvite3 = objectMapper.readValue(worldMapInvite3Json.getResponse().getContentAsString(), WorldMapInvite.class);

        // When
        MvcResult resultJson = mvc.perform(get("/api/worldMapInvites/to")
                        .with(user("user2")))
                .andExpect(status().isOk())
                .andReturn();
        List<WorldMapInvite> result = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), WorldMapInvite[].class));

        // Then
        assertEquals(1, result.size());
        assertEquals(worldMapInvite3, result.getFirst());
    }

    // @GetMapping("/from")
    @Test
    @WithMockUser(username = "owner")
    void getAllWorldMapInvitesFromUser_whenSomeExist_thenReturnThoseFitting() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();
        String ownerId = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class).id();

        AppUserRegister user1Register = new AppUserRegister("user1", "password");
        MvcResult user1ResponseJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user1Register)))
                .andExpect(status().isCreated())
                .andReturn();
        String user1Id = objectMapper.readValue(user1ResponseJson.getResponse().getContentAsString(), AppUserResponse.class).id();

        AppUserRegister user2Register = new AppUserRegister("user2", "password");
        MvcResult user2ResponseJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user2Register)))
                .andExpect(status().isCreated())
                .andReturn();
        String user2Id = objectMapper.readValue(user2ResponseJson.getResponse().getContentAsString(), AppUserResponse.class).id();

        WorldMapDto worldMap1Dto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMap1Json = mvc.perform(post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMap1Dto)))
                .andExpect(status().isCreated())
                .andReturn();
        String worldMap1Id = objectMapper.readValue(worldMap1Json.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapDto worldMap2Dto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMap2Json = mvc.perform(post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMap2Dto)))
                .andExpect(status().isCreated())
                .andReturn();
        String worldMap2Id = objectMapper.readValue(worldMap2Json.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapDto worldMap3Dto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMap3Json = mvc.perform(post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMap3Dto)))
                .andExpect(status().isCreated())
                .andReturn();
        String worldMap3Id = objectMapper.readValue(worldMap3Json.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapInviteDto worldMapInvite1Dto = new WorldMapInviteDto(ownerId, user1Id, worldMap1Id);
        WorldMapInviteDto worldMapInvite2Dto = new WorldMapInviteDto(ownerId, user1Id, worldMap2Id);
        WorldMapInviteDto worldMapInvite3Dto = new WorldMapInviteDto(user1Id, user2Id, worldMap3Id);

        MvcResult worldMapInvite1Json = mvc.perform(post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInvite1Dto)))
                .andExpect(status().isCreated())
                .andReturn();

        MvcResult worldMapInvite2Json = mvc.perform(post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInvite2Dto)))
                .andExpect(status().isCreated())
                .andReturn();

        mvc.perform(post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInvite3Dto))
                        .with(user("user1")))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapInvite worldMapInvite1 = objectMapper.readValue(worldMapInvite1Json.getResponse().getContentAsString(), WorldMapInvite.class);
        WorldMapInvite worldMapInvite2 = objectMapper.readValue(worldMapInvite2Json.getResponse().getContentAsString(), WorldMapInvite.class);

        // When
        MvcResult resultJson = mvc.perform(get("/api/worldMapInvites/from"))
                .andExpect(status().isOk())
                .andReturn();
        List<WorldMapInvite> result = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), WorldMapInvite[].class));

        // Then
        assertEquals(2, result.size());
        assertTrue(result.contains(worldMapInvite1));
        assertTrue(result.contains(worldMapInvite2));
    }

    // @GetMapping("/possibleInvitees/{worldMapId}")
    @Test
    @WithMockUser(username = "owner")
    void getAllPossibleInviteesToWorldMap_whenUser1IsAlreadyInvited_thenReturnUser2() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();
        String ownerId = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class).id();

        AppUserRegister user1Register = new AppUserRegister("user1", "password");
        MvcResult user1ResponseJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user1Register)))
                .andExpect(status().isCreated())
                .andReturn();
        String user1Id = objectMapper.readValue(user1ResponseJson.getResponse().getContentAsString(), AppUserResponse.class).id();

        AppUserRegister user2Register = new AppUserRegister("user2", "password");
        MvcResult user2ResponseJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user2Register)))
                .andExpect(status().isCreated())
                .andReturn();
        AppUserResponse user2 = objectMapper.readValue(user2ResponseJson.getResponse().getContentAsString(), AppUserResponse.class);

        WorldMapDto worldMap1Dto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMap1Json = mvc.perform(post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMap1Dto)))
                .andExpect(status().isCreated())
                .andReturn();
        String worldMap1Id = objectMapper.readValue(worldMap1Json.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapInviteDto worldMapInvite1Dto = new WorldMapInviteDto(ownerId, user1Id, worldMap1Id);

        mvc.perform(post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInvite1Dto)))
                .andExpect(status().isCreated())
                .andReturn();

        // When
        MvcResult resultJson = mvc.perform(get("/api/worldMapInvites/possibleInvitees/" + worldMap1Id))
                .andExpect(status().isOk())
                .andReturn();
        List<AppUserResponse> result = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), AppUserResponse[].class));

        // Then
        assertEquals(1, result.size());
        assertEquals(user2, result.getFirst());
    }

    @Test
    @WithMockUser(username = "another")
    void getAllPossibleInviteesToWorldMap_whenUserNotOwner_thenThrowIllegalArgumentException() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister anotherRegister = new AppUserRegister("another", "password");
        mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(anotherRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMapJson = mvc.perform(post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto))
                        .with(user("owner")))
                .andExpect(status().isCreated())
                .andReturn();
        String worldMapId = objectMapper.readValue(worldMapJson.getResponse().getContentAsString(), WorldMap.class).id();

        // When
        MvcResult resultJson = mvc.perform(get("/api/worldMapInvites/possibleInvitees/" + worldMapId))
                .andExpect(status().isBadRequest())
                .andReturn();
        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);

        // Then
        assertEquals("You are not allowed to see possible observers for this world map.", result.errorMsg());
    }

    //@PostMapping
    @Test
    @WithMockUser(username = "owner")
    void createWorldMapInvite_whenNoSuchAppUser_thenThrowNoSuchAppUserException() throws Exception {
        // Given & When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new WorldMapInviteDto("1", "2", "3"))))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);
        // Then
        assertEquals("User with username owner not found.", result.errorMsg());
    }

    @Test
    @WithMockUser(username = "owner")
    void createWorldMapInvite_whenNoSuchWorldMap_thenThrowNoSuchWorldMapException() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inviteeRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        String ownerId = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String inviteeId = objectMapper.readValue(inviteeJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String worldMapId = "1";

        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto(ownerId, inviteeId, worldMapId);

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInviteDto)))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);

        // Then
        assertEquals("World map with id " + worldMapId + " not found.", result.errorMsg());
    }

    @Test
    @WithMockUser(username = "owner")
    void createWorldMapInvite_whenUserNotOwner_thenThrowIllegalArgumentException() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inviteeRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMapJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();

        String ownerId = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String inviteeId = objectMapper.readValue(inviteeJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String worldMapId = objectMapper.readValue(worldMapJson.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto(inviteeId, ownerId, worldMapId);

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInviteDto)))
                .andExpect(status().isBadRequest())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);

        // Then
        assertEquals("Owner id must be the same as the id of the user creating the invite.", result.errorMsg());
    }

    @Test
    @WithMockUser(username = "owner")
    void createWorldMapInvite_whenOwnerIdEqualsInviteeId_thenThrowIllegalArgumentException() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMapJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();

        String ownerId = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String worldMapId = objectMapper.readValue(worldMapJson.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto(ownerId, ownerId, worldMapId);

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInviteDto)))
                .andExpect(status().isBadRequest())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);

        // Then
        assertEquals("Owner and invitee must be different users.", result.errorMsg());
    }

    @Test
    @WithMockUser(username = "owner")
    void createWorldMapInvite_whenInviteAlreadyExists_thenThrowIllegalArgumentException() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inviteeRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMapJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();

        String ownerId = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String inviteeId = objectMapper.readValue(inviteeJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String worldMapId = objectMapper.readValue(worldMapJson.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto(ownerId, inviteeId, worldMapId);

        mvc.perform(MockMvcRequestBuilders.post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInviteDto)))
                .andExpect(status().isCreated())
                .andReturn();
        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInviteDto)))
                .andExpect(status().isBadRequest())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);

        // Then
        assertEquals("Invitee already has an invite for this world map.", result.errorMsg());
    }

    @Test
    @WithMockUser(username = "owner")
    void createWorldMapInvite_whenValidInput_thenReturn() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inviteeRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMapJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();

        String ownerId = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String inviteeId = objectMapper.readValue(inviteeJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String worldMapId = objectMapper.readValue(worldMapJson.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto(ownerId, inviteeId, worldMapId);

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInviteDto)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapInvite result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),WorldMapInvite.class);

        // Then
        assertEquals(inviteeId, result.inviteeId());
        assertEquals(ownerId, result.ownerId());
        assertEquals(worldMapId, result.worldMapId());
        assertNotNull(result.id());
    }

    //@PostMapping("/{worldMapInviteId}/accept")
    @Test
    @WithMockUser(username = "owner")
    void acceptWorldMapInvite_whenUserNotInvitee_thenThrowIllegalArgumentException() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();
        AppUserResponse owner = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class);

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inviteeRegister)))
                .andExpect(status().isCreated())
                .andReturn();
        AppUserResponse invitee = objectMapper.readValue(inviteeJson.getResponse().getContentAsString(), AppUserResponse.class);


        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMapJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();
        String worldMapId = objectMapper.readValue(worldMapJson.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto(owner.id(), invitee.id(), worldMapId);

        MvcResult worldMapInvite1Json = mvc.perform(post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInviteDto)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapInvite worldMapInvite = objectMapper.readValue(worldMapInvite1Json.getResponse().getContentAsString(), WorldMapInvite.class);

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldMapInvites/" + worldMapInvite.id() + "/accept"))
                .andExpect(status().isBadRequest())
                .andReturn();
        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);
        // Then
        assertEquals("Only the invitee of the invite can accept a world map invite.", result.errorMsg());
    }

    @Test
    @WithMockUser(username = "owner")
    void acceptWorldMapInvite_whenUserIsInvitee_thenAcceptInvite() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();
        AppUserResponse owner = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class);

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inviteeRegister)))
                .andExpect(status().isCreated())
                .andReturn();
        AppUserResponse invitee = objectMapper.readValue(inviteeJson.getResponse().getContentAsString(), AppUserResponse.class);


        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMapJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();
        String worldMapId = objectMapper.readValue(worldMapJson.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto(owner.id(), invitee.id(), worldMapId);

        MvcResult worldMapInvite1Json = mvc.perform(post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInviteDto)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapInvite worldMapInvite = objectMapper.readValue(worldMapInvite1Json.getResponse().getContentAsString(), WorldMapInvite.class);

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldMapInvites/" + worldMapInvite.id() + "/accept")
                        .with(user("invitee")))
                .andExpect(status().isOk())
                .andReturn();
        WorldMapInvite result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),WorldMapInvite.class);
        // Then
        assertEquals(worldMapInvite, result);
    }

    // @DeleteMapping("/{worldMapObserveInviteId}")
    @Test
    @WithMockUser(username = "owner")
    void deleteWorldMapInviteById_whenNoSuchAppUser_thenThrowNoSuchAppUserException() throws Exception {
        // Given
        String worldMapInviteId = "1";
        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.delete("/api/worldMapInvites/" + worldMapInviteId))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);
        // Then
        assertEquals("User with username owner not found.", result.errorMsg());
    }

    @Test
    @WithMockUser(username = "owner")
    void deleteWorldMapInviteById_whenNoSuchWorldMapInvite_thenThrowNoSuchWorldMapInviteException() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.delete("/api/worldMapInvites/" + "1"))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);

        // Then
        assertEquals("World map invite with id 1 not found.", result.errorMsg());
    }

    @Test
    @WithMockUser(username = "another")
    void deleteWorldMapInviteById_whenUserNotOwnerOrInvitee_thenThrowIllegalArgumentException() throws Exception {
        // Given
        AppUserRegister anotherRegister = new AppUserRegister("another", "password");
        mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(anotherRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inviteeRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMapJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();

        String ownerId = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String inviteeId = objectMapper.readValue(inviteeJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String worldMapId = objectMapper.readValue(worldMapJson.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto(ownerId, inviteeId, worldMapId);

        MvcResult worldMapInviteJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInviteDto))
                        .with(user("owner")))
                .andExpect(status().isCreated())
                .andReturn();

        String worldMapInviteId = objectMapper.readValue(worldMapInviteJson.getResponse().getContentAsString(), WorldMapInvite.class).id();

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.delete("/api/worldMapInvites/" + worldMapInviteId))
                .andExpect(status().isBadRequest())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);

        // Then
        assertEquals("Only the owner or invitee of the invite can delete a world map invite.", result.errorMsg());
    }

    @Test
    @WithMockUser(username = "owner")
    void deleteWorldMapInviteById_whenInputIsValidAndUserIsOwner_thenDeleteAndReturn() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inviteeRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMapJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();

        String ownerId = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String inviteeId = objectMapper.readValue(inviteeJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String worldMapId = objectMapper.readValue(worldMapJson.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto(ownerId, inviteeId, worldMapId);

        MvcResult worldMapInviteJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInviteDto)))
                .andExpect(status().isCreated())
                .andReturn();

        String worldMapInviteId = objectMapper.readValue(worldMapInviteJson.getResponse().getContentAsString(), WorldMapInvite.class).id();

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.delete("/api/worldMapInvites/" + worldMapInviteId))
                .andExpect(status().isOk())
                .andReturn();

        WorldMapInvite deletedWorldMapInvite = objectMapper.readValue(resultJson.getResponse().getContentAsString(),WorldMapInvite.class);

        resultJson = mvc.perform(MockMvcRequestBuilders.delete("/api/worldMapInvites/" + worldMapInviteId))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage resultError = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);
        // Then
        assertEquals(worldMapInviteId, deletedWorldMapInvite.id());
        assertEquals(ownerId, deletedWorldMapInvite.ownerId());
        assertEquals(inviteeId, deletedWorldMapInvite.inviteeId());
        assertEquals(worldMapId, deletedWorldMapInvite.worldMapId());
        assertEquals("World map invite with id " + worldMapInviteId + " not found.", resultError.errorMsg());
    }

    @Test
    @WithMockUser(username = "invitee")
    void deleteWorldMapInviteById_whenInputIsValidAndUserIsInvitee_thenDeleteAndReturn() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inviteeRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMapJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();

        String ownerId = objectMapper.readValue(ownerJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String inviteeId = objectMapper.readValue(inviteeJson.getResponse().getContentAsString(), AppUserResponse.class).id();
        String worldMapId = objectMapper.readValue(worldMapJson.getResponse().getContentAsString(), WorldMap.class).id();

        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto(ownerId, inviteeId, worldMapId);

        MvcResult worldMapInviteJson = mvc.perform(MockMvcRequestBuilders.post("/api/worldMapInvites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapInviteDto))
                        .with(user("owner")))
                .andExpect(status().isCreated())
                .andReturn();

        String worldMapInviteId = objectMapper.readValue(worldMapInviteJson.getResponse().getContentAsString(), WorldMapInvite.class).id();

        // When
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.delete("/api/worldMapInvites/" + worldMapInviteId))
                .andExpect(status().isOk())
                .andReturn();

        WorldMapInvite deletedWorldMapInvite = objectMapper.readValue(resultJson.getResponse().getContentAsString(),WorldMapInvite.class);

        resultJson = mvc.perform(MockMvcRequestBuilders.delete("/api/worldMapInvites/" + worldMapInviteId))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage resultError = objectMapper.readValue(resultJson.getResponse().getContentAsString(),ErrorMessage.class);
        // Then
        assertEquals(worldMapInviteId, deletedWorldMapInvite.id());
        assertEquals(ownerId, deletedWorldMapInvite.ownerId());
        assertEquals(inviteeId, deletedWorldMapInvite.inviteeId());
        assertEquals(worldMapId, deletedWorldMapInvite.worldMapId());
        assertEquals("World map invite with id " + worldMapInviteId + " not found.", resultError.errorMsg());
    }
}
