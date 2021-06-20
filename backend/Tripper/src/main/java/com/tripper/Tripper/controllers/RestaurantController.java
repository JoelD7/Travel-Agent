package com.tripper.Tripper.controllers;

import com.tripper.Tripper.APICredentialsProps;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {

    private final APICredentialsProps apiCredential;

    public RestaurantController(APICredentialsProps apiCredential) {
        this.apiCredential = apiCredential;
    }

}
