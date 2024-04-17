package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.NoSuchWorldMapInviteException;
import com.github.mahambach.backend.model.*;
import com.github.mahambach.backend.model.enums.AppUserRole;
import com.github.mahambach.backend.repository.WorldMapInviteRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class WorldMapInviteServiceTest {
    private final WorldMapInviteRepo worldMapInviteRepo = mock(WorldMapInviteRepo.class);
    private final AppUserService appUserService = mock(AppUserService.class);
    private final WorldMapService worldMapService = mock(WorldMapService.class);

    private final WorldMapInviteService worldMapInviteService = new WorldMapInviteService(worldMapInviteRepo, appUserService, worldMapService);

    // getAllWorldMapInvites()
    @Test
    void getAllWorldMapInvites_whenOneWorldMapInvite_thenReturnListOfWorldMapInvite() {
        // Given
        WorldMapInvite worldMapInvite = new WorldMapInvite("1", "1", "2", "3");
        List<WorldMapInvite> expected = List.of(worldMapInvite);

        // When
        when(worldMapInviteRepo.findAll()).thenReturn(expected);
        List<WorldMapInvite> actual = worldMapInviteService.getAllWorldMapInvites();

        // Then
        assertEquals(expected, actual);
        verify(worldMapInviteRepo).findAll();
        verifyNoMoreInteractions(worldMapInviteRepo);
        verifyNoInteractions(appUserService, worldMapService);
    }

    @Test
    void getAllWorldMapInvites_whenNoWorldMapInvites_thenReturnEmpty() {
        // Given
        List<WorldMapInvite> expected = List.of();

        // When
        when(worldMapInviteRepo.findAll()).thenReturn(expected);
        List<WorldMapInvite> actual = worldMapInviteService.getAllWorldMapInvites();

        // Then
        assertEquals(expected, actual);
        verify(worldMapInviteRepo).findAll();
        verifyNoMoreInteractions(worldMapInviteRepo);
        verifyNoInteractions(appUserService, worldMapService);
    }

    // getWorldMapInviteById(String worldMapInviteId)
    @Test
    void getWorldMapInviteById_whenNoSuchWorldMapInvite_thenThrow() {
        // Given
        String worldMapInviteId = "1";

        // When
        when(worldMapInviteRepo.findById(worldMapInviteId)).thenReturn(Optional.empty());

        // Then
        assertThrows(NoSuchWorldMapInviteException.class, () -> worldMapInviteService.getWorldMapInviteById(worldMapInviteId));
        verify(worldMapInviteRepo).findById(worldMapInviteId);
        verifyNoMoreInteractions(worldMapInviteRepo);
        verifyNoInteractions(appUserService, worldMapService);
    }

    @Test
    void getWorldMapInviteById_whenSuchWorldMapInvite_thenReturnIt() {
        // Given
        String worldMapInviteId = "1";
        WorldMapInvite worldMapInvite = new WorldMapInvite("1", "1", "2", "3");

        // When
        when(worldMapInviteRepo.findById(worldMapInviteId)).thenReturn(Optional.of(worldMapInvite));

        WorldMapInvite actual = worldMapInviteService.getWorldMapInviteById(worldMapInviteId);

        // Then
        assertEquals(worldMapInvite, actual);
        verify(worldMapInviteRepo).findById(worldMapInviteId);
        verifyNoMoreInteractions(worldMapInviteRepo);
        verifyNoInteractions(appUserService, worldMapService);
    }

    // createWorldMapInvite(WorldMapInviteDto worldMapInviteDto, String username)
    @Test
    void createWorldMapInvite_whenUserNotOwner_thenThrowIllegalArgumentException() {
        // Given
        String username = "username";
        AppUserResponse appUserResponse = new AppUserResponse("3", AppUserRole.USER, username, new ArrayList<>(), new ArrayList<>());
        WorldMap worldMap = new WorldMap("1", "WorldMap", "url", 10, 10);
        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto("1", "2", "1");

        // When
        when(appUserService.findAppUserByUsername(username)).thenReturn(appUserResponse);
        when(worldMapService.getWorldMapById(worldMap.id())).thenReturn(worldMap);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> worldMapInviteService.createWorldMapInvite(worldMapInviteDto, username));

        // Then
        assertEquals("Owner id must be the same as the id of the user creating the invite.", exception.getMessage());
        verify(appUserService).findAppUserByUsername(username);
        verify(worldMapService).getWorldMapById(worldMap.id());
        verifyNoMoreInteractions(appUserService, worldMapService);
        verifyNoInteractions(worldMapInviteRepo);
    }

    @Test
    void createWorldMapInvite_whenOwnerIdEqualsInviteeId_thenThrowIllegalArgumentException() {
        // Given
        String username = "username";
        AppUserResponse appUserResponse = new AppUserResponse("1", AppUserRole.USER, username, new ArrayList<>(), new ArrayList<>());
        WorldMap worldMap = new WorldMap("1", "WorldMap", "url", 10, 10);
        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto("1", "1", "1");

        // When
        when(appUserService.findAppUserByUsername(username)).thenReturn(appUserResponse);
        when(worldMapService.getWorldMapById(worldMap.id())).thenReturn(worldMap);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> worldMapInviteService.createWorldMapInvite(worldMapInviteDto, username));

        // Then
        assertEquals("Owner and invitee must be different users.", exception.getMessage());
        verify(appUserService).findAppUserByUsername(username);
        verify(worldMapService).getWorldMapById(worldMap.id());
        verifyNoMoreInteractions(appUserService, worldMapService);
        verifyNoInteractions(worldMapInviteRepo);
    }

    @Test
    void createWorldMapInvite_whenInviteAlreadyExists_thenThrowIllegalArgumentException() {
        // Given
        String username = "username";
        AppUserResponse appUserResponse = new AppUserResponse("1", AppUserRole.USER, username, new ArrayList<>(), new ArrayList<>());
        WorldMap worldMap = new WorldMap("1", "WorldMap", "url", 10, 10);
        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto("1", "2", "1");
        WorldMapInvite worldMapInvite1 = new WorldMapInvite("1", "1", "2", "1");
        WorldMapInvite worldMapInvite2 = new WorldMapInvite("2", "2", "1", "2");

        // When
        when(appUserService.findAppUserByUsername(username)).thenReturn(appUserResponse);
        when(worldMapService.getWorldMapById(worldMap.id())).thenReturn(worldMap);
        when(worldMapInviteRepo.findAll()).thenReturn(List.of(worldMapInvite1, worldMapInvite2));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> worldMapInviteService.createWorldMapInvite(worldMapInviteDto, username));

        // Then
        assertEquals("Invitee already has an invite for this world map.", exception.getMessage());
        verify(appUserService).findAppUserByUsername(username);
        verify(worldMapService).getWorldMapById(worldMap.id());
        verify(worldMapInviteRepo).findAll();
        verifyNoMoreInteractions(appUserService, worldMapService, worldMapInviteRepo);
    }

    @Test
    void createWorldMapInvite_whenValidInput_thenReturn() {
        // Given
        String username = "username";
        AppUserResponse appUserResponse = new AppUserResponse("1", AppUserRole.USER, username, new ArrayList<>(), new ArrayList<>());
        WorldMap worldMap = new WorldMap("1", "WorldMap", "url", 10, 10);
        WorldMapInviteDto worldMapInviteDto = new WorldMapInviteDto("1", "2", "1");
        WorldMapInvite worldMapInvite2 = new WorldMapInvite("2", "2", "1", "2");
        WorldMapInvite expected = new WorldMapInvite("3", "1", "2", "1");

        // When
        when(appUserService.findAppUserByUsername(username)).thenReturn(appUserResponse);
        when(worldMapService.getWorldMapById(worldMap.id())).thenReturn(worldMap);
        when(worldMapInviteRepo.findAll()).thenReturn(List.of(worldMapInvite2));
        when(worldMapInviteRepo.save(new WorldMapInvite(worldMapInviteDto))).thenReturn(expected);

        WorldMapInvite actual = worldMapInviteService.createWorldMapInvite(worldMapInviteDto, username);

        // Then
        assertEquals(expected, actual);
        verify(appUserService).findAppUserByUsername(username);
        verify(worldMapService).getWorldMapById(worldMap.id());
        verify(worldMapInviteRepo).findAll();
        verify(worldMapInviteRepo).save(new WorldMapInvite(worldMapInviteDto));
        verifyNoMoreInteractions(appUserService, worldMapService, worldMapInviteRepo);
    }

    // deleteWorldMapInviteById(String worldMapInviteId, String username)
    @Test
    void deleteWorldMapInviteById_whenUserNotOwnerOrInvitee_thenThrowIllegalArgumentException() {
        // Given
        String username = "username";
        AppUserResponse appUserResponse = new AppUserResponse("3", AppUserRole.USER, username, new ArrayList<>(), new ArrayList<>());
        String worldMapInviteId = "1";
        WorldMapInvite worldMapInvite = new WorldMapInvite(worldMapInviteId, "1", "2", "1");

        // When
        when(appUserService.findAppUserByUsername(username)).thenReturn(appUserResponse);
        when(worldMapInviteRepo.findById(worldMapInviteId)).thenReturn(Optional.of(worldMapInvite));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> worldMapInviteService.deleteWorldMapInviteById(worldMapInviteId, username));

        // Then
        assertEquals("Only the owner or invitee of the invite can delete a world map invite.", exception.getMessage());
        verify(appUserService).findAppUserByUsername(username);
        verify(worldMapInviteRepo).findById(worldMapInviteId);
        verifyNoMoreInteractions(appUserService, worldMapInviteRepo);
        verifyNoInteractions(worldMapService);
    }

    @Test
    void deleteWorldMapInviteById_whenInputIsValidAndUserIsOwner_thenDeleteAndReturn() {
        // Given
        String username = "username";
        AppUserResponse appUserResponse = new AppUserResponse("1", AppUserRole.USER, username, new ArrayList<>(), new ArrayList<>());
        String worldMapInviteId = "1";
        WorldMapInvite expected = new WorldMapInvite(worldMapInviteId, "1", "2", "1");

        // When
        when(appUserService.findAppUserByUsername(username)).thenReturn(appUserResponse);
        when(worldMapInviteRepo.findById(worldMapInviteId)).thenReturn(Optional.of(expected));

        WorldMapInvite actual = worldMapInviteService.deleteWorldMapInviteById(worldMapInviteId, username);

        // Then
        assertEquals(expected, actual);
        verify(appUserService).findAppUserByUsername(username);
        verify(worldMapInviteRepo).findById(worldMapInviteId);
        verify(worldMapInviteRepo).deleteById(worldMapInviteId);
        verifyNoMoreInteractions(appUserService, worldMapInviteRepo);
        verifyNoInteractions(worldMapService);
    }

    @Test
    void deleteWorldMapInviteById_whenInputIsValidAndUserIsInvitee_thenDeleteAndReturn() {
        // Given
        String username = "username";
        AppUserResponse appUserResponse = new AppUserResponse("2", AppUserRole.USER, username, new ArrayList<>(), new ArrayList<>());
        String worldMapInviteId = "1";
        WorldMapInvite expected = new WorldMapInvite(worldMapInviteId, "1", "2", "1");

        // When
        when(appUserService.findAppUserByUsername(username)).thenReturn(appUserResponse);
        when(worldMapInviteRepo.findById(worldMapInviteId)).thenReturn(Optional.of(expected));

        WorldMapInvite actual = worldMapInviteService.deleteWorldMapInviteById(worldMapInviteId, username);

        // Then
        assertEquals(expected, actual);
        verify(appUserService).findAppUserByUsername(username);
        verify(worldMapInviteRepo).findById(worldMapInviteId);
        verify(worldMapInviteRepo).deleteById(worldMapInviteId);
        verifyNoMoreInteractions(appUserService, worldMapInviteRepo);
        verifyNoInteractions(worldMapService);
    }

    // acceptWorldMapInvite(String worldMapInviteId, String username)
    @Test
    void acceptWorldMapInvite_whenUserNotInvitee_thenThrowIllegalArgumentException() {
        // Given
        String username = "username";
        AppUserResponse appUserResponse = new AppUserResponse("3", AppUserRole.USER, username, new ArrayList<>(), new ArrayList<>());
        String worldMapInviteId = "1";
        WorldMapInvite worldMapInvite = new WorldMapInvite(worldMapInviteId, "1", "2", "1");

        // When
        when(appUserService.findAppUserByUsername(username)).thenReturn(appUserResponse);
        when(worldMapInviteRepo.findById(worldMapInviteId)).thenReturn(Optional.of(worldMapInvite));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> worldMapInviteService.acceptWorldMapInvite(worldMapInviteId, username));

        // Then
        assertEquals("Only the invitee of the invite can accept a world map invite.", exception.getMessage());
        verify(appUserService).findAppUserByUsername(username);
        verify(worldMapInviteRepo).findById(worldMapInviteId);
        verifyNoMoreInteractions(appUserService, worldMapInviteRepo);
        verifyNoInteractions(worldMapService);
    }

    @Test
    void acceptWorldMapInvite_whenUserIsInvitee_thenAcceptInvite() {
        // Given
        String username = "username";
        AppUserResponse appUserResponse = new AppUserResponse("2", AppUserRole.USER, username, new ArrayList<>(), new ArrayList<>());
        String worldMapInviteId = "1";
        String worldMapId = "1";
        WorldMapInvite expected = new WorldMapInvite(worldMapInviteId, "1", "2", worldMapId);

        // When
        when(appUserService.findAppUserByUsername(username)).thenReturn(appUserResponse);
        when(worldMapInviteRepo.findById(worldMapInviteId)).thenReturn(Optional.of(expected));

        WorldMapInvite actual = worldMapInviteService.acceptWorldMapInvite(worldMapInviteId, username);

        // Then
        assertEquals(expected, actual);
        verify(appUserService).findAppUserByUsername(username);
        verify(worldMapInviteRepo).findById(worldMapInviteId);
        verify(appUserService).addObservedWorldMapAppUser(username, worldMapId);
        verify(worldMapInviteRepo).deleteById(worldMapInviteId);
        verifyNoMoreInteractions(appUserService, worldMapInviteRepo);
        verifyNoInteractions(worldMapService);
    }

    // getAllPossibleInviteesToWorldMap(String username, String worldMapId)
    @Test
    void getAllPossibleInviteesToWorldMap_whenUser1IsAlreadyInvited_thenReturnUser2() {
        // Given
        String worldMapId = "1";
        String username = "owner";
        AppUserResponse appUserResponse1 = new AppUserResponse("1", AppUserRole.USER, username, new ArrayList<>(List.of(worldMapId)), new ArrayList<>());
        AppUserResponse appUserResponse2 = new AppUserResponse("2", AppUserRole.USER, "invitee", new ArrayList<>(), new ArrayList<>());
        AppUserResponse appUserResponse3 = new AppUserResponse("3", AppUserRole.USER, "already observing", new ArrayList<>(), new ArrayList<>(List.of(worldMapId)));
        AppUserResponse appUserResponse4 = new AppUserResponse("3", AppUserRole.USER, "already invited", new ArrayList<>(), new ArrayList<>(List.of(worldMapId)));

        WorldMapInvite worldMapInvite1 = new WorldMapInvite("1", "3", "2", "2");
        WorldMapInvite worldMapInvite2 = new WorldMapInvite("2", "1", "4", "1");


        // When
        when(appUserService.findAppUserByUsername(username)).thenReturn(appUserResponse1);
        when(appUserService.getAllAppUsers()).thenReturn(List.of(appUserResponse1, appUserResponse2, appUserResponse3, appUserResponse4));
        when(worldMapService.getWorldMapById(worldMapId)).thenReturn(new WorldMap(worldMapId, "WorldMap", "url", 10, 10));
        when(worldMapInviteRepo.findAll()).thenReturn(List.of(worldMapInvite1, worldMapInvite2));

        List<AppUserResponse> actual = worldMapInviteService.getAllPossibleInviteesToWorldMap(username, worldMapId);

        // Then
        assertEquals(List.of(appUserResponse2), actual);
        verify(appUserService).findAppUserByUsername(username);
        verify(appUserService).getAllAppUsers();
        verify(worldMapService).getWorldMapById(worldMapId);
        verify(worldMapInviteRepo).findAll();
        verifyNoMoreInteractions(appUserService, worldMapInviteRepo, worldMapService);
    }

    @Test
    void getAllPossibleInviteesToWorldMap_whenUserNotOwner_thenThrowIllegalArgumentException() {
        // Given
        String worldMapId = "1";
        String username = "username";
        AppUserResponse appUserResponse = new AppUserResponse("1", AppUserRole.USER, username, new ArrayList<>(), new ArrayList<>());

        // When
        when(appUserService.findAppUserByUsername(username)).thenReturn(appUserResponse);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> worldMapInviteService.getAllPossibleInviteesToWorldMap(username, worldMapId));

        // Then
        assertEquals("You are not allowed to see possible observers for this world map.", exception.getMessage());
        verify(appUserService).findAppUserByUsername(username);
        verify(worldMapService).getWorldMapById(worldMapId);
        verifyNoMoreInteractions(appUserService, worldMapService);
        verifyNoInteractions(worldMapInviteRepo);
    }

}
