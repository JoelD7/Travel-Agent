package com.tripper.Tripper.controllers;

import com.tripper.Tripper.APICredentialsProps;
import com.tripper.Tripper.data.PersonRepository;
import com.tripper.Tripper.models.Person;
import java.util.Arrays;
import java.util.List;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/person")
public class PersonController {

    private final PersonRepository personRepo;

    private final APICredentialsProps apiCredential;

    public PersonController(PersonRepository personRepo, APICredentialsProps apiCredential) {
        this.personRepo = personRepo;
        this.apiCredential = apiCredential;
    }

    @GetMapping("/all")
    public List<Person> list() {
        String yelpKey = apiCredential.getYELP_KEY();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Authorization", "Bearer " + yelpKey);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        return personRepo.findAll();
    }

    @GetMapping("/{id}")
    public Object get(@PathVariable String id) {
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@PathVariable String id, @RequestBody Object input) {
        return null;
    }

    @PostMapping
    public ResponseEntity<?> post(@RequestBody Object input) {
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        return null;
    }

}
