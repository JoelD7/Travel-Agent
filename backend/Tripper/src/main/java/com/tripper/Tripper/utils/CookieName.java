package com.tripper.Tripper.utils;

public enum CookieName {
    REMEMBER_ME("remember_me"),
    PERSON_UUID("personUuid"),
    ID_PERSON("idPerson");

    private final String displayName;

    private CookieName(String displayName) {
        this.displayName = displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }

}
