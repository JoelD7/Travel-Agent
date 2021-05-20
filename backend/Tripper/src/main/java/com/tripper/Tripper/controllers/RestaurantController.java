package com.tripper.Tripper.controllers;

import com.tripper.Tripper.APICredentialsProps;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {

    private final APICredentialsProps apiCredential;
    private final RestTemplate restTemplate;

    public RestaurantController(APICredentialsProps apiCredential, RestTemplate restTemplate) {
        this.apiCredential = apiCredential;
        this.restTemplate = restTemplate;
    }

}
