package com.tripper.Tripper.services;

import com.tripper.Tripper.data.PersonRepository;
import com.tripper.Tripper.exceptions.InvalidPasswordException;
import com.tripper.Tripper.exceptions.PersonNotFoundException;
import com.tripper.Tripper.models.Person;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepo;
    private final PasswordEncoder encoder;

    public PersonServiceImpl(PersonRepository personRepo, PasswordEncoder encoder) {
        this.personRepo = personRepo;
        this.encoder = encoder;
    }

    @Override
    public Person getPerson(String uuid) {
        Person person = personRepo.findByUuid(uuid)
                .orElseThrow(() -> new PersonNotFoundException(uuid));

        return new Person()
                .setUuidFluently(uuid)
                .setFirstNameFluently(person.getFirstName())
                .setLastNameFluently(person.getLastName())
                .setEmailFluently(person.getEmail())
                .setProfilePictFluently(person.getProfilePic())
                .setTripstFluently(person.getTrips())
                .setCarRentalsFluently(person.getCarRentals())
                .setFlightsFluently(person.getFlights())
                .setHotelReservationsFluently(person.getHotelReservations())
                .setFavoritesFluently(person.getFavoritePlaces());
    }

    @Override
    public Person editUserProfile(String uuid, Person dto) throws InvalidPasswordException {
        Person curPerson = personRepo.findByUuid(uuid)
                .orElseThrow(() -> new PersonNotFoundException(uuid));

        Person modPerson = dto;
        modPerson.setIdPerson(curPerson.getIdPerson());

        if (isPasswordModRequested(dto)) {
            if (isRequestPasswordValid(curPerson, dto)) {
                String newPassword = encoder.encode(dto.getPassword());
                modPerson.setPassword(newPassword);
            } else {
                throw new InvalidPasswordException(uuid);
            }
        } else {
            modPerson.setPassword(curPerson.getPassword());
        }

        return personRepo.save(modPerson);
    }

    private boolean isRequestPasswordValid(Person profileToChange, Person dto) {
        return encoder.encode(profileToChange.getPassword())
                .equals(encoder.encode(dto.getPassword()));
    }

    private boolean isPasswordModRequested(Person dto) {
        return dto.getPassword() != null;
    }

}
