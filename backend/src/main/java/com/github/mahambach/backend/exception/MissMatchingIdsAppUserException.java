package com.github.mahambach.backend.exception;

import lombok.Getter;

@Getter
public class MissMatchingIdsAppUserException extends RuntimeException {
    public final String userId;

    public final String updateId;

    public MissMatchingIdsAppUserException(String userId, String updateId) {
        super("");
        this.userId = userId;
        this.updateId = updateId;
    }
}
