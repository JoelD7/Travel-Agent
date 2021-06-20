package com.tripper.Tripper.controllers;

import com.tripper.Tripper.data.PersonRepository;
import com.tripper.Tripper.dtos.LoginDTO;
import com.tripper.Tripper.dtos.SignUpDTO;
import com.tripper.Tripper.exceptions.PersonNotFoundException;
import com.tripper.Tripper.models.Person;
import com.tripper.Tripper.utils.AuthStatus;
import com.tripper.Tripper.utils.CookieName;
import java.util.stream.Stream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private PersonRepository personRepo;

    @Autowired
    private SessionRegistry sessionRegistry;

    @Autowired
    PersistentTokenBasedRememberMeServices rememberMeService;

    private final int ONE_YEAR = 31536000;

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> authenticateUser(@ModelAttribute LoginDTO loginDto, HttpServletRequest request,
            HttpServletResponse response) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        Person person = personRepo.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new PersonNotFoundException(loginDto.getEmail()));

        Cookie idPersonCookie = new Cookie("idPerson", person.getIdPerson().toString());
        idPersonCookie.setMaxAge(ONE_YEAR);
        response.addCookie(idPersonCookie);

        rememberMeService.loginSuccess(request, response, authentication);
        sessionRegistry.registerNewSession(request.getSession().getId(), authentication.getPrincipal());

        return ResponseEntity.ok(person);
    }

    @GetMapping("/status")
    public ResponseEntity<?> getUserAuthStatus(HttpServletRequest request, HttpServletResponse response) {
        String status = AuthStatus.NOT_REGISTERED.toString();

        if (request.getCookies() != null) {
            Cookie rememberMe = Stream.of(request.getCookies())
                    .filter(cookie -> cookie.getName().equals(CookieName.REMEMBER_ME.toString()))
                    .findFirst()
                    .orElse(null);

            if (rememberMe != null) {
                status = AuthStatus.AUTHENTICATED.toString();
            } else {
                Cookie idPerson = Stream.of(request.getCookies())
                        .filter(cookie -> cookie.getName().equals(CookieName.ID_PERSON.toString()))
                        .findFirst()
                        .orElse(null);

                if (idPersonCookieExists(idPerson)) {
                    status = AuthStatus.NOT_AUTHENTICATED.toString();
                }
            }

        }

        return ResponseEntity.ok(status);
    }

    private boolean idPersonCookieExists(Cookie idPerson) {
        return idPerson != null;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpDTO signUpDto) {
        if (personRepo.existsByEmail(signUpDto.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is `already taken!");
        }

        // Create new user's account
        Person person = new Person(signUpDto.getFirstName(), signUpDto.getLastName(),
                signUpDto.getEmail(), encoder.encode(signUpDto.getPassword()));

        personRepo.save(person);

        return ResponseEntity.ok("User registered successfully!");
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        sessionRegistry.removeSessionInformation(request.getSession().getId());
        rememberMeService.logout(request, response, authentication);
        new SecurityContextLogoutHandler().logout(request, response, authentication);

        return ResponseEntity.ok().build();
    }
}
