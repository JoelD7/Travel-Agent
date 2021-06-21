package com.tripper.Tripper.exceptions;

public class InvalidPasswordException extends RuntimeException {

    public InvalidPasswordException(Long idPerson) {
        super(String.format("Entered password for user with id %d is invalid.", idPerson));
    }

}
