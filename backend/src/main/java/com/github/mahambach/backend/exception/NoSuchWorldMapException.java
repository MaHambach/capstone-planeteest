package com.github.mahambach.backend.exception;

import java.util.NoSuchElementException;

public class NoSuchWorldMapException extends NoSuchElementException {
    public NoSuchWorldMapException(String worldMapId) {
        super(worldMapId);
    }
}
