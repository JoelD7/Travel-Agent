package com.tripper.Tripper.assemblers;

import com.tripper.Tripper.controllers.CarRentalController;
import com.tripper.Tripper.models.CarRental;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@Component
public class CarRentalModelAssembler implements RepresentationModelAssembler<CarRental, EntityModel<CarRental>> {

    @Override
    public EntityModel<CarRental> toModel(CarRental entity) {
        Long idCarRental = entity.getIdCarRental();
        String uuid = entity.getPerson().getUuid();

        return EntityModel.of(entity,
                linkTo(methodOn(CarRentalController.class).getCarRental(idCarRental)).withSelfRel(),
                linkTo(methodOn(CarRentalController.class).getAllCarRentals(uuid)).withRel("carRentals")
        );
    }

    @Override
    public CollectionModel<EntityModel<CarRental>> toCollectionModel(Iterable<? extends CarRental> entities) {
        List<EntityModel<CarRental>> entityModels
                = StreamSupport.stream(entities.spliterator(), false)
                        .map(this::toModel)
                        .collect(Collectors.toList());

        return CollectionModel.of(entityModels,
                linkTo(methodOn(CarRentalController.class).getAllCarRentals(null)).withSelfRel());
    }

}
