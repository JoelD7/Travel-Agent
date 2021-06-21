package com.tripper.Tripper.controllers;

import com.tripper.Tripper.assemblers.TripEventModelAssembler;
import com.tripper.Tripper.data.TripEventRepository;
import com.tripper.Tripper.data.TripRepository;
import com.tripper.Tripper.exceptions.TripEventNotFoundException;
import com.tripper.Tripper.exceptions.TripNotFoundException;
import com.tripper.Tripper.models.Trip;
import com.tripper.Tripper.models.TripEvent;
import com.tripper.Tripper.services.TripEventService;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trip-event")
public class TripEventController {

    private final TripEventRepository tripEventRepo;
    private final TripEventModelAssembler assembler;
    private final TripRepository tripRepo;
    private final TripEventService service;

    public TripEventController(TripEventRepository tripEventRepo, TripEventModelAssembler assembler,
            TripRepository tripRepo, TripEventService service) {
        this.tripEventRepo = tripEventRepo;
        this.assembler = assembler;
        this.tripRepo = tripRepo;
        this.service = service;
    }

    @GetMapping("/{eventUuid}")
    public EntityModel<TripEvent> getTripEvent(@PathVariable String eventUuid) {
        TripEvent event = tripEventRepo.findByUuid(eventUuid)
                .orElseThrow(() -> new TripEventNotFoundException(eventUuid));

        return assembler.toModel(event);
    }

    @GetMapping("/all")
    public CollectionModel<EntityModel<TripEvent>> getAllOfTrip(@RequestParam String tripUuid) {
        return assembler.toCollectionModel(tripEventRepo.getAllEventsOfTrip(tripUuid));
    }

    @PostMapping("/add-new")
    public ResponseEntity<?> addEventToTrip(@RequestBody TripEvent event, @RequestParam String tripUuid) {
        Trip trip = tripRepo.findByUuid(tripUuid)
                .orElseThrow(() -> new TripNotFoundException("This Trip does not exists."));

        TripEvent newTripEvent = service.addEventToTrip(event, trip);
        EntityModel<TripEvent> entityModel = assembler.toModel(newTripEvent);

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(newTripEvent);
    }

    @DeleteMapping("/delete/{eventUuid}")
    public ResponseEntity<?> deleteEvent(@PathVariable String eventUuid) {
        TripEvent tripEvent = tripEventRepo.findByUuid(eventUuid)
                .orElseThrow(() -> new TripEventNotFoundException(eventUuid));

        Trip trip = tripEvent.getTrip();
        tripEventRepo.delete(tripEvent);

        return ResponseEntity.ok(trip);
    }

}
