package com.github.mahambach.backend.exception;

import java.util.NoSuchElementException;

public class NoSuchMapMarkerException extends NoSuchElementException {
    public NoSuchMapMarkerException(String markerId) {
        super(markerId);
    }
}
