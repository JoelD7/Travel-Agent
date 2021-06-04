package com.tripper.Tripper.exceptions;

public class AlbumNotFoundException extends RuntimeException {

    public AlbumNotFoundException(Long id) {
        super("Album with id " + id + " does not exists.");
    }

}
