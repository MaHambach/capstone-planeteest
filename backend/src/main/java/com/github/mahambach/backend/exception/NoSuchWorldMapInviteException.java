package com.github.mahambach.backend.exception;

import java.util.NoSuchElementException;

public class NoSuchWorldMapInviteException extends NoSuchElementException {
    public NoSuchWorldMapInviteException(String worldMapInvite) {
        super(worldMapInvite);
    }
}
