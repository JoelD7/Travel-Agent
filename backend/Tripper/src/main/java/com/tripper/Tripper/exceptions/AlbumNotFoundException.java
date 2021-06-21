package com.tripper.Tripper.exceptions;

public class AlbumNotFoundException extends RuntimeException {

    public AlbumNotFoundException(String albumUuid) {
        super("Album with uuid " + albumUuid + " does not exists.");
    }

}
