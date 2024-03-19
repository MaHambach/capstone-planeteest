package com.github.mahambach.backend.exception;

import lombok.Getter;

@Getter
public class MissMatchingIdsArticleException extends RuntimeException {
    public final String pathId;

    public final String bodyId;

    public MissMatchingIdsArticleException(String pathId, String bodyId) {
        super("");
        this.pathId = pathId;
        this.bodyId = bodyId;
    }
}
