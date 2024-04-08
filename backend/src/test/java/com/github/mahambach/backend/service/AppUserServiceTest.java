package com.github.mahambach.backend.service;

import com.github.mahambach.backend.exception.MissMatchingIdsAppUserException;
import com.github.mahambach.backend.exception.NoSuchAppUserException;
import com.github.mahambach.backend.model.*;
import com.github.mahambach.backend.repository.AppUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class AppUserServiceTest {
    private final AppUserRepo appUserRepo = mock(AppUserRepo.class);
    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final AppUserService appUserService = new AppUserService(appUserRepo, passwordEncoder);

    @Test
    void findAppUserByUsername_whenUserExists_thenReturnUser() {
        // Given
        String username = "username";
        AppUser appUser = new AppUser("1", AppUserRole.USER, username, "password", List.of(), List.of());
        AppUserResponse expected = new AppUserResponse(appUser);

        // When
        when(appUserRepo.findAppUserByUsername(username)).thenReturn(Optional.of(appUser));
        AppUserResponse actual = appUserService.findAppUserByUsername(username);

        // Then
        assertEquals(expected, actual);
        verify(appUserRepo).findAppUserByUsername(username);
        verifyNoMoreInteractions(appUserRepo);
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    void findAppUserByUsername_whenUserDoesNotExist_thenThrow() {
        // Given
        String username = "username";

        // When
        when(appUserRepo.findAppUserByUsername(username)).thenReturn(java.util.Optional.empty());

        // Then
        assertThrows(NoSuchAppUserException.class, () -> appUserService.findAppUserByUsername(username));
        verify(appUserRepo).findAppUserByUsername(username);
        verifyNoMoreInteractions(appUserRepo);
    }

    @Test
    void createAppUser_whenValidInput_thenCreateAndReturnResponse() {
        // Given
        AppUser appUser = new AppUser("1", AppUserRole.USER, "username", "password", List.of(), List.of());
        AppUserResponse expected = new AppUserResponse(appUser);
        AppUserRegister appUserRegister = new AppUserRegister("username", "password");

        // When
        when(passwordEncoder.encode(appUserRegister.password())).thenReturn("encoded password");
        when(appUserRepo.save(new AppUser(appUserRegister).withPassword("encoded password"))).thenReturn(appUser);
        AppUserResponse actual = appUserService.createAppUser(appUserRegister);

        // Then
        assertEquals(expected, actual);
        verify(passwordEncoder).encode(appUserRegister.password());
        verify(appUserRepo).save(new AppUser(appUserRegister).withPassword("encoded password"));
        verifyNoMoreInteractions(passwordEncoder, appUserRepo);
    }

    @Test
    void updateAppUser_whenNoSuchUser_thenThrowNoSuchAppUserException() {
        // Given
        String username = "username";
        String appUserId = "1";
        AppUserUpdateObject appUserUpdate = new AppUserUpdateObject(new AppUserResponse("1", AppUserRole.USER, "username", List.of(), List.of()));

        // When
        when(appUserRepo.findAppUserByUsername(username)).thenReturn(java.util.Optional.empty());

        // Then
        assertThrows(NoSuchAppUserException.class, () -> appUserService.updateAppUser(username, appUserUpdate));
        verify(appUserRepo).findAppUserByUsername(username);
        verifyNoMoreInteractions(appUserRepo);
    }

    @Test
    void updateAppUser_whenUserIsNotUpdatedUser_thenThrowMissMatchingIdsAppUserException() {
        // Given
        String username = "username";
        AppUser appUser = new AppUser("1", AppUserRole.USER, "username", "password", List.of(), List.of());
        AppUserUpdateObject appUserUpdate = new AppUserUpdateObject(new AppUserResponse(appUser)).withId("2");

        // When
        when(appUserRepo.findAppUserByUsername(username)).thenReturn(Optional.of(appUser));

        // Then
        assertThrows(MissMatchingIdsAppUserException.class, () -> appUserService.updateAppUser(username, appUserUpdate));
        verify(appUserRepo).findAppUserByUsername(username);
        verifyNoMoreInteractions(appUserRepo);
    }

    @Test
    void updateAppUser_whenValidInput_thenUpdateAndReturnResponse() {
        // Given
        String username = "username";
        String appUserId = "1";
        AppUser appUser = new AppUser(appUserId, AppUserRole.USER, username, "password", List.of(), List.of());
        AppUserUpdateObject appUserUpdateObject = new AppUserUpdateObject(appUserId, AppUserRole.ADMIN, List.of("1"), List.of("1"));
        AppUser updatedAppUser = new AppUser(appUserUpdateObject).withPassword(appUser.password()).withUsername(appUser.username());
        AppUserResponse expected = new AppUserResponse(updatedAppUser);

        // When
        when(appUserRepo.findAppUserByUsername(username)).thenReturn(Optional.of(appUser));
        when(appUserRepo.save(updatedAppUser)).thenReturn(updatedAppUser);

        AppUserResponse actual = appUserService.updateAppUser(username, appUserUpdateObject);

        // Then
        assertEquals(expected, actual);
        verify(appUserRepo).findAppUserByUsername(username);
        verify(appUserRepo).save(updatedAppUser);
        verifyNoMoreInteractions(appUserRepo);
    }

    @Test
    void addMyWorldMapAppUser_whenValidInput_thenUpdateAndReturnResponse() {
        // Given
        String username = "username";
        String appUserId = "1";
        String worldMapId = "1";
        AppUser appUser = new AppUser(
                appUserId,
                AppUserRole.USER,
                username,
                "password",
                new ArrayList<>(),
                new ArrayList<>()
        );
        AppUserResponse appUserResponse = new AppUserResponse(appUser);
        AppUser updatedAppUser = new AppUser(
                appUserId,
                AppUserRole.USER,
                username,
                "password",
                List.of(worldMapId),
                new ArrayList<>()
        );
        AppUserResponse expected = new AppUserResponse(updatedAppUser);

        // When
        when(appUserRepo.findAppUserByUsername(username)).thenReturn(Optional.of(appUser));
        when(appUserRepo.save(any())).thenReturn(updatedAppUser);
        AppUserResponse actual = appUserService.addMyWorldMapAppUser(username, worldMapId);

        // Then
        assertEquals(expected, actual);
        verify(appUserRepo, times(2)).findAppUserByUsername(username);
        verify(appUserRepo).save(updatedAppUser);
        verifyNoMoreInteractions(appUserRepo);
    }

    @Test
    void addObservedWorldMapAppUser_whenValidInput_thenUpdateAndReturnResponse() {
        // Given
        String username = "username";
        String appUserId = "1";
        String worldMapId = "1";
        AppUser appUser = new AppUser("1", AppUserRole.USER, "username", "password", List.of(), List.of());
        AppUserResponse appUserResponse = new AppUserResponse(appUser);
        AppUser updatedAppUser = new AppUser("1", AppUserRole.USER, "username", "password", List.of(), List.of("1"));
        AppUserResponse expected = new AppUserResponse(updatedAppUser);

        // When
        when(appUserRepo.findAppUserByUsername(username)).thenReturn(Optional.of(appUser));
        when(appUserRepo.save(updatedAppUser)).thenReturn(updatedAppUser);
        AppUserResponse actual = appUserService.addObservedWorldMapAppUser(username, worldMapId);

        // Then
        assertEquals(expected, actual);
        verify(appUserRepo, times(2)).findAppUserByUsername(username);
        verify(appUserRepo).save(updatedAppUser);
        verifyNoMoreInteractions(appUserRepo);
    }
}
