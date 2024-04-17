package com.github.mahambach.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mahambach.backend.model.*;
import com.github.mahambach.backend.model.enums.AppUserRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;


    // @GetMapping
    @Test
    @WithMockUser
    void getAllAppUsers_whenSomeUsers_thenReturnThose() throws Exception{
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);
        mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(appUserRegisterJson))
                .andExpect(status().isCreated())
                .andReturn();

        // When
        MvcResult resultJson = mvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andReturn();

        AppUserResponse[] appUserResponses = objectMapper.readValue(resultJson.getResponse().getContentAsString(), AppUserResponse[].class);

        // Then
        assertEquals(1, appUserResponses.length);
        assertEquals(appUserRegister.username(), appUserResponses[0].username());
        assertEquals(AppUserRole.USER, appUserResponses[0].role());
        assertNotNull(appUserResponses[0].id());
        assertTrue(appUserResponses[0].myWorldMapIds().isEmpty());
        assertTrue(appUserResponses[0].observedWorldMapIds().isEmpty());
    }

    // @GetMapping("/me")
    @Test
    @WithMockUser(username = "username")
    void getAppUserByUsername_whenLoggedInUser_expectUser() throws Exception  {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);
        mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(appUserRegisterJson))
                .andExpect(status().isCreated());

        // When
        MvcResult resultJson = mvc.perform(get("/api/users/me"))
                .andExpect(status().isOk())
                .andReturn();

        AppUserResponse appUserResponse = objectMapper.readValue(resultJson.getResponse().getContentAsString(), AppUserResponse.class);

        // Then
        assertEquals(appUserRegister.username(), appUserResponse.username());
        assertEquals(AppUserRole.USER, appUserResponse.role());
        assertNotNull(appUserResponse.id());
        assertTrue(appUserResponse.myWorldMapIds().isEmpty());
        assertTrue(appUserResponse.observedWorldMapIds().isEmpty());
    }

    @Test
    void getAppUserByUsername_whenNotLoggedIn_thenIsUnauthorized() throws Exception  {
        // Given, When & Then
        mvc.perform(get("/api/users/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void getAppUserByUsername_whenNoSuchUser_thenThrow() throws Exception {
        // Given & When
        MvcResult resultJson = mvc.perform(get("/api/users/me"))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("User with username user not found.", result.errorMsg());
    }

    // @GetMapping("/observers/{worldMapId}")
    @Test
    @WithMockUser(username = "username")
    void getAllObserverOfWorldMapById_whenSomeObservers_thenReturnThem() throws Exception {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appUserRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserRegister observer1Register = new AppUserRegister("observer1", "password");
        MvcResult observer1ResponseJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(observer1Register)))
                .andExpect(status().isCreated())
                .andReturn();
        AppUserResponse observer1Response = objectMapper.readValue(observer1ResponseJson.getResponse().getContentAsString(), AppUserResponse.class);

        AppUserRegister observer2Register = new AppUserRegister("observer2", "password");
        MvcResult observer2ResponseJson = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(observer2Register)))
                .andExpect(status().isCreated())
                .andReturn();
        AppUserResponse observer2Response = objectMapper.readValue(observer2ResponseJson.getResponse().getContentAsString(), AppUserResponse.class);


        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMapResponseJson = mvc.perform(post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();

        String worldMapId = objectMapper.readValue(worldMapResponseJson.getResponse().getContentAsString(), WorldMap.class).id();

        mvc.perform(put("/api/users/add-observed")
                .contentType(MediaType.APPLICATION_JSON)
                .content(worldMapId)
                .with(user("observer1")))
                .andExpect(status().isOk());

        mvc.perform(put("/api/users/add-observed")
                .contentType(MediaType.APPLICATION_JSON)
                .content(worldMapId)
                .with(user("observer2")))
                .andExpect(status().isOk());

        // When
        MvcResult resultJson = mvc.perform(get("/api/users/observers/" + worldMapId))
                .andExpect(status().isOk())
                .andReturn();

        List<AppUserResponse> appUserResponses = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), AppUserResponse[].class));

        // Then
        assertEquals(2, appUserResponses.size());
        assertTrue(appUserResponses.contains(observer1Response.withObservedWorldMapIds(List.of(worldMapId))));
        assertTrue(appUserResponses.contains(observer2Response.withObservedWorldMapIds(List.of(worldMapId))));
    }

    @Test
    @WithMockUser(username = "username")
    void getAllObserverOfWorldMapById_whenNoObservers_thenReturnEmptyList() throws Exception {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appUserRegister)))
                .andExpect(status().isCreated())
                .andReturn();

        WorldMapDto worldMapDto = new WorldMapDto("WorldMapName", "WorldMapUrl", 1024, 768);
        MvcResult worldMapResponseJson = mvc.perform(post("/api/worldmaps")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(worldMapDto)))
                .andExpect(status().isCreated())
                .andReturn();

        String worldMapId = objectMapper.readValue(worldMapResponseJson.getResponse().getContentAsString(), WorldMap.class).id();

        // When
        MvcResult resultJson = mvc.perform(get("/api/users/observers/" + worldMapId))
                .andExpect(status().isOk())
                .andReturn();

        List<AppUserResponse> appUserResponses = List.of(objectMapper.readValue(resultJson.getResponse().getContentAsString(), AppUserResponse[].class));

        // Then
        assertTrue(appUserResponses.isEmpty());
    }

    // @PostMapping("/register")
    @Test
    void createAppUser_whenValidInput_thenCreateAndReturnAppUser() throws Exception  {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);

        // When
        MvcResult resultJson = mvc.perform(post("/api/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(appUserRegisterJson))
                .andExpect(status().isCreated())
                .andReturn();

        AppUserResponse appUserResponse = objectMapper.readValue(resultJson.getResponse().getContentAsString(), AppUserResponse.class);

        //Then
        assertEquals(appUserRegister.username(), appUserResponse.username());
        assertEquals(AppUserRole.USER, appUserResponse.role());
        assertNotNull(appUserResponse.id());
        assertTrue(appUserResponse.myWorldMapIds().isEmpty());
        assertTrue(appUserResponse.observedWorldMapIds().isEmpty());
    }

    // @PutMapping
    @Test
    @WithMockUser(username = "username")
    void updateAppUser_whenSuchAppUser_thenUpdate() throws Exception  {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);
        MvcResult json = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(appUserRegisterJson))
                .andExpect(status().isCreated())
                .andReturn();

        String appUserId = objectMapper.readValue(json.getResponse().getContentAsString(), AppUserResponse.class).id();

        AppUserUpdateObject appUserUpdateObject = new AppUserUpdateObject(appUserId, AppUserRole.ADMIN, List.of("1"), List.of("2"));
        String newAppUserResponseJson = objectMapper.writeValueAsString(appUserUpdateObject);

        // When
        MvcResult resultJson = mvc.perform(put("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(newAppUserResponseJson))
                .andExpect(status().isOk())
                .andReturn();

        AppUserResponse updatedAppUserResponse = objectMapper.readValue(resultJson.getResponse().getContentAsString(), AppUserResponse.class);

        // Then
        assertEquals(appUserId, updatedAppUserResponse.id());
        assertEquals(AppUserRole.ADMIN, updatedAppUserResponse.role());
        assertEquals("username", updatedAppUserResponse.username());
        assertEquals(List.of("1"), updatedAppUserResponse.myWorldMapIds());
        assertEquals(List.of("2"), updatedAppUserResponse.observedWorldMapIds());
    }

    @Test
    @WithMockUser
    void updateAppUser_whenNoSuchAppUser_thenThrowNoSuchAppUserException() throws Exception  {
        // Given
        AppUserResponse updateAppUser = new AppUserResponse("1", AppUserRole.ADMIN, "new username", List.of("1"), List.of("2"));
        String updateAppUserJson = objectMapper.writeValueAsString(updateAppUser);

        // When
        MvcResult resultJson = mvc.perform(put("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateAppUserJson))
                .andExpect(status().isNotFound())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("User with username user not found.", result.errorMsg());
    }

    @Test
    @WithMockUser
    void updateAppUser_whenPathAndBodyIdMissMatch_thenThrowBadRequest() throws Exception  {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("user", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);
        MvcResult json = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(appUserRegisterJson))
                .andExpect(status().isCreated())
                .andReturn();

        String appUserId = objectMapper.readValue(json.getResponse().getContentAsString(), AppUserResponse.class).id();

        AppUserUpdateObject appUserUpdateObject = new AppUserUpdateObject("2", AppUserRole.ADMIN, List.of("1"), List.of("2"));
        String updateAppUserJson = objectMapper.writeValueAsString(appUserUpdateObject);

        // When
        MvcResult resultJson = mvc.perform(put("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateAppUserJson))
                .andExpect(status().isBadRequest())
                .andReturn();

        ErrorMessage result = objectMapper.readValue(resultJson.getResponse().getContentAsString(), ErrorMessage.class);

        // Then
        assertEquals("User with id " + appUserId + " can't update user with id 2.", result.errorMsg());
    }

    // @PutMapping("/add-my-world-map")
    @Test
    @WithMockUser
    void addMyWorldMapAppUser() throws Exception  {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("user", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);
        MvcResult json = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(appUserRegisterJson))
                .andExpect(status().isCreated())
                .andReturn();

        String appUserId = objectMapper.readValue(json.getResponse().getContentAsString(), AppUserResponse.class).id();
        String worldMapId = "1";

        // When
        MvcResult resultJson = mvc.perform(put("/api/users/add-my-world-map")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(worldMapId))
                .andExpect(status().isOk())
                .andReturn();

        AppUserResponse updatedAppUserResponse = objectMapper.readValue(resultJson.getResponse().getContentAsString(), AppUserResponse.class);

        // Then
        assertEquals(appUserId, updatedAppUserResponse.id());
        assertEquals(AppUserRole.USER, updatedAppUserResponse.role());
        assertEquals("user", updatedAppUserResponse.username());
        assertEquals(List.of(worldMapId), updatedAppUserResponse.myWorldMapIds());
        assertTrue(updatedAppUserResponse.observedWorldMapIds().isEmpty());
    }

    // @PutMapping("/add-observed")
    @Test
    @WithMockUser
    void addObservedWorldMapAppUser() throws Exception  {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("user", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);
        MvcResult json = mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(appUserRegisterJson))
                .andExpect(status().isCreated())
                .andReturn();

        String appUserId = objectMapper.readValue(json.getResponse().getContentAsString(), AppUserResponse.class).id();
        String worldMapId = "1";

        // When
        MvcResult resultJson = mvc.perform(put("/api/users/add-observed")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(worldMapId))
                .andExpect(status().isOk())
                .andReturn();

        AppUserResponse updatedAppUserResponse = objectMapper.readValue(resultJson.getResponse().getContentAsString(), AppUserResponse.class);

        // Then
        assertEquals(appUserId, updatedAppUserResponse.id());
        assertEquals(AppUserRole.USER, updatedAppUserResponse.role());
        assertEquals("user", updatedAppUserResponse.username());
        assertTrue(updatedAppUserResponse.myWorldMapIds().isEmpty());
        assertEquals(List.of(worldMapId), updatedAppUserResponse.observedWorldMapIds());
    }

    // @PutMapping("/remove-observed")
    @Test
    @WithMockUser(username = "username")
    void removeObservedWorldMapAppUser() throws Exception  {
        // Given
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");
        String appUserRegisterJson = objectMapper.writeValueAsString(appUserRegister);
        mvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(appUserRegisterJson))
                .andExpect(status().isCreated())
                .andReturn();

        String worldMapId = "1";

        mvc.perform(put("/api/users/add-observed")
                .contentType(MediaType.APPLICATION_JSON)
                .content(worldMapId))
                .andExpect(status().isOk());

        // When
        RemoveObservedRequest removeObservedRequest = new RemoveObservedRequest("username", worldMapId);
        MvcResult resultJson = mvc.perform(put("/api/users/remove-observed")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(removeObservedRequest)))
                .andExpect(status().isOk())
                .andReturn();

        AppUserResponse updatedAppUserResponse = objectMapper.readValue(resultJson.getResponse().getContentAsString(), AppUserResponse.class);

        // Then
        assertEquals(AppUserRole.USER, updatedAppUserResponse.role());
        assertEquals("username", updatedAppUserResponse.username());
        assertTrue(updatedAppUserResponse.myWorldMapIds().isEmpty());
        assertTrue(updatedAppUserResponse.observedWorldMapIds().isEmpty());
    }
}
