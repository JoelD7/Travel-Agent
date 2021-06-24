package com.tripper.Tripper.exceptions;

public class EmailTakenException extends RuntimeException {

    public EmailTakenException() {
        super("This email is already taken. Try another one");
    }
}
