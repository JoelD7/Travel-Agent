package com.tripper.Tripper.controllers;

import com.tripper.Tripper.data.PersonRepository;
import com.tripper.Tripper.dtos.JwtResponseDTO;
import com.tripper.Tripper.dtos.LoginDTO;
import com.tripper.Tripper.dtos.SignUpDTO;
import com.tripper.Tripper.models.Person;
import com.tripper.Tripper.security.JwtUtils;
import com.tripper.Tripper.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    JwtUtils jwtUtils;

    @Autowired
    private PersonRepository personRepo;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDTO loginDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponseDTO(jwt,
                userDetails.getIdPerson(),
                userDetails.getEmail()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpDTO signUpDto) {
        if (personRepo.existsByEmail(signUpDto.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already taken!");
        }

        // Create new user's account
        Person person = new Person(signUpDto.getFirstName(), signUpDto.getLastName(),
                signUpDto.getEmail(), encoder.encode(signUpDto.getPassword()));

        personRepo.save(person);

        return ResponseEntity.ok("User registered successfully!");
    }
}
