package com.tripper.Tripper.services;

import com.tripper.Tripper.data.PersistentLoginRepository;
import com.tripper.Tripper.data.PersonRepository;
import com.tripper.Tripper.dtos.LoginDTO;
import com.tripper.Tripper.dtos.SignUpDTO;
import com.tripper.Tripper.exceptions.BadCrendetialsException;
import com.tripper.Tripper.exceptions.EmailTakenException;
import com.tripper.Tripper.exceptions.PersonNotFoundException;
import com.tripper.Tripper.models.PersistentLogin;
import com.tripper.Tripper.models.Person;
import com.tripper.Tripper.utils.AuthStatus;
import com.tripper.Tripper.utils.CookieName;
import java.util.List;
import java.util.stream.Stream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;
    private final PersonRepository personRepo;
    private final SessionRegistry sessionRegistry;
    private final PersistentTokenBasedRememberMeServices rememberMeService;
    private final PersistentLoginRepository persistenLoginRepo;
    private final int ONE_YEAR = 31536000;

    @Value("${tripper.app.domain}")
    private String DOMAIN;

    public AuthServiceImpl(AuthenticationManager authenticationManager, PasswordEncoder encoder,
            PersonRepository personRepo, SessionRegistry sessionRegistry,
            PersistentTokenBasedRememberMeServices rememberMeService, PersistentLoginRepository persistenLoginRepo) {
        this.authenticationManager = authenticationManager;
        this.encoder = encoder;
        this.personRepo = personRepo;
        this.sessionRegistry = sessionRegistry;
        this.rememberMeService = rememberMeService;
        this.persistenLoginRepo = persistenLoginRepo;
    }

    @Override
    public Person authenticateUser(LoginDTO loginDto, HttpServletRequest request, HttpServletResponse response) {
        validateCredentials(loginDto);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        Person person = personRepo.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new PersonNotFoundException(loginDto.getEmail()));

        addPersonUuidCookie(request, response, person.getUuid());
        removeExpiredRememberMeTokens(person);

        rememberMeService.loginSuccess(request, response, authentication);
        sessionRegistry.registerNewSession(request.getSession().getId(), authentication.getPrincipal());

        return person;
    }

    private void removeExpiredRememberMeTokens(Person person) {
        List<PersistentLogin> tokensToRemove = persistenLoginRepo
                .findByUsername(person.getEmail(), Sort.by(Sort.Direction.DESC, "lastUsed"));

        persistenLoginRepo.deleteAll(tokensToRemove);
    }

    private void validateCredentials(LoginDTO dto) {

        if (!personRepo.existsByEmail(dto.getEmail())) {
            throw new BadCrendetialsException();
        }

        Person person = personRepo.findByEmail(dto.getEmail()).get();
        boolean isPasswordValid = encoder.matches(dto.getPassword(), person.getPassword());

        if (!isPasswordValid) {
            throw new BadCrendetialsException();
        }
    }

    private void addPersonUuidCookie(HttpServletRequest request, HttpServletResponse response, String uuid) {
        if (request.getCookies() != null) {
            Cookie personUuidCookie = Stream.of(request.getCookies())
                    .filter(cookie -> cookie.getName().equals(CookieName.PERSON_UUID.toString()))
                    .findFirst()
                    .orElse(null);

            if (!isCookiePresent(personUuidCookie)) {
                personUuidCookie = new Cookie(CookieName.PERSON_UUID.toString(), uuid);
                personUuidCookie.setDomain(DOMAIN);
                personUuidCookie.setPath("/");
                personUuidCookie.setMaxAge(ONE_YEAR);

                response.addCookie(personUuidCookie);
            }
        }
    }

    private boolean isCookiePresent(Cookie c) {
        return c != null;
    }

    @Override
    public String getUserAuthStatus(HttpServletRequest request, HttpServletResponse response) {
        String status = AuthStatus.NOT_REGISTERED.toString();

        if (request.getCookies() != null) {
            System.out.println("Request has cookies");
            Cookie rememberMe = Stream.of(request.getCookies())
                    .filter(cookie -> cookie.getName().equals(CookieName.REMEMBER_ME.toString()))
                    .findFirst()
                    .orElse(null);

            if (rememberMe != null) {
                System.out.println(" - Remember-me cookie");
                status = AuthStatus.AUTHENTICATED.toString();
            } else {
                System.out.println(" - personUuid cookie");
                Cookie personUuidCookie = Stream.of(request.getCookies())
                        .filter(cookie -> cookie.getName().equals(CookieName.PERSON_UUID.toString()))
                        .findFirst()
                        .orElse(null);

                if (personUuidCookieExists(personUuidCookie)) {
                    System.out.println(" - User recognized but session expired");
                    status = AuthStatus.NOT_AUTHENTICATED.toString();
                }
            }
        } else {
            System.out.println("Request doesn't have cookies");
        }

        return status;
    }

    private boolean personUuidCookieExists(Cookie personUuid) {
        return personUuid != null;
    }

    @Override
    public void registerUser(SignUpDTO signUpDto) {
        if (personRepo.existsByEmail(signUpDto.getEmail())) {
            throw new EmailTakenException();
        }

        Person person = new Person(signUpDto.getFirstName(), signUpDto.getLastName(),
                signUpDto.getEmail(), encoder.encode(signUpDto.getPassword()));

        personRepo.save(person);
    }

    @Override
    public void logoutUser(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        removePersonUuidCookie(request, response);

        sessionRegistry.removeSessionInformation(request.getSession().getId());
        rememberMeService.logout(request, response, authentication);
        new SecurityContextLogoutHandler().logout(request, response, authentication);
    }

    private void removePersonUuidCookie(HttpServletRequest request, HttpServletResponse response) {
        if (request.getCookies() != null) {
            Cookie personUuidCookie = Stream.of(request.getCookies())
                    .filter(cookie -> cookie.getName().equals(CookieName.PERSON_UUID.toString()))
                    .findFirst()
                    .orElse(null);

            if (isCookiePresent(personUuidCookie)) {
                String value = personUuidCookie.getValue();

                personUuidCookie.setValue(value);
                personUuidCookie.setMaxAge(0);
                personUuidCookie.setDomain(DOMAIN);
                personUuidCookie.setPath("/");
                response.addCookie(personUuidCookie);
            }
        }
    }

}
