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
    public Person getPerson(Long idPerson) {
        Person person = personRepo.findById(idPerson)
                .orElseThrow(() -> new PersonNotFoundException(idPerson));

        return new Person()
                .setIdPersonFluently(idPerson)
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
    public Person editUserProfile(Long idPerson, Person dto) throws InvalidPasswordException {
        Person curPerson = personRepo.findById(idPerson)
                .orElseThrow(() -> new PersonNotFoundException(idPerson));

        Person modPerson = dto;

        if (isPasswordModRequested(dto)) {
            if (isRequestPasswordValid(curPerson, dto)) {
                String newPassword = encoder.encode(dto.getPassword());
                modPerson.setPassword(newPassword);
            } else {
                throw new InvalidPasswordException(idPerson);
            }
        }

        return modPerson;
    }

    private boolean isRequestPasswordValid(Person profileToChange, Person dto) {
        return encoder.encode(profileToChange.getPassword())
                .equals(encoder.encode(dto.getPassword()));
    }

    private boolean isPasswordModRequested(Person dto) {
        return dto.getPassword() != null;
    }

}
