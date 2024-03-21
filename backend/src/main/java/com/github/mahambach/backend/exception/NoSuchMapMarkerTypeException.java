package com.github.mahambach.backend.exception;

import java.util.NoSuchElementException;

public class NoSuchMapMarkerTypeException extends NoSuchElementException {
    public NoSuchMapMarkerTypeException(String markerId) {
        super(markerId);
    }
}
