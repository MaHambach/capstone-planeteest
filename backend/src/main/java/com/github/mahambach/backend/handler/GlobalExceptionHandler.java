package com.github.mahambach.backend.handler;

import com.github.mahambach.backend.exception.*;
import com.github.mahambach.backend.model.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // No Such Element Exceptions
    @ExceptionHandler(NoSuchAppUserException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNoSuchAppUserException(NoSuchAppUserException exception) {
        return new ErrorMessage(
                "User with username " + exception.getMessage() + " not found.",
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(NoSuchArticleException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNoSuchArticleException(NoSuchArticleException exception) {
        return handleNoSuchObjectException("Article", exception.getMessage());
    }

    @ExceptionHandler(NoSuchMapMarkerException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNoSuchMapMarkerException(NoSuchMapMarkerException exception) {
        return handleNoSuchObjectException("Map marker", exception.getMessage());
    }

    @ExceptionHandler(NoSuchMapMarkerTypeException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNoSuchMapMarkerTypeException(NoSuchMapMarkerTypeException exception) {
        return handleNoSuchObjectException("Map marker type", exception.getMessage());
    }

    @ExceptionHandler(NoSuchWorldMapException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNoSuchWorldMapException(NoSuchWorldMapException exception) {
        return handleNoSuchObjectException("World map", exception.getMessage());
    }

    private ErrorMessage handleNoSuchObjectException(String className, String objectId) {
        return new ErrorMessage(
                className + " with id " + objectId + " not found.",
                LocalDateTime.now()
        );
    }

    // Miss Matching Element Exceptions
    @ExceptionHandler(MissMatchingIdsAppUserException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleMissMatchingIdsAppUserException(MissMatchingIdsAppUserException exception) {
        return new ErrorMessage(
                "User with id " + exception.userId + " can't update user with id " + exception.updateId + ".",
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(MissMatchingIdsArticleException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleMissMatchingIdsArticleException(MissMatchingIdsArticleException exception) {
        return handleMissMatchingIdsException("Article", exception.getPathId(), exception.getBodyId());
    }

    @ExceptionHandler(MissMatchingIdsMapMarkerException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleMissMatchingIdsMapMarkerException(MissMatchingIdsMapMarkerException exception) {
        return handleMissMatchingIdsException("Map marker", exception.getPathId(), exception.getBodyId());
    }

    @ExceptionHandler(MissMatchingIdsMapMarkerTypeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleMissMatchingIdsMapMarkerTypeException(MissMatchingIdsMapMarkerTypeException exception) {
        return handleMissMatchingIdsException("Map marker type", exception.getPathId(), exception.getBodyId());
    }

    @ExceptionHandler(MissMatchingIdsWorldMapException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleMissMatchingIdsWorldMapException(MissMatchingIdsWorldMapException exception) {
        return handleMissMatchingIdsException("World map", exception.getPathId(), exception.getBodyId());
    }

    private ErrorMessage handleMissMatchingIdsException(String className, String pathId, String bodyId) {
        return new ErrorMessage(
                className + " with id " + pathId + " in path and " + bodyId + " in body do not match.",
                LocalDateTime.now()
        );
    }

    // Special Exceptions
    @ExceptionHandler(NonOwnerTriesToDeleteWorldMapException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorMessage handleNonOwnerTriesToDeleteWorldMapException(NonOwnerTriesToDeleteWorldMapException exception) {
        return new ErrorMessage(
                "User with id " + exception.userId + " is not the owner of the world map with id " + exception.worldMapId + ".",
                LocalDateTime.now()
        );
    }
}
