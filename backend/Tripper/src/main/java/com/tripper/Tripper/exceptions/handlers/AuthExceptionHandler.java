package com.tripper.Tripper.exceptions.handlers;

import com.tripper.Tripper.exceptions.BadCrendetialsException;
import com.tripper.Tripper.exceptions.EmailTakenException;
import com.tripper.Tripper.exceptions.InvalidPasswordException;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AuthExceptionHandler {

    @ExceptionHandler({BadCrendetialsException.class, InvalidPasswordException.class,
        EmailTakenException.class})
    public void handleBadCredentialsException(RuntimeException ex,
            HttpServletResponse response) throws IOException {

        response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
    }

}
