package com.tripper.Tripper.controllers;

import com.tripper.Tripper.assemblers.TripModelAssembler;
import com.tripper.Tripper.data.TripRepository;
import com.tripper.Tripper.exceptions.TripNotFoundException;
import com.tripper.Tripper.models.Trip;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trip")
public class TripController {

    private final TripRepository tripRepo;
    private final TripModelAssembler assembler;

    public TripController(TripRepository tripRepo, TripModelAssembler assembler) {
        this.tripRepo = tripRepo;
        this.assembler = assembler;
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

//    @PostMapping("/create")
}
