package com.tripper.Tripper.exceptions;

public class TripEventNotFoundException extends RuntimeException {

    public TripEventNotFoundException(Long id) {
        super("The event with id " + id + " does not exists.");
    }

}
