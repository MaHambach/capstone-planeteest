package com.github.mahambach.backend.handler;

import com.github.mahambach.backend.exception.NoSuchArticleException;
import com.github.mahambach.backend.exception.NoSuchMapMarkerException;
import com.github.mahambach.backend.exception.NoSuchWorldMapException;
import com.github.mahambach.backend.model.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NoSuchWorldMapException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleNoSuchWorldMapException(NoSuchWorldMapException exception) {
        return handleNoSuchObjectException("World map", exception.getMessage());
    }

    @ExceptionHandler(NoSuchMapMarkerException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleNoSuchProductException(NoSuchMapMarkerException exception) {
        return handleNoSuchObjectException("Map marker", exception.getMessage());
    }
    @ExceptionHandler(NoSuchArticleException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleNoSuchArticleException(NoSuchArticleException exception) {
        return handleNoSuchObjectException("Article", exception.getMessage());
    }

    public ErrorMessage handleNoSuchObjectException(String objectName, String objectId) {
        return new ErrorMessage(
                objectName + " with id " + objectId + " not found.",
                LocalDateTime.now()
        );
    }
}
