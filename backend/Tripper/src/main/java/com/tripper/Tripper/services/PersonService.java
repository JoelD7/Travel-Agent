package com.tripper.Tripper.services;

import com.tripper.Tripper.dtos.ProfileDTO;
import com.tripper.Tripper.models.Person;

public interface PersonService {

    public abstract Person editUserProfile(String uuid, ProfileDTO dto);

    public abstract Person getPerson(String uuid);
}
