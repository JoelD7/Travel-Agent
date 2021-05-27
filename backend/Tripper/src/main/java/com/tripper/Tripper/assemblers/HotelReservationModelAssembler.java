package com.tripper.Tripper.assemblers;

import com.tripper.Tripper.controllers.HotelReservationController;
import com.tripper.Tripper.models.HotelReservation;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@Component
public class HotelReservationModelAssembler
        implements RepresentationModelAssembler<HotelReservation, EntityModel<HotelReservation>> {

    @Override
    public EntityModel<HotelReservation> toModel(HotelReservation entity) {
        Long idPerson = entity.getPerson().getIdPerson();

        return EntityModel.of(entity,
                linkTo(methodOn(HotelReservationController.class)
                        .getHotelReservation(entity.getIdHotelReservation())).withSelfRel(),
                linkTo(methodOn(HotelReservationController.class)
                        .getAllHotelReservations(idPerson)).withRel("hotelReservations")
        );
    }

    @Override
    public CollectionModel<EntityModel<HotelReservation>> toCollectionModel(Iterable<? extends HotelReservation> entities) {
        List<EntityModel<HotelReservation>> entityModels
                = StreamSupport.stream(entities.spliterator(), false)
                        .map(this::toModel)
                        .collect(Collectors.toList());

        return CollectionModel.of(entityModels,
                linkTo(methodOn(HotelReservationController.class)
                        .getAllHotelReservations(null)).withSelfRel()
        );
    }

}
