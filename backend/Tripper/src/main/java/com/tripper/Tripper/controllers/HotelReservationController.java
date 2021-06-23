package com.tripper.Tripper.controllers;

import com.tripper.Tripper.assemblers.HotelReservationModelAssembler;
import com.tripper.Tripper.data.HotelReservationRepository;
import com.tripper.Tripper.data.PersonRepository;
import com.tripper.Tripper.exceptions.HotelReservationNotFoundException;
import com.tripper.Tripper.exceptions.PersonNotFoundException;
import com.tripper.Tripper.models.HotelReservation;
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
@RequestMapping("/hotel")
public class HotelReservationController {

    private final HotelReservationRepository hotelRepo;
    private final PersonRepository personRepo;
    private final HotelReservationModelAssembler assembler;

    public HotelReservationController(HotelReservationRepository hotelRepo, PersonRepository personRepo,
            HotelReservationModelAssembler assembler) {
        this.hotelRepo = hotelRepo;
        this.personRepo = personRepo;
        this.assembler = assembler;
    }

    @GetMapping("/{idHotelReservation}")
    public EntityModel<HotelReservation> getHotelReservation(@PathVariable Long idHotelReservation) {
        HotelReservation hotelRsv = hotelRepo.findById(idHotelReservation)
                .orElseThrow(() -> new HotelReservationNotFoundException(idHotelReservation));

        return assembler.toModel(hotelRsv);
    }

    @GetMapping("/all")
    public CollectionModel<EntityModel<HotelReservation>> getAllHotelReservations(@RequestParam String personUuid) {
        return assembler.toCollectionModel(hotelRepo.getAllHotelReservationsByPerson(personUuid));
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookHotel(@RequestBody HotelReservation hotelRsv, @RequestParam String personUuid) {
        Person person = personRepo.findByUuid(personUuid)
                .orElseThrow(() -> new PersonNotFoundException(personUuid));

        hotelRsv.setPerson(person);
        person.getHotelReservations().add(hotelRsv);

        hotelRsv.setHotelReservationChildren();
        EntityModel<HotelReservation> entityModel = assembler.toModel(hotelRepo.save(hotelRsv));

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(hotelRsv);
    }

    @DeleteMapping("/{idHotelReservation}")
    public ResponseEntity<?> deleteReservation(@PathVariable Long idHotelReservation) {
        hotelRepo.deleteById(idHotelReservation);

        return ResponseEntity.noContent().build();
    }
}
