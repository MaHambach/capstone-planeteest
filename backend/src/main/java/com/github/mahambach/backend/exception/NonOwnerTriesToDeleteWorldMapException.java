package com.github.mahambach.backend.exception;

import lombok.Getter;

@Getter
public class NonOwnerTriesToDeleteWorldMapException extends RuntimeException {
    public final String userId;
    public final String worldMapId;


    public NonOwnerTriesToDeleteWorldMapException(String userId, String worldMapId) {
        super("");
        this.userId = userId;
        this.worldMapId = worldMapId;
    }
}
