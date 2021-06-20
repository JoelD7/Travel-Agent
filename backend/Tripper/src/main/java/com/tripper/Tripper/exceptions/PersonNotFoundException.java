package com.tripper.Tripper.exceptions;

public class PersonNotFoundException extends RuntimeException {

    public PersonNotFoundException(Long id) {
        super("The user with id " + id + " does not exists.");
    }

    public PersonNotFoundException(String email) {
        super("The user with email " + email + " does not exists.");
    }

}
