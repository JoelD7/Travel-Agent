package com.tripper.Tripper.exceptions;

public class BadCrendetialsException extends RuntimeException {

    public BadCrendetialsException() {
        super("The email or password are incorrect");
    }
}
