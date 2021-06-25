package com.tripper.Tripper.exceptions.handlers;

import com.tripper.Tripper.exceptions.*;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({FlightNotFoundException.class, TripNotFoundException.class,
        AlbumNotFoundException.class, CarRentalNotFoundException.class, FavoriteNotFoundException.class,
        HotelReservationNotFoundException.class, PersonNotFoundException.class,
        TripEventNotFoundException.class, TripNotFoundException.class})
    public void handleNotFoundException(RuntimeException ex,
            HttpServletResponse response) throws IOException {

        response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
    }
}
