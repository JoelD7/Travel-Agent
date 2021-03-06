package com.tripper.Tripper.controllers;

import com.tripper.Tripper.assemblers.TripModelAssembler;
import com.tripper.Tripper.data.PersonRepository;
import com.tripper.Tripper.data.TripRepository;
import com.tripper.Tripper.exceptions.PersonNotFoundException;
import com.tripper.Tripper.exceptions.TripNotFoundException;
import com.tripper.Tripper.models.Person;
import com.tripper.Tripper.models.Trip;
import java.util.UUID;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trip")
public class TripController {

    private final TripRepository tripRepo;
    private final PersonRepository personRepo;
    private final TripModelAssembler assembler;

    public TripController(TripRepository tripRepo, TripModelAssembler assembler, PersonRepository personRepo) {
        this.tripRepo = tripRepo;
        this.assembler = assembler;
        this.personRepo = personRepo;
    }

    @GetMapping("/{uuid}")
    public EntityModel<Trip> getTrip(@PathVariable String uuid) {
        Trip trip = tripRepo.findByUuid(uuid)
                .orElseThrow(() -> new TripNotFoundException("This Trip does not exists."));
        return assembler.toModel(trip);
    }

    @GetMapping("/all")
    public CollectionModel<EntityModel<Trip>> getAllTrips(@RequestParam String personUuid) {
        return assembler.toCollectionModel(tripRepo.findByPerson(personUuid));
    }

    @PostMapping("/create")
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip, @RequestParam String personUuid) {
        Person person = personRepo.findByUuid(personUuid)
                .orElseThrow(() -> new PersonNotFoundException(personUuid));

        trip.setPerson(person);
        trip.setUuid(UUID.randomUUID().toString());

        Trip newTrip = tripRepo.save(trip);
        EntityModel<Trip> tripModel = assembler.toModel(newTrip);

        return ResponseEntity
                .created(tripModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(newTrip);
    }

}
