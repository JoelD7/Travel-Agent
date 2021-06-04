package com.tripper.Tripper.exceptions;

public class FavoriteNotFoundException extends RuntimeException {

    public FavoriteNotFoundException() {
        super("The requested favorite place does not exists.");
    }

}
