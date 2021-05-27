package com.tripper.Tripper.controllers;

import com.tripper.Tripper.assemblers.TripEventModelAssembler;
import com.tripper.Tripper.data.FlightRepository;
import com.tripper.Tripper.data.TripEventRepository;
import com.tripper.Tripper.data.TripRepository;
import com.tripper.Tripper.exceptions.FlightNotFoundException;
import com.tripper.Tripper.exceptions.TripEventNotFoundException;
import com.tripper.Tripper.exceptions.TripNotFoundException;
import com.tripper.Tripper.models.CarRental;
import com.tripper.Tripper.models.Flight;
import com.tripper.Tripper.models.HotelReservation;
import com.tripper.Tripper.models.Person;
import com.tripper.Tripper.models.Trip;
import com.tripper.Tripper.models.TripEvent;
import com.tripper.Tripper.models.enums.TripEventType;
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
    private final FlightRepository flightRepo;

    public TripEventController(TripEventRepository tripEventRepo, TripEventModelAssembler assembler,
            TripRepository tripRepo, FlightRepository flightRepo) {
        this.tripEventRepo = tripEventRepo;
        this.assembler = assembler;
        this.tripRepo = tripRepo;
        this.flightRepo = flightRepo;
    }

    @GetMapping("/{idTripEvent}")
    public EntityModel<TripEvent> getTripEvent(@PathVariable Long idTripEvent) {
        TripEvent event = tripEventRepo.findById(idTripEvent)
                .orElseThrow(() -> new TripEventNotFoundException(idTripEvent));

        return assembler.toModel(event);
    }

    @GetMapping("/all")
    public CollectionModel<EntityModel<TripEvent>> getAllOfTrip(@RequestParam Long idTrip) {
        return assembler.toCollectionModel(tripEventRepo.getAllEventsOfTrip(idTrip));
    }

    @PostMapping("/add-new")
    public ResponseEntity<?> addNewEventToTrip(@RequestBody TripEvent event, @RequestParam Long idTrip) {
        Trip trip = tripRepo.findById(idTrip)
                .orElseThrow(() -> new TripNotFoundException("This Trip does not exists."));

        Person person = trip.getPerson();

        TripEvent newTripEvent = new TripEvent(event.getName(), event.getLocation(),
                event.getType(), event.getIncludesTime(), event.getStart(),
                event.getEnd());

        newTripEvent.setTrip(trip);
        setEventTypeEntity(newTripEvent, event, person);

        TripEvent tripEventResponse = tripEventRepo.save(newTripEvent);
        EntityModel<TripEvent> entityModel = assembler.toModel(tripEventResponse);

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(tripEventResponse);
    }

    //<editor-fold defaultstate="collapsed" desc="comment">
    /*
     * Sets the entity corresponding to the event type in the TripEvent object.
     * This is required given the fact that there is a bidirectional relation-
     * ship between TripEvent and its children.
     */ //</editor-fold>
    private void setEventTypeEntity(TripEvent newEvent, TripEvent eventDTO, Person person) {
        TripEventType type = eventDTO.getType();

        switch (type) {
            case CAR_RENTAL:
                CarRental carRental = eventDTO.getCarRental();
                carRental.setPerson(person);
                newEvent.setCarRental(carRental);
                break;

            case FLIGHT:
                Flight flight;
                Long idFlight = eventDTO.getFlight().getIdFlight();

                if (idFlight == null) {
                    flight = eventDTO.getFlight();
                    flight.setPerson(person);
                    flight.setEvent(newEvent);
                    Flight.persistFlight(flight);
                } else {
                    flight = flightRepo.findById(idFlight)
                            .orElseThrow(() -> new FlightNotFoundException(idFlight));
                    flight.setEvent(newEvent);
                }

                newEvent.setFlight(flight);
                break;

            case HOTEL:
                HotelReservation hotelReservation = eventDTO.getHotelReservation();
                hotelReservation.setPerson(person);
                newEvent.setHotelReservation(hotelReservation);
                break;

            case POI:
                newEvent.setPoi(eventDTO.getPoi());
                break;

            case RESTAURANT:
                newEvent.setRestaurant(eventDTO.getRestaurant());
                break;

            default:
                break;
        }
    }

    @DeleteMapping("/delete/{idEvent}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long idEvent) {
        TripEvent tripEvent = tripEventRepo.findById(idEvent)
                .orElseThrow(() -> new TripEventNotFoundException(idEvent));

        Trip trip = tripEvent.getTrip();
        tripEventRepo.deleteById(idEvent);

        return ResponseEntity.ok(trip);
    }

}
