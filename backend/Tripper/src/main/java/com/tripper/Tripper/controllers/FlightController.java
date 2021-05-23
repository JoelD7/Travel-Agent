package com.tripper.Tripper.controllers;

import com.tripper.Tripper.assemblers.FlightModelAssembler;
import com.tripper.Tripper.data.FlightRepository;
import com.tripper.Tripper.data.PersonRepository;
import com.tripper.Tripper.exceptions.FlightNotFoundException;
import com.tripper.Tripper.exceptions.PersonNotFoundException;
import com.tripper.Tripper.models.Flight;
import com.tripper.Tripper.models.Person;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/flight")
public class FlightController {

    private final FlightRepository flightRepo;
    private final PersonRepository personRepo;
    private final FlightModelAssembler assembler;

    public FlightController(FlightRepository flightRepo, PersonRepository personRepo, FlightModelAssembler assembler) {
        this.flightRepo = flightRepo;
        this.personRepo = personRepo;
        this.assembler = assembler;
    }

    @GetMapping("/{id}")
    public EntityModel<Flight> getFlight(@PathVariable Long id) {
        Flight flight = flightRepo.findById(id)
                .orElseThrow(() -> new FlightNotFoundException(id));

        return assembler.toModel(flight);
    }

    @GetMapping("/all")
    public CollectionModel<EntityModel<Flight>> getAllFlights(@RequestParam Long idPerson) {
        Person person = personRepo.findById(idPerson)
                .orElseThrow(() -> new PersonNotFoundException(idPerson));
    }

}
