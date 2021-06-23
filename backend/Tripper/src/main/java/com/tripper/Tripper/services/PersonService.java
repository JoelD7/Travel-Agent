package com.tripper.Tripper.services;

import com.tripper.Tripper.models.Person;

public interface PersonService {

    public abstract Person editUserProfile(String uuid, Person dto);

    public abstract Person getPerson(String uuid);
}
