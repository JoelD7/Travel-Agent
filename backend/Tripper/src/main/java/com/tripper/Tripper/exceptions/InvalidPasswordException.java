package com.tripper.Tripper.exceptions;

public class InvalidPasswordException extends RuntimeException {

    public InvalidPasswordException() {
        super("The submitted password is incorrect");
    }

}
