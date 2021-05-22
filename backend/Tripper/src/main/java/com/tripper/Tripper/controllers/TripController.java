package com.tripper.Tripper.controllers;

import com.tripper.Tripper.assemblers.TripModelAssembler;
import com.tripper.Tripper.data.PersonRepository;
import com.tripper.Tripper.data.TripRepository;
import com.tripper.Tripper.dtos.CoverImageTrip;
import com.tripper.Tripper.dtos.TripDTO;
import com.tripper.Tripper.exceptions.PersonNotFoundException;
import com.tripper.Tripper.exceptions.TripNotFoundException;
import com.tripper.Tripper.models.Person;
import com.tripper.Tripper.models.Trip;
import java.io.IOException;
import java.util.Arrays;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trip")
public class TripController {

    private final TripRepository tripRepo;
    private final TripModelAssembler assembler;
    private final PersonRepository personRepo;

    public TripController(TripRepository tripRepo, TripModelAssembler assembler, PersonRepository personRepo) {
        this.tripRepo = tripRepo;
        this.assembler = assembler;
        this.personRepo = personRepo;
    }

    @GetMapping("/{id}")
    public EntityModel<Trip> getTrip(@PathVariable Long id) {
        Trip trip = tripRepo.findById(id)
                .orElseThrow(() -> new TripNotFoundException("This Trip does not exists."));
        return assembler.toModel(trip);
    }

    @GetMapping("/all")
    public CollectionModel<EntityModel<Trip>> getAllTrips() {
        return assembler.toCollectionModel(tripRepo.findAll());
    }

    @PostMapping("/create")
    public ResponseEntity<Trip> createTrip(@RequestBody TripDTO tripDto) {
        Trip newTrip = new Trip(tripDto.getName(), tripDto.getCountries(),
                tripDto.getBudget(), tripDto.getStartDate(),
                tripDto.getEndDate());

        Long idPerson = tripDto.getIdPerson();
        Person person = personRepo.findById(idPerson).orElseThrow(() -> new PersonNotFoundException(idPerson));

        persistUserTrip(person, newTrip);

        EntityModel<Trip> tripModel = assembler.toModel(newTrip);
        return ResponseEntity.created(tripModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(newTrip);
    }

    private void persistUserTrip(Person person, Trip trip) {
        person.getTrips().add(trip);
        trip.setPerson(person);

        personRepo.save(person);
        tripRepo.save(trip);
    }

    @PostMapping("/create/coverPhoto")
    public ResponseEntity<?> uploadCoverPhoto(@ModelAttribute CoverImageTrip image) throws IOException {
        Trip trip = tripRepo.findById(image.getIdTrip())
                .orElseThrow(() -> new TripNotFoundException("This Trip does not exists."));

        trip.setCoverPhoto(image.getImage().getBytes());
        tripRepo.save(trip);

        return ResponseEntity.ok().body("Image uploaded!");
    }

}
