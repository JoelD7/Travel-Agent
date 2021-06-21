package com.tripper.Tripper.services;

import com.tripper.Tripper.models.Person;

public interface PersonService {

    public abstract Person editUserProfile(Long idPerson, Person dto);

    public abstract Person getPerson(Long idPerson);
}
