package com.tripper.Tripper.utils;

public enum AuthStatus {
    AUTHENTICATED("Authenticated"),
    NOT_AUTHENTICATED("Not authenticated"),
    NOT_REGISTERED("Not registered");

    private final String displayName;

    private AuthStatus(String displayName) {
        this.displayName = displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }

}
