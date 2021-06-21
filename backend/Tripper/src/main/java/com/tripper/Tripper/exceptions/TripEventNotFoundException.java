package com.tripper.Tripper.exceptions;

public class TripEventNotFoundException extends RuntimeException {

    public TripEventNotFoundException(String uuid) {
        super("The event with uuid " + uuid + " does not exists.");
    }

}
