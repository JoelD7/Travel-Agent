package com.tripper.Tripper.services;

import com.tripper.Tripper.data.CarRentalRepository;
import com.tripper.Tripper.data.FlightRepository;
import com.tripper.Tripper.data.HotelReservationRepository;
import com.tripper.Tripper.data.TripEventRepository;
import com.tripper.Tripper.exceptions.CarRentalNotFoundException;
import com.tripper.Tripper.exceptions.FlightNotFoundException;
import com.tripper.Tripper.exceptions.HotelReservationNotFoundException;
import com.tripper.Tripper.models.CarRental;
import com.tripper.Tripper.models.Flight;
import com.tripper.Tripper.models.HotelReservation;
import com.tripper.Tripper.models.POI;
import com.tripper.Tripper.models.Person;
import com.tripper.Tripper.models.Restaurant;
import com.tripper.Tripper.models.Trip;
import com.tripper.Tripper.models.TripEvent;
import com.tripper.Tripper.models.enums.TripEventType;
import org.springframework.stereotype.Service;

@Service
public class TripEventServiceImpl implements TripEventService {

    private final TripEventRepository tripEventRepo;
    private final FlightRepository flightRepo;
    private final HotelReservationRepository hotelRepo;
    private final CarRentalRepository carRepo;

    public TripEventServiceImpl(TripEventRepository tripEventRepo, FlightRepository flightRepo,
            CarRentalRepository carRepo, HotelReservationRepository hotelRepo) {
        this.tripEventRepo = tripEventRepo;
        this.flightRepo = flightRepo;
        this.hotelRepo = hotelRepo;
        this.carRepo = carRepo;
    }

    @Override
    public TripEvent addEventToTrip(TripEvent eventDTO, Trip trip) {
        Person person = trip.getPerson();

        TripEvent newTripEvent = new TripEvent(eventDTO.getName(), eventDTO.getLocation(),
                eventDTO.getType(), eventDTO.getIncludesTime(), eventDTO.getStart(),
                eventDTO.getEnd());

        newTripEvent.setTrip(trip);
        setEventTypeEntity(newTripEvent, eventDTO, person);

        return tripEventRepo.save(newTripEvent);
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
                addCarRentalEvent(newEvent, eventDTO, person);
                break;

            case FLIGHT:
                addFlightEvent(newEvent, eventDTO, person);
                break;

            case HOTEL:
                addHotelReservationEvent(newEvent, eventDTO, person);
                break;

            case POI:
                addPOIEvent(newEvent, eventDTO);
                break;

            case RESTAURANT:
                addRestaurantEvent(newEvent, eventDTO);
                break;

            default:
                break;
        }
    }

    private void addCarRentalEvent(TripEvent newEvent, TripEvent eventDTO, Person person) {
        CarRental carRental;
        Long idCarRental = eventDTO.getCarRental().getIdCarRental();

        if (idCarRental == null) {
            carRental = eventDTO.getCarRental();
            carRental.setPerson(person);
            carRental.setTripEvent(newEvent);
        } else {
            carRental = carRepo.findById(idCarRental)
                    .orElseThrow(() -> new CarRentalNotFoundException(idCarRental));
            carRental.setTripEvent(newEvent);
        }
    }

    private void addFlightEvent(TripEvent newEvent, TripEvent eventDTO, Person person) {
        Flight flight;
        Long idFlight = eventDTO.getFlight().getIdFlight();

        if (idFlight == null) {
            flight = eventDTO.getFlight();
            flight.setPerson(person);
            flight.setTripEvent(newEvent);
            flight.setFlightChildren();
        } else {
            flight = flightRepo.findById(idFlight)
                    .orElseThrow(() -> new FlightNotFoundException(idFlight));
            flight.setTripEvent(newEvent);
        }
    }

    private void addHotelReservationEvent(TripEvent newEvent, TripEvent eventDTO, Person person) {
        HotelReservation hotelReservation;
        Long idHotelReservation = eventDTO.getHotelReservation().getIdHotelReservation();

        if (idHotelReservation == null) {
            hotelReservation = eventDTO.getHotelReservation();
            hotelReservation.setPerson(person);
            hotelReservation.setTripEvent(newEvent);
            hotelReservation.setHotelReservationChildren();
        } else {
            hotelReservation = hotelRepo.findById(idHotelReservation)
                    .orElseThrow(() -> new HotelReservationNotFoundException(idHotelReservation));
            hotelReservation.setTripEvent(newEvent);
        }
    }

    private void addRestaurantEvent(TripEvent newEvent, TripEvent eventDTO) {
        Restaurant restaurant = eventDTO.getRestaurant();
        restaurant.setTripEvent(newEvent);
    }

    private void addPOIEvent(TripEvent newEvent, TripEvent eventDTO) {
        POI poi = eventDTO.getPoi();
        poi.setTripEvent(newEvent);
    }

}
