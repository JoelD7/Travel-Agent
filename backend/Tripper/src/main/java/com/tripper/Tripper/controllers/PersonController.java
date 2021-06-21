package com.tripper.Tripper.controllers;

import com.tripper.Tripper.APICredentialsProps;
import com.tripper.Tripper.assemblers.PersonModelAssembler;
import com.tripper.Tripper.data.PersonRepository;
import com.tripper.Tripper.exceptions.PersonNotFoundException;
import com.tripper.Tripper.models.Person;
import com.tripper.Tripper.services.PersonServiceImpl;
import java.util.Arrays;
import java.util.List;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
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
    private final PersonModelAssembler assembler;
    private final PersonServiceImpl personService;

    public PersonController(PersonRepository personRepo, PersonModelAssembler assembler, PersonServiceImpl personService) {
        this.personRepo = personRepo;
        this.assembler = assembler;
        this.personService = personService;
    }

    @GetMapping("/all")
    public CollectionModel<EntityModel<Person>> getAll() {
        return assembler.toCollectionModel(personRepo.findAll());
    }

    @GetMapping("/{id}")
    public EntityModel<Person> get(@PathVariable Long idPerson) {
        Person person = personRepo.findById(idPerson)
                .orElseThrow(() -> new PersonNotFoundException(idPerson));

        return assembler.toModel(person);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editProfile(@PathVariable Long idPerson, @RequestBody Person dto) {
        Person editedUser = personService.editUserProfile(idPerson, dto);

        return ResponseEntity
                .accepted()
                .body(editedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        return null;
    }

}
