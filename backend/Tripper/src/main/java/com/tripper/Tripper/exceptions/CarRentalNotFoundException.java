package com.tripper.Tripper.exceptions;

public class CarRentalNotFoundException extends RuntimeException {

    public CarRentalNotFoundException(Long id) {
        super("Car rental with id " + id + " does not exists.");
    }

}
