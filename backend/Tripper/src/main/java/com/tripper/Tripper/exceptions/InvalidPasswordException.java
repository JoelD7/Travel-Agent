package com.tripper.Tripper.exceptions;

public class InvalidPasswordException extends RuntimeException {

    public InvalidPasswordException(String personUuid) {
        super(String.format("Entered password for user '%s' is invalid.", personUuid));
    }

}
