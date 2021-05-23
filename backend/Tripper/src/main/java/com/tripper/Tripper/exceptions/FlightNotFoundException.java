package com.tripper.Tripper.exceptions;

public class FlightNotFoundException extends RuntimeException {

    public FlightNotFoundException(Long id) {
        super("The flight with id " + id + " does not exists. ");
    }

}
