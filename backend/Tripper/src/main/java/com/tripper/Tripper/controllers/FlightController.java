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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import static com.tripper.Tripper.data.FlightRepositorySpecs.*;
import com.tripper.Tripper.models.FlightItinerary;
import com.tripper.Tripper.models.FlightSegment;
import com.tripper.Tripper.models.PlaceRelation;
import java.util.List;
import java.util.stream.Collectors;

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
        return assembler.toCollectionModel(flightRepo.findAll(hasIdPerson(idPerson)));
    }

    @PostMapping
    public ResponseEntity<?> bookFlight(@RequestBody Flight flight, @RequestParam Long idPerson) {
        Person person = personRepo.findById(idPerson).orElseThrow(() -> new PersonNotFoundException(idPerson));
        flight.setPerson(person);
        persistFlight(flight);

        return ResponseEntity.accepted().body("Flight booked");
    }

    /*
     * Persists a Flight object setting up all its related children entities, so
     * that each one of them has an updated reference to its parent. This is
     * required to prevent the foreign keys from having null values.
     */
    private void persistFlight(Flight flight) {
        List<FlightItinerary> itineraries = flight.getItineraries()
                .stream()
                .map(itinerary -> {
                    itinerary.setFlight(flight);

                    List<FlightSegment> segments = itinerary.getSegments()
                            .stream()
                            .map(segment -> {
                                segment.setFlightItinerary(itinerary);

                                List<PlaceRelation> placeRelations = segment.getPlaceRelations()
                                        .stream()
                                        .map(pr -> {
                                            pr.setFlightSegment(segment);
                                            return pr;
                                        }).collect(Collectors.toList());

                                segment.setPlaceRelations(placeRelations);
                                return segment;

                            }).collect(Collectors.toList());

                    itinerary.setSegments(segments);
                    return itinerary;
                })
                .collect(Collectors.toList());

        flight.setItineraries(itineraries);

        flightRepo.save(flight);
    }

}
