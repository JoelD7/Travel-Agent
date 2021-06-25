package com.tripper.Tripper.controllers;

import com.tripper.Tripper.dtos.LoginDTO;
import com.tripper.Tripper.dtos.SignUpDTO;
import com.tripper.Tripper.models.Person;
import com.tripper.Tripper.services.AuthServiceImpl;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
    private AuthServiceImpl authService;

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> login(@ModelAttribute LoginDTO loginDto, HttpServletRequest request,
            HttpServletResponse response) {

        Person person = authService.authenticateUser(loginDto, request, response);
        return ResponseEntity.ok(person);
    }

    @GetMapping("/status")
    public ResponseEntity<?> getUserAuthStatus(HttpServletRequest request, HttpServletResponse response) {

        String status = authService.getUserAuthStatus(request, response);
        return ResponseEntity.ok(status);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpDTO signUpDto) {
        authService.registerUser(signUpDto);
        return ResponseEntity.ok("User registered successfully!");
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        authService.logoutUser(request, response);

        return ResponseEntity.ok().build();
    }
}
