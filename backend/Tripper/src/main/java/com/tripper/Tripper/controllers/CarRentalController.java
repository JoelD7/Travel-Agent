package com.tripper.Tripper.controllers;

import com.tripper.Tripper.assemblers.CarRentalModelAssembler;
import com.tripper.Tripper.data.CarRentalRepository;
import com.tripper.Tripper.data.PersonRepository;
import com.tripper.Tripper.exceptions.CarRentalNotFoundException;
import com.tripper.Tripper.exceptions.PersonNotFoundException;
import com.tripper.Tripper.models.CarRental;
import com.tripper.Tripper.models.Person;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/car-rental")
public class CarRentalController {

    private final CarRentalRepository carRepo;
    private final CarRentalModelAssembler assembler;
    private final PersonRepository personRepo;

    public CarRentalController(CarRentalRepository carRepo, CarRentalModelAssembler assembler,
            PersonRepository personRepo) {
        this.carRepo = carRepo;
        this.assembler = assembler;
        this.personRepo = personRepo;
    }

    @GetMapping("/{idCarRental}")
    public EntityModel<CarRental> getCarRental(@PathVariable Long idCarRental) {
        CarRental carRental = carRepo.findById(idCarRental)
                .orElseThrow(() -> new CarRentalNotFoundException(idCarRental));

        return assembler.toModel(carRental);
    }

    @GetMapping("/all")
    public CollectionModel<EntityModel<CarRental>> getAllCarRentals(@RequestParam Long idPerson) {
        return assembler.toCollectionModel(carRepo.findAllByPerson(idPerson));
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookCarRental(@RequestBody CarRental dto, @RequestParam String personUuid) {
        Person person = personRepo.findByUuid(personUuid)
                .orElseThrow(() -> new PersonNotFoundException(personUuid));

        dto.setPerson(person);

        CarRental newCarRental = carRepo.save(dto);
        EntityModel<CarRental> carRentalModel = assembler.toModel(newCarRental);

        return ResponseEntity
                .created(carRentalModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(newCarRental);
    }

    @DeleteMapping("/{idCarRental}")
    public ResponseEntity<?> deleteCarRental(@PathVariable Long idCarRental) {
        carRepo.deleteById(idCarRental);
        return ResponseEntity.noContent().build();
    }

}
