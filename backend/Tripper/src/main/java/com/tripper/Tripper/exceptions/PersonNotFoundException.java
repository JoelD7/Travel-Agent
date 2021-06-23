package com.tripper.Tripper.exceptions;

public class PersonNotFoundException extends RuntimeException {

    public PersonNotFoundException(String uuid) {
        super("The user " + uuid + " does not exists.");
    }

}
