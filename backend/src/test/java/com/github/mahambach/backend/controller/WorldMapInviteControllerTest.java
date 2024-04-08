package com.github.mahambach.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
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

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
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

    @Test
    @WithMockUser(username = "owner")
    void getAllWorldMapInvites_whenOneWorldMapInvite_thenReturnListOfOne() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType("application/json")
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
        MvcResult worldMapInvitesJson = mvc.perform(MockMvcRequestBuilders.get("/api/worldMapInvites"))
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

    @Test
    @WithMockUser(username = "owner")
    void getWorldMapInviteById_whenSuchWorldMapInvite_thenReturnWorldMapInvite() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType("application/json")
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
        MvcResult resultJson = mvc.perform(MockMvcRequestBuilders.get("/api/worldMapInvites/" + expected.id()))
                .andExpect(status().isOk())
                .andReturn();

        WorldMapInvite result = objectMapper.readValue(resultJson.getResponse().getContentAsString(),WorldMapInvite.class);

        // Then
        assertEquals(expected, result);
    }

    @Test
    @WithMockUser(username = "owner")
    void getWorldMapInviteById_whenNoSuchWorldMap_thenThrowNoSuchWorldMapInviteException() throws Exception {
        // Given
        AppUserRegister ownerRegister = new AppUserRegister("owner", "password");
        MvcResult ownerJson = mvc.perform(post("/api/users/register")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType("application/json")
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
    void createWorldMapInvite_whenNoSuchAppUser_thenThrowNoSuchAppUserException() throws Exception {
        // Given
        // When
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
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType("application/json")
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
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType("application/json")
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
                        .contentType("application/json")
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
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType("application/json")
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
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(ownerRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister inviteeRegister = new AppUserRegister("invitee", "password");
        MvcResult inviteeJson = mvc.perform(post("/api/users/register")
                        .contentType("application/json")
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

}
