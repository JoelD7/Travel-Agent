package com.tripper.Tripper.exceptions;

public class HotelReservationNotFoundException extends RuntimeException {

    public HotelReservationNotFoundException(Long id) {
        super("The hotel reservation with id " + id + " does not exists.");
    }
}
