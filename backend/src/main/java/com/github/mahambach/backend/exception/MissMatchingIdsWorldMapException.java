package com.github.mahambach.backend.exception;

import lombok.Getter;

@Getter
public class MissMatchingIdsWorldMapException extends RuntimeException {
    public final String pathId;

    public final String bodyId;

    public MissMatchingIdsWorldMapException(String pathId, String bodyId) {
        super("");
        this.pathId = pathId;
        this.bodyId = bodyId;
    }
}
