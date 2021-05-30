package com.tripper.Tripper.services;

import com.tripper.Tripper.models.Trip;
import com.tripper.Tripper.models.TripEvent;

public interface TripEventService {

    public abstract TripEvent addEventToTrip(TripEvent eventDTO, Trip trip);
}
